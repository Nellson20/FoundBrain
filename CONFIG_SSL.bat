@echo off
echo === 🚀 Configuration de FoundBrain - Windows ===

REM 1. Ajout des hosts
echo ➡️ Ajout des hosts...
findstr /C:"foundbrain.local" C:\Windows\System32\drivers\etc\hosts >nul || (
    echo 127.0.0.1 foundbrain.local >> C:\Windows\System32\drivers\etc\hosts
    echo 127.0.0.1 api.foundbrain.local >> C:\Windows\System32\drivers\etc\hosts
)

REM 2. Vérifier mkcert
where mkcert >nul 2>nul
if %errorlevel% neq 0 (
    echo ⚠️ mkcert non trouvé. Téléchargez-le depuis :
    echo https://github.com/FiloSottile/mkcert/releases
    pause
    exit /b 1
)

REM 3. Génération des certificats
mkcert -install

REM 4. Lancement de Docker
echo ➡️ Lancement de Docker...
docker compose up --build -d

echo ✅ Installation terminée !
echo Accédez aux services :
echo 👉 https://foundbrain.local
echo 👉 https://api.foundbrain.local
pause
