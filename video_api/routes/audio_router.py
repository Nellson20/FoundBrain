import os
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse,FileResponse
from fastapi.staticfiles import StaticFiles 
from services.audio_service import upload_audio_with_peaks
from fastapi import APIRouter

AUDIO_UPLOAD_DIR = "/audio"

audio_router = APIRouter()

@audio_router.post("/upload")
async def upload_audio(file: UploadFile = File(...)):
    try:
        hls_url = await upload_audio_with_peaks(file)
        return {"message": "Conversion réussie", "hls_url": hls_url}
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

@audio_router.get("/peaks/{filename}")
async def get_audio_peaks(filename: str):
    peak_file = os.path.join(AUDIO_UPLOAD_DIR, filename.rsplit(".",1)[0] + ".json")
    if os.path.isfile(peak_file):
        return FileResponse(peak_file, media_type="application/json")
    return {"error": "Peaks file not found"}

