# Alternativa: Docker para Render

## Quando Usar Esta Abordagem

Se o `start.sh` não funcionar (erro como `bash: start.sh: command not found`), o Docker é a próxima alternativa mais robusta.

---

## O Dockerfile

Arquivo: `Dockerfile`

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY .npmrc ./

RUN npm ci --legacy-peer-deps

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

**O que faz:**
1. Usa Node.js 20 (Alpine é leve)
2. Copia `package.json` e `.npmrc`
3. Instala dependências com `--legacy-peer-deps`
4. Copia código-fonte
5. **Executa `npm run build`** ← Gera `.next/`
6. Expõe porta 3000
7. Inicia com `npm start`

---

## Como Usar no Render

### Opção 1: Render Detecta Docker Automaticamente

1. Commit o `Dockerfile` para GitHub
2. Push para GitHub
3. Render verá o `Dockerfile` e construirá usando Docker automaticamente
4. Pronto!

**Passo a passo:**
```bash
git add Dockerfile
git commit -m "Add Dockerfile for Render deployment"
git push origin master
```

Depois, no dashboard do Render:
- Clique em "Manual Deploy"
- Render automaticamente detectará e usará o `Dockerfile`

### Opção 2: Configurar Render.yaml para Docker

Se precisar ser explícito, update `render.yaml`:

```yaml
services:
  - type: web
    name: projeto-yf-api
    runtime: docker
    plan: standard
    envVars:
      # ... resto das variáveis
```

---

## Vantagens do Docker

✅ **Consistência:** Mesmo ambiente que você testa localmente  
✅ **Isolamento:** Todos os arquivos do build ficam no contêiner  
✅ **Transparência:** Você controla exatamente como a app é construída  
✅ **Multi-stage:** Pode otimizar se necessário depois  

---

## Testar Localmente (Opcional)

Antes de enviar para Render, você pode testar:

```bash
# Construir imagem Docker
docker build -t projeto-yf .

# Rodar localmente
docker run -p 3000:3000 projeto-yf
```

Se funcionar localmente, funcionará no Render.

---

## Status

- ✅ `Dockerfile` criado
- ⏳ Aguardando teste de `start.sh` no Render
- 🔜 Se `start.sh` falhar, fazer push do `Dockerfile` para usar Docker

---

## Próximas Ações

1. **Aguarde resultado do bash script** no Render
2. **Se funcionar:** Remova o `Dockerfile` (não é necessário)
3. **Se falhar:** 
   - Commit o `Dockerfile`
   - Push para GitHub
   - Trigger manual deploy no Render
   - Render usará Docker automaticamente

