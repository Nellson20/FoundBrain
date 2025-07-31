import os
import subprocess
import math
import uuid
import json
from fastapi import UploadFile
from pathlib import Path

from core.config import settings


def get_image_dimensions(image_path):
    result = subprocess.run([
        "ffprobe", "-v", "error", "-select_streams", "v:0",
        "-show_entries", "stream=width,height",
        "-of", "json",
        image_path
    ], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    info = json.loads(result.stdout)
    width = info["streams"][0]["width"]
    height = info["streams"][0]["height"]
    return width, height

def generate_thumbnails(video_path: str, output_dir: str, video_id: str, sprite_name="sprite.jpg", vtt_name="thumbnails.vtt"):
    os.makedirs(output_dir, exist_ok=True)

    sprite_path = os.path.join(output_dir, sprite_name)
    vtt_path = os.path.join(output_dir, vtt_name)

    duration = get_video_duration(video_path)
    num_thumbnails = int(duration)  # 1 thumbnail/sec

    cols = 10
    rows = math.ceil(num_thumbnails / cols)
    tile_value = f"{cols}x{rows}"

    fixed_height = 90
    scale_filter = f"scale=-1:{fixed_height}"

    # Génère le sprite
    result = subprocess.run([
        "ffmpeg", "-i", video_path,
        "-vf", f"fps=1,{scale_filter},tile={tile_value}",
        "-frames:v", "1",
        "-q:v", "2",
        "-pix_fmt", "yuv420p",
        sprite_path
    ], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)

    if result.returncode != 0:
        print("Erreur FFmpeg (sprite):")
        print(result.stderr)
        raise RuntimeError(f"FFmpeg sprite failed: {result.stderr}")

    # Récupère les dimensions du sprite complet
    sprite_width, sprite_height = get_image_dimensions(sprite_path)

    # Calcule la taille d'un thumbnail
    width = sprite_width // cols
    height = sprite_height // rows

    # Génère le fichier VTT
    with open(vtt_path, "w") as f:
        f.write("WEBVTT\n\n")
        for i in range(num_thumbnails):
            start = i
            end = i + 1
            x = (i % cols) * width
            y = (i // cols) * height
            f.write(f"{format_time(start)} --> {format_time(end)}\n")
            f.write(f"{settings.domain_name}/video/sprt/{video_id}#xywh={x},{y},{width},{height}\n\n")


def format_time(seconds):
    h = int(seconds // 3600)
    m = int((seconds % 3600) // 60)
    s = seconds % 60
    return f"{h:02}:{m:02}:{s:06.3f}"

def get_video_duration(input_path: str) -> float:
    result = subprocess.run([
        "ffprobe", "-v", "error",
        "-show_entries", "format=duration",
        "-of", "default=noprint_wrappers=1:nokey=1",
        input_path
    ], stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
    return float(result.stdout.strip())

def get_video_resolution(input_path: str):
    result = subprocess.run([
        "ffprobe", "-v", "error",
        "-select_streams", "v:0",
        "-show_entries", "stream=width,height",
        "-of", "json",
        input_path
    ], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)

    info = json.loads(result.stdout)
    width = info['streams'][0]['width']
    height = info['streams'][0]['height']
    return width, height

def convert_to_hls(input_path: str, output_dir: str, base_name: str):
    os.makedirs(output_dir, exist_ok=True)
    
    source_width, source_height = get_video_resolution(input_path)
    print(f"Résolution source: {source_width}x{source_height}")
    
    resolutions = {
        "2160p": ("3840x2160", 12000),  # bitrate en kbps
        "1440p": ("2560x1440", 8000),
        "1080p": ("1920x1080", 5000),
        "720p":  ("1280x720", 2800),
        "480p":  ("854x480", 1400),
        "360p":  ("640x360", 800),
        "240p":  ("426x240", 500),
        "144p":  ("256x144", 300)
    }
    
    available_resolutions = {
        key: value for key, value in resolutions.items()
        if int(value[0].split('x')[1]) <= source_height
    }

    max_segments = 10
    duration = get_video_duration(input_path)
    segment_duration = max(duration / max_segments, 1)  # minimum 1 seconde

    master_playlist = "#EXTM3U\n"

    for res, (size, bitrate_kbps) in available_resolutions.items():
        out_path = output_dir
        hls_playlist = f"{res}.m3u8"
        full_path = os.path.join(out_path, hls_playlist)
        segment_pattern = os.path.join(out_path, f"{res}_%03d.ts")
        
        # Convertir bitrate en "k" (ex: 2000k) pour FFmpeg
        bitrate_str = f"{bitrate_kbps}k"
        # Convertir en bits/s pour la ligne BANDWIDTH (ex: 2000000)
        bandwidth = bitrate_kbps * 1000

        subprocess.run([
            "ffmpeg", "-i", input_path,
            "-vf", f"scale={size}",
            "-c:a", "aac", "-ar", "48000",
            "-c:v", "h264", "-profile:v", "main",
            "-crf", "20", "-sc_threshold", "0",
            "-g", "48", "-keyint_min", "48",
            "-b:v", bitrate_str,
            "-hls_time", str(segment_duration),
            "-hls_playlist_type", "vod",
            "-hls_segment_filename", segment_pattern,
            full_path
        ], check=True)

        master_playlist += (
            f"#EXT-X-STREAM-INF:BANDWIDTH={bandwidth},RESOLUTION={size}\n"
            f"{hls_playlist}\n"
        )

    master_path = os.path.join(output_dir, f"{base_name}_master.m3u8")
    with open(master_path, "w") as f:
        f.write(master_playlist)
        
    thumbnails_dir = f"/media/thumbnails/{base_name}"
    generate_thumbnails(input_path, thumbnails_dir, base_name)

    return f"{base_name}_master.m3u8"



async def save_and_convert(file: UploadFile, upload_dir: str, output_dir: str):
    filename = f"{uuid.uuid4()}.mp4"
    input_path = os.path.join(upload_dir, filename)

    with open(input_path, "wb") as f:
        f.write(await file.read())

    base_name = Path(filename).stem
    output_hls_path = os.path.join(output_dir, base_name)
    playlist = convert_to_hls(input_path, output_hls_path, base_name)

    return f"/hls/{base_name}/{playlist}"
