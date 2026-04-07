# Mudança para Docker - Explicação

## 🔴 O Problema com Node.js Runtime do Render

### O que aconteceu

Tentamos usar `startCommand` em `render.yaml` com `runtime: node`, mas:

```
❌ Render IGNOROU completamente o startCommand
❌ Render executou seu padrão: npm run start; npm start
❌ Build nunca foi executado
❌ .next/ nunca foi criado
❌ Resultado: Could not find a production build
```

**Evidência nos logs:**
```
==> Running 'npm run start; npm start '
```

Render simplesmente ignorou nossa configuração de `startCommand: bash start.sh`.

---

## ✅ Solução: Docker Runtime

Ao invés de contar com o Render para executar nossos comandos, nós **controlamos tudo através do Dockerfile**:

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
COPY .npmrc ./
RUN npm ci --legacy-peer-deps
COPY . .
RUN npm run build          ← Build garantido
EXPOSE 3000
CMD ["npm", "start"]        ← Start com .next/ já pronto
```

### Como funciona no Render com Docker

1. Render detecta `Dockerfile`
2. Render constrói a imagem Docker (nossa receita, nossas regras)
3. Render executa a imagem
4. Resultado: Build + Start funcionam garantidamente

---

## 📝 Mudanças Realizadas

| Arquivo | Mudança |
|---------|---------|
| `render.yaml` | `runtime: node` → `runtime: docker` |
| `render.yaml` | Removido `buildCommand` e `startCommand` (Docker controla) |
| `Dockerfile` | ✅ Já existia, agora será usado |
| `.dockerignore` | ✅ Novo, otimiza tamanho da imagem |

---

## ⏭️ Próximo Passo

No Render dashboard:

1. Clique em **"Manual Deploy"**
2. Render detectará `Dockerfile` automaticamente
3. Espere pelos logs mostrarem:
   ```
   ==> Building Docker image
   ==> Running: npm run build
   ==> Running: npm start
   ==> Ready in ...
   ```

---

## ✨ Por que Docker é a Solução Correta

| Aspecto | Node Runtime Render | Docker |
|--------|-------------------|--------|
| Controle | Render decide | Nós decidimos |
| Build persistência | ❌ Não garante | ✅ Garantido |
| Variabilidade | ❌ Comportamento inconsistente | ✅ Consistente |
| Reprodutibilidade | ❌ Pode variar | ✅ Mesma receita sempre |

---

## Commits Realizados

```
6764a8b chore: Add .dockerignore to optimize Docker build size
ee88950 fix: Switch to Docker runtime - Render was ignoring Node.js startCommand
```

---

**Status:** Docker está pronto no GitHub. Próximo passo: Você clica "Manual Deploy" no Render.
