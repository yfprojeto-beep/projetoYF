# Guia: Configurar Backend no Render

## 📋 Pré-requisitos
- ✅ Conta Neon Tech (banco de dados)
- ✅ Conta Cloudinary (armazenamento)
- ✅ Repositório GitHub (código)
- ✅ Criar conta no Render.com

## 🚀 Passo 1: Criar Conta e Conectar GitHub no Render

1. Acesse: https://render.com
2. Clique em "Sign up"
3. Escolha "Sign up with GitHub"
4. Autorize Render a acessar seu repositório
5. Clique em "Continue"

## 🚀 Passo 2: Criar Novo Serviço Web

1. No dashboard do Render, clique em "New +"
2. Selecione "Web Service"
3. Procure por `yfprojeto-beep/projetoYF` (seu repositório)
4. Se não aparecer, clique em "Connect account" para autorizar

## 🚀 Passo 3: Configurar o Serviço

### Nome e Configuração Básica:
- **Name:** `projeto-yf-api`
- **Environment:** `Node`
- **Region:** `São Paulo (sa-east-1)` ou mais próximo
- **Branch:** `master`
- **Build Command:** `npm ci && npm run build`
- **Start Command:** `npm start`

### Plano:
- Escolha "Standard" (pago) ou "Free" (para teste)
- ⚠️ Free é lento e pode dar sleep, Standard é recomendado

## 🚀 Passo 4: Adicionar Variáveis de Ambiente

No Render dashboard, vá para a aba "Environment":

### Variáveis Públicas (NEXT_PUBLIC_*):
```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = dap4gy4pa
NEXT_PUBLIC_API_URL = https://projeto-yf-api.onrender.com
```

### Variáveis Privadas:
```
NODE_ENV = production
LOG_LEVEL = info

NEXTAUTH_SECRET = xK9pL3mN8qR2vW5xY7zA0bC4dE6fG7hI9jK1lM3nO5pQ7

NEXTAUTH_URL = https://projeto-yf-api.onrender.com
(será gerada automaticamente após deploy)

DATABASE_URL = postgresql://neondb_owner:npg_ONYzQKc1iLI4@ep-sparkling-meadow-aco5em1i-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require

CLOUDINARY_API_KEY = 714389839699964
CLOUDINARY_API_SECRET = -wJ4nPZ_wgOk9L9iFPBmpdKYcIw
CLOUDINARY_UPLOAD_PRESET = seu_preset_aqui
```

⚠️ **IMPORTANTE:** 
- DATABASE_URL: Copie do seu Neon console
- CLOUDINARY_UPLOAD_PRESET: Crie um preset no Cloudinary se não tiver

## 🚀 Passo 5: Fazer Deploy

1. Clique em "Create Web Service"
2. Aguarde o build (pode levar 3-5 minutos)
3. Veja o progresso em "Logs"

## ✅ Verificar se o Deploy Funcionou

1. Vá para "Settings" e procure por "Render URL"
   - Deve ser algo como: `https://projeto-yf-api.onrender.com`

2. Teste a URL:
   - Abra em seu navegador: `https://projeto-yf-api.onrender.com/login`
   - Você deve ver a página de login

3. Se der erro, verifique os logs:
   - Clique em "Logs" no dashboard do Render
   - Procure por erros de TypeScript ou database connection

## 🔗 Passo 6: Conectar Vercel (Frontend) ao Render (Backend)

Agora precisa configurar o Vercel para saber a URL do backend:

1. Vá para: https://vercel.com/dashboard/projeto-yf/settings/environment-variables

2. Adicione (se não tiver):
   ```
   NEXT_PUBLIC_API_URL = https://projeto-yf-api.onrender.com
   ```

3. Redeploy no Vercel:
   - Vá para "Deployments"
   - Clique em "Redeploy" no último deployment

## 🔐 Passo 7: Configurar CORS (se necessário)

Se o frontend tiver problemas ao chamar a API, adicione CORS:

1. No Render, adicione variável:
   ```
   ALLOWED_ORIGINS = https://seu-frontend-vercel.vercel.app,https://seu-dominio.com
   ```

2. Atualize `src/middleware.ts` ou crie middleware para CORS

## 🗄️ Passo 8: Executar Migrações e Seed

Após o Render estar rodando, execute no seu terminal local:

```bash
# Migrar banco de dados
DATABASE_URL="postgresql://neondb_owner:npg_ONYzQKc1iLI4@ep-sparkling-meadow-aco5em1i-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require" npx prisma migrate deploy

# Fazer seed (usuários de teste)
DATABASE_URL="postgresql://..." npm run seed
```

## 🧪 Passo 9: Testar APIs

1. Abra o site no Vercel: `https://seu-frontend.vercel.app/login`
2. Faça login com:
   - **Email:** admin@projetoyf.com
   - **Senha:** admin123

3. Abra o console (F12) e teste:
   ```javascript
   fetch('https://projeto-yf-api.onrender.com/api/processos')
     .then(r => r.json())
     .then(d => console.log('Processos:', d))
   ```

## 📊 Arquitetura Final

```
┌─────────────────────────────────────────────┐
│           FRONTEND (Vercel)                 │
│  https://seu-frontend.vercel.app            │
└────────────────┬────────────────────────────┘
                 │ (API calls)
                 ▼
┌─────────────────────────────────────────────┐
│        BACKEND/API (Render)                 │
│  https://projeto-yf-api.onrender.com        │
│  - NextAuth (Autenticação)                  │
│  - APIs REST (CRUD)                         │
└────────────────┬────────────────────────────┘
                 │ (Database)
                 ▼
┌─────────────────────────────────────────────┐
│      BANCO DE DADOS (Neon)                  │
│  PostgreSQL Serverless                      │
└─────────────────────────────────────────────┘
                 │ (File Storage)
                 ▼
┌─────────────────────────────────────────────┐
│       STORAGE (Cloudinary)                  │
│  Images & File Management                   │
└─────────────────────────────────────────────┘
```

## 🆘 Troubleshooting

### Erro: "Build failed"
- Verifique os logs no Render
- Procure por erros TypeScript
- Execute `npm run build` localmente para testar

### Erro: "Database connection refused"
- DATABASE_URL está incorreta?
- Falta `?sslmode=require` ao final?
- IP do Render está permitido no Neon?

### Erro: "NEXTAUTH_SECRET not set"
- Adicione NEXTAUTH_SECRET nas variáveis do Render

### Frontend não consegue chamar API
- Verifique NEXT_PUBLIC_API_URL
- Verifique CORS
- Veja se a URL do Render está correta

## 📝 Checklist Final

- [ ] Conta Render criada
- [ ] Repositório GitHub conectado
- [ ] Web Service "projeto-yf-api" criado
- [ ] Todas as variáveis de ambiente configuradas
- [ ] Deploy completou com sucesso
- [ ] Login funciona no Render URL
- [ ] APIs respondendo com dados
- [ ] Vercel configurado com NEXT_PUBLIC_API_URL
- [ ] Frontend consegue chamar backend
- [ ] Banco de dados migrado e com seed

---

**Próximo Passo:** Execute os passos acima e relporte qualquer erro!
