import os
import shutil
import subprocess
import json
from fastapi import UploadFile, File, HTTPException
from fastapi.responses import JSONResponse,FileResponse
import tempfile


AUDIO_UPLOAD_DIR = "/audio"

def scale_waveform_json(json_path):
    with open(json_path, "r") as f:
        json_content = json.load(f)

    data = json_content["data"]
    channels = json_content.get("channels", 1)
    digits = 2  # Nombre de décimales pour le round

    max_val = float(max(data))
    if max_val == 0:
        return  # Eviter division par zéro

    scaled_data = [round(x / max_val, digits) for x in data]

    if channels > 1:
        json_content["data"] = deinterleave(scaled_data, channels)
    else:
        json_content["data"] = scaled_data

    with open(json_path, "w") as f:
        json.dump(json_content, f, separators=(",", ":"))

def deinterleave(data, channel_count):
    # Séparer les valeurs min/max intercalées pour chaque canal
    deinterleaved = [data[i::channel_count * 2] for i in range(channel_count * 2)]
    new_data = []

    for ch in range(channel_count):
        idx1 = 2 * ch
        idx2 = 2 * ch + 1
        ch_data = [None] * (len(deinterleaved[idx1]) + len(deinterleaved[idx2]))
        ch_data[::2] = deinterleaved[idx1]
        ch_data[1::2] = deinterleaved[idx2]
        new_data.append(ch_data)

    return new_data

async def upload_audio_with_peaks(file: UploadFile = File(...)):
    
    temp_wav = tempfile.NamedTemporaryFile(suffix=".wav", delete=False)
    temp_wav_path = temp_wav.name
    temp_wav.close()
    
    if not file.content_type.startswith("audio/"):
        return JSONResponse(status_code=400, content={"message": "Fichier audio requis"})

    file_location = os.path.join(AUDIO_UPLOAD_DIR, file.filename)
    peaks_path = os.path.join(AUDIO_UPLOAD_DIR, file.filename.rsplit(".", 1)[0] + ".json")

    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        
        subprocess.run([
            "ffmpeg", "-y", "-i", file_location,
            "-ac", "1", "-ar", "44100", "-sample_fmt", "s16",
            temp_wav_path
        ], check=True)
        
        subprocess.run([
            "audiowaveform",
            "-i", temp_wav_path,
            "-o", peaks_path,
            "--pixels-per-second", "20",
            "--bits", "8"
        ], check=True)
        
        subprocess.run([
            "ffmpeg", "-y",             
            "-i", temp_wav_path,              
            "-codec:a", "libmp3lame",    
            "-b:a", "192k",              
            file_location.replace(".wav", ".mp3")
        ], check=True)

        
        print("✅ Peaks générés avec succès")
        
    except subprocess.CalledProcessError as e:
        return JSONResponse(status_code=500, detail="Error generating waveform peaks", content={"error": str(e)})

    return {"message": "Fichier audio traité avec succès", "peaks_path": peaks_path}