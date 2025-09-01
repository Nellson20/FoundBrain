# Utilise Node.js LTS
FROM node:20

# Dossier de travail
WORKDIR /app

# Copier package.json + package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install --legacy-peer-deps

# Copier tout le code après install
COPY . .

# Lancer l'app
CMD ["npm", "start"]

EXPOSE 3000
