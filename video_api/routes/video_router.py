
import os
from fastapi import UploadFile, File, HTTPException
from fastapi.responses import JSONResponse,FileResponse
from fastapi import APIRouter
from services.video_service import save_and_convert

UPLOAD_DIR = "/app/uploads"
HLS_OUTPUT_DIR = "/hls"

video_router = APIRouter()


@video_router.post("/upload")
async def upload_video(file: UploadFile = File(...)):
    try:
        hls_url = await save_and_convert(file, UPLOAD_DIR, HLS_OUTPUT_DIR)
        return {"message": "Conversion réussie", "hls_url": hls_url}
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})
    
@video_router.get("/vtt/{video_id}")
def get_vtt(video_id: str):
    vtt_path = f"/media/thumbnails/{video_id}/thumbnails.vtt"
    if not os.path.exists(vtt_path):
        raise HTTPException(status_code=404, detail="VTT not ready",headers={"Access-Control-Allow-Origin": "*"})
    return FileResponse(
        vtt_path,
        media_type="text/vtt",
        headers={"Access-Control-Allow-Origin": "*"}
    )

@video_router.get("/sprt/{video_id}")
def get_sprite(video_id: str):
    sprite_path = f"/media/thumbnails/{video_id}/sprite.jpg"
    if not os.path.exists(sprite_path):
        raise HTTPException(status_code=404, detail="Sprite not ready")
    return FileResponse(
        sprite_path, 
        media_type="image/jpeg",
        headers={"Access-Control-Allow-Origin": "*"} 
    )