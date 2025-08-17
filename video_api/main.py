from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

from routes.audio_router import audio_router
from routes.video_router import video_router

from core.config import settings

app = FastAPI(debug=True)

origins = [
    "https://foundbrain.local",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(video_router,prefix="/video",tags=["video"])
app.include_router(audio_router,prefix="/audio",tags=["audio"])



    