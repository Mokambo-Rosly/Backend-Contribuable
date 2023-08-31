# Utiliser l'image de base node.js
FROM node:18-alpine

# Créer un répertoire pour l'application
WORKDIR /app

# Copier les fichiers de l'application dans l'image
COPY package*.json ./
COPY . .

RUN npm install -g dotenv-cli

# Installer les dépendances de l'application
RUN npm install

RUN npm run generate:prod

# Compiler l'application
RUN npm run build

# Execution des migrations de base de donne de l'application
# RUN npm run migrate:prod

# Exposer le port utilisé par l'application
EXPOSE 5055

# Lancer l'application
CMD ["npm", "run", "start:prod"]