#!/bin/bash

set -e

echo "=== 🚀 Configuration de FoundBrain - Linux/macOS ==="

# 1. Ajout des hosts
echo "➡️ Ajout des hosts..."
if ! grep -q "foundbrain.local" /etc/hosts; then
    echo "127.0.0.1 foundbrain.local" | sudo tee -a /etc/hosts
    echo "127.0.0.1 api.foundbrain.local" | sudo tee -a /etc/hosts
fi

# 2. Installation de mkcert si absent
if ! command -v mkcert &> /dev/null; then
    echo "➡️ Installation de mkcert..."
    sudo apt update
    sudo apt install libnss3-tools wget -y
    wget https://github.com/FiloSottile/mkcert/releases/latest/download/mkcert-v1.4.4-linux-amd64 -O mkcert
    chmod +x mkcert
    sudo mv mkcert /usr/local/bin/mkcert
fi

# 3. Génération des certificats
mkcert -install

# 4. Lancement de Docker
echo "➡️ Lancement de Docker..."
docker compose up --build -d

echo "✅ Installation terminée !"
echo "Accédez au service :"
echo "👉 https://foundbrain.local"
