# Usar Node.js 20 como base (compatível com Next.js 16.2.1)
FROM node:20-alpine

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependência
COPY package*.json ./
COPY .npmrc ./

# Instalar dependências com legacy-peer-deps
RUN npm ci --legacy-peer-deps

# Copiar código-fonte
COPY . .

# Executar build do Next.js
RUN npm run build

# Expor porta (Render usa PORT env var)
EXPOSE 3000

# Iniciar aplicação
CMD ["npm", "start"]
