# 📋 GUIA: MONITORAR DEPLOY EM TEMPO REAL

## 🟢 VERCEL DEPLOYMENT

### 1. Acessar Dashboard Vercel
```
URL: https://vercel.com/yfprojeto-beeps-projects/projeto-yf
```

### 2. Verificar Status
**Aba "Deployments"** - Procure por deployment mais recente
- Deve estar com status 🔵 "Building" ou 🟢 "Ready"
- Timestamp deve ser agora (últimos 5 minutos)

### 3. Verificar Build Logs
**Clique no deployment** → **Aba "Logs"**
Procure por:
```
✓ Compiled successfully
✓ Generating static pages
✓ Deployment Complete
```

### 4. Acessar Aplicação
**Se deployment bem-sucedido (🟢 Ready)**:
```
https://projeto-yf.vercel.app
```

**Você deve ver**:
- ✅ Página de login ou dashboard
- ✅ CSS carregado (cores YF vermelhas visíveis)
- ✅ Sem erros em console do navegador (F12)

---

## 🟠 RAILWAY DEPLOYMENT

### 1. Acessar Dashboard Railway
```
URL: https://railway.app/dashboard
```

### 2. Selecionar Projeto
- Procure por "projeto-yf" na lista de projetos
- Clique para entrar

### 3. Verificar Status da Aplicação
**Aba "Services"** → Clique em aplicação
- Status deve estar 🟢 "Running" ou 🟡 "Building"

### 4. Verificar Build Logs
**Aba "Logs"** ou **Clique em "View Logs"**
Procure por:
```
> npm run build
> npm run start

Listening on 0.0.0.0:3000
```

### 5. Verificar Database Connection
Procure por linhas como:
```
Connected to database: postgresql://neondb_owner@...
```

**Se vir erro**:
```
error: connect ECONNREFUSED
```
Significa DATABASE_URL está errada → Verificar em Railway Variables

### 6. Verificar Migrations Prisma
Procure por linhas como:
```
$ npx prisma migrate deploy
Migrations to apply: 0
All migrations have been applied.
```

**Se erro**:
```
Error: P1012 - datasource property url is no longer supported
```
Significa que ainda precisa criar `prisma.config.ts` (Phase 2)

---

## ✅ TESTES APÓS DEPLOY

### Teste 1: Frontend Carrega
```bash
curl -I https://projeto-yf.vercel.app
```
Esperado:
```
HTTP/2 200
```

### Teste 2: API Backend Responde
```bash
curl https://projeto-yf.vercel.app/api/processos
```
Esperado: JSON com dados (ou erro controlled)

### Teste 3: Verificar Conexão Database
Acessar via psql (local):
```bash
psql "postgresql://neondb_owner:npg_ONYzQKc1iLI4@ep-sparkling-meadow-aco5em1i-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require"
\dt
\q
```

---

## 🚨 PROBLEMAS COMUNS

### Problema 1: Vercel Build Falha
**Log mostra**: "Build error occurred"

**Solução**:
1. Voltar em "Settings" → "Build & Development Settings"
2. Verificar "Build Command": `next build`
3. Verificar "Install Command": `npm install`
4. Tentar rebuild localmente: `npm run build`
5. Fazer novo push

### Problema 2: Railway Application Crashes
**Status**: 🔴 "Crashed"

**Verificar**:
1. Aba "Logs" → procurar por erro
2. Se erro DATABASE_URL → Verificar em "Variables"
3. Se erro NEXTAUTH_SECRET → Confirmar idêntico ao Vercel
4. Reiniciar aplicação: ⟳ Restart
5. Verificar Railway status page: status.railway.app

### Problema 3: Página Branca (Blank)
**Você vê página vazia ao acessar projeto-yf.vercel.app**

**Pode ser**:
1. Build ainda em progresso → Aguardar
2. Environment variables não carregadas → Verificar Vercel dashboard
3. JavaScript error → Abrir DevTools (F12) e verificar console
4. API route erro → Verificar se Railway está rodando

### Problema 4: Erro "Cannot find module '@prisma/client'"
**Solução**: Já foi resolvido adicionando Prisma como dependency

### Problema 5: "Module not found: Can't resolve './xxx.css'"
**Solução**: Já foi resolvido criando arquivos CSS faltantes

---

## 📞 DEBUGGING AVANÇADO

### Ver Variáveis de Ambiente Carregadas
**Vercel**: Settings → Environment Variables
**Railway**: Project → Variables

### Testar Localmente com .env Real
1. Crie `.env.local` com variáveis de produção
2. `npm run dev`
3. Tente reproduzir erro

### Ver Logs Vercel Real-Time
```bash
vercel logs projeto-yf --follow
```
(Requer CLI do Vercel instalado)

### Ver Logs Railway Real-Time
```bash
railway logs --follow
```
(Requer CLI do Railway instalado)

---

## ⏱️ TEMPO ESPERADO DE DEPLOY

| Plataforma | Tempo |
|-----------|-------|
| Vercel Build | 2-3 minutos |
| Vercel Deploy | +1 minuto |
| Railway Build | 3-5 minutos |
| Railway Deploy | +1 minuto |
| **Total** | **7-10 minutos** |

---

## 🎯 CHECKLIST DE SUCESSO

Marque conforme progride:

```
VERCEL:
☐ Deploy em "Ready" status
☐ URL https://projeto-yf.vercel.app responde
☐ Página carrega sem erros
☐ CSS/assets carregados
☐ Sem erros no console (F12)

RAILWAY:
☐ Aplicação em "Running" status
☐ Logs mostram "Listening on 0.0.0.0:3000"
☐ Migrations Prisma rodaram sem erro
☐ DATABASE_URL conectou com sucesso

CONECTIVIDADE:
☐ Frontend → Backend comunica
☐ Backend → Database conectado
☐ API endpoints respondendo
☐ Sem erros CORS
```

---

## 📖 PRÓXIMAS FASES

- **Fase 2**: Implementar autenticação NextAuth.js real
- **Fase 3**: Integrar APIs com banco de dados real
- **Fase 4**: Adicionar webhooks e notificações
- **Fase 5**: Setup CI/CD completo

