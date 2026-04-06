# 📚 PROJETO YF - Documentação de Deployment

## 🎯 Infraestrutura Planejada

```
┏━━━━━━━━━━━━━━━━━━┓
┃  VERCEL          ┃  Frontend React + NextAuth
┃  (Frontend)      ┃  https://seu-frontend.vercel.app
┗━━━━━━┬━━━━━━━━━━┛
       │
       │ API Calls
       │
┏━━━━━━▼━━━━━━━━━┓
┃  RENDER        ┃  Backend API + NextAuth Server
┃  (Backend)     ┃  https://projeto-yf-api.onrender.com
┗━━━━━━┬━━━━━━━━┛
       │
       │ Queries
       │
┏━━━━━━▼━━━━━━━━┓
┃  NEON         ┃  PostgreSQL Serverless
┃  (Database)   ┃  sa-east-1 (São Paulo)
┗━━━━━━━━━━━━━━┛
       │
       │ File Upload
       │
┏━━━━━━▼━━━━━━━━┓
┃  CLOUDINARY   ┃  Image & File Storage
┃  (Storage)    ┃  dap4gy4pa
┗━━━━━━━━━━━━━━┛
```

## 📁 Documentação Disponível

### 🚀 COMEÇAR AQUI:
1. **RENDER_INFRA_READY.md** ← Visão geral (você está aqui)
2. **RENDER_SETUP.md** ← Passo a passo completo
3. **RENDER_ENV_VARS.md** ← Variáveis para copiar/colar

### 📖 Documentação Complementar:
- **RAILWAY_TO_RENDER.md** - Por que mudar? Guia de migração
- **DEPLOYMENT_CHECKLIST.md** - Checklist geral de deployment
- **PHASE_1_COMPLETE.md** - Arquitetura da aplicação
- **VERCEL_DEPLOYMENT.md** - Deploy do Vercel (Frontend)

### 🔧 Arquivos de Configuração:
- **render.yaml** - Configuração do Render (Web Service)
- **.env.render** - Variáveis de exemplo
- **package.json** - Scripts de build/start
- **prisma/schema.prisma** - Estrutura do banco

---

## ⚡ Quick Start (5 minutos)

### 1️⃣ Criar Web Service no Render
```bash
→ Acesse: https://render.com
→ Sign up com GitHub
→ New Web Service
→ Conecte: yfprojeto-beep/projetoYF
```

### 2️⃣ Configurar Serviço
```
Name: projeto-yf-api
Build Command: npm ci && npm run build
Start Command: npm start
```

### 3️⃣ Adicionar Variáveis
→ Copie de: RENDER_ENV_VARS.md
→ Cole no: Render Dashboard → Environment

### 4️⃣ Deploy
```
Clique: Create Web Service
Aguarde: 3-5 minutos de build
```

### 5️⃣ Teste
```bash
curl https://projeto-yf-api.onrender.com/login
# Deve retornar HTML da página de login
```

---

## 🔑 Variáveis de Ambiente

### Obrigatórias:
```
DATABASE_URL         # De: Neon console
NEXTAUTH_SECRET      # Você já tem
CLOUDINARY_API_KEY   # De: Cloudinary
CLOUDINARY_API_SECRET # De: Cloudinary
```

### Opcionais:
```
NEXTAUTH_URL         # Auto-preenchido: https://projeto-yf-api.onrender.com
CLOUDINARY_UPLOAD_PRESET # Se usar upload
NEXT_PUBLIC_API_URL  # https://projeto-yf-api.onrender.com
```

**⚠️ Importante:** Todas as variáveis estão em `RENDER_ENV_VARS.md`

---

## ✅ Verificação de Status

### Após Deploy no Render, Teste:

```javascript
// 1. Abra o console do navegador (F12)
// 2. Execute:

// Teste 1: Conectar ao backend
fetch('https://projeto-yf-api.onrender.com/api/processos')
  .then(r => r.json())
  .then(console.log)

// Teste 2: Login
const res = await fetch('https://projeto-yf-api.onrender.com/api/auth/signin', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'admin@projetoyf.com',
    password: 'admin123'
  })
})
console.log(res)
```

### Sinais de Sucesso:
- ✅ Render diz "Active"
- ✅ URL responde (200 OK)
- ✅ APIs retornam dados (ou erro 401 se não autenticado - é normal)
- ✅ Login page carrega

### Sinais de Problema:
- ❌ Render diz "Build failed"
- ❌ Erro 502 Bad Gateway
- ❌ Erro de banco de dados
- ❌ CORS error no console

---

## 📊 Próximas Fases

### Fase 1: Deploy ✅ (Você está aqui)
- [x] Código pronto e testado
- [x] Configuração Render criada
- [ ] Render deploy ← **PRÓXIMO PASSO**
- [ ] Variáveis configuradas ← **PRÓXIMO PASSO**

### Fase 2: Integração
- [ ] Vercel conectado ao Render
- [ ] Frontend consegue chamar API
- [ ] Login funciona end-to-end
- [ ] Banco de dados com dados de teste

### Fase 3: Produção
- [ ] Performance testada
- [ ] Segurança validada
- [ ] Backups configurados
- [ ] Monitoramento ativo

---

## 🆘 Troubleshooting Rápido

| Erro | Solução |
|------|---------|
| "Build failed" | Veja logs do Render → procure por TypeScript error |
| "502 Bad Gateway" | Render ainda está iniciando, aguarde 1-2 min |
| "Database connection refused" | DATABASE_URL incorreta ou IP não permitido |
| "NEXTAUTH_SECRET not set" | Adicione no Render Environment |
| "CORS error" | Adicione NEXT_PUBLIC_API_URL no Vercel |
| "Frontend não vê backend" | Verifique se URL do Render é HTTPS |

---

## 🚀 Passo Agora

### Opção A: Guia Completo
1. Abra: **RENDER_SETUP.md**
2. Siga cada passo (1-9)
3. Relporte qualquer erro

### Opção B: Rápido
1. Acesse: **https://render.com**
2. Crie Web Service
3. Copie variáveis de **RENDER_ENV_VARS.md**
4. Faça deploy

---

## 📞 Referências Rápidas

- **Render:** https://render.com
- **Neon:** https://neon.tech
- **Cloudinary:** https://cloudinary.com
- **Vercel:** https://vercel.com
- **GitHub:** https://github.com/yfprojeto-beep/projetoYF

---

## 💾 Commits Recentes

```
d672eec - feat: Add Render backend deployment configuration
d6d2052 - fix: Resolve NextAuth route handler type compatibility
6724048 - fix: Resolve TypeScript errors and build failures
```

---

**Última Atualização:** 06/04/2026
**Status:** ✅ Código pronto, Render aguardando configuração
**Tempo Estimado:** 15-20 minutos para configurar tudo
