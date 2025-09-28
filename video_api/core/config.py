from pydantic_settings import BaseSettings, SettingsConfigDict
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

class Settings(BaseSettings):
    domain_name: str

    model_config = SettingsConfigDict(env_file=BASE_DIR / ".env")

settings = Settings()