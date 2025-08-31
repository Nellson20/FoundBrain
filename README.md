# FoundBrain - Local Development Setup

![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?logo=nginx&logoColor=white)
![SSL](https://img.shields.io/badge/SSL-mkcert-FFCC00?logo=letsencrypt&logoColor=black)
![Windows](https://img.shields.io/badge/Windows-0078D6?logo=windows&logoColor=white)
![Linux](https://img.shields.io/badge/Linux-FCC624?logo=linux&logoColor=black)

Ce guide explique comment configurer l’environnement de développement local avec **Docker**, **Nginx**, et des certificats SSL générés avec **mkcert**.

---

### Windows
Si sous Docker Desktop
lancer `CONFIG_SSL.bat`(Double clique dessus dans l'explorateur de fichier)

Si sous WSL ouvrir cmd Windows en tant qu'admin et lancer la commande :
```
\\wsl$\Ubuntu\home\username\foundbrain\CONFIG_SSL.bat
```
⚠️ remplacer `\home\username\foundbrain\CONFIG_SSL.bat` par le chemin vers CONFIG_SSL.sh

Ensuite a la racine du dossier du projet lancer:
`docker compose up --build -d`
### Linux/MacOs
A la racine du dossier du projet lancer les commandes :
```
chmod +x CONFIG_SSL.sh
./CONFIG_SSL.sh
```