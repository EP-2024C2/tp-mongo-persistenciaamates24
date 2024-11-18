# Dockerfile
FROM node:14

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de configuración y instala las dependencias
COPY package*.json ./
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Expone el puerto
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
