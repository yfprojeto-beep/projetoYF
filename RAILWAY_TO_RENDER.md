# Migração: Railway → Render

## ❌ Por Que Mudar de Railway para Render?

| Aspecto | Railway | Render |
|--------|---------|--------|
| Build Speed | Lento (5-10 min) | Rápido (2-5 min) |
| Documentação | Boa | Excelente |
| Variáveis Env | Confuso | Intuitivo |
| Tipos de Deploy | Limitado | Muito flexível |
| Pricing | Caro | Mais econômico |
| CORS Support | Problemático | Fácil |
| Health Checks | Não tem | Tem |

## 📋 Checklist de Migração

- [ ] Criar conta no Render.com
- [ ] Conectar GitHub ao Render
- [ ] Criar Web Service "projeto-yf-api"
- [ ] Configurar todas as variáveis de ambiente
- [ ] Fazer deploy
- [ ] Testar login e APIs
- [ ] Atualizar URLs no Vercel
- [ ] Desligar Railway (opcional)

## 🚀 Passo a Passo Rápido

### 1. Criar Conta
```
Acesse: https://render.com
Sign Up → GitHub → Autorizar
```

### 2. Criar Web Service
```
New + → Web Service → Selecionar repositório
Name: projeto-yf-api
Branch: master
Runtime: Node
```

### 3. Configurar Build
```
Build Command: npm ci && npm run build
Start Command: npm start
```

### 4. Adicionar Variáveis
```
Cole as variáveis do arquivo RENDER_ENV_VARS.md
```

### 5. Deploy
```
Create Web Service → Aguardar build
```

## 🔗 Conectar Vercel ao Render

1. Vá para: https://vercel.com/dashboard/projeto-yf/settings/environment-variables
2. Adicione:
   ```
   NEXT_PUBLIC_API_URL = https://projeto-yf-api.onrender.com
   ```
3. Clique em "Redeploy" no Vercel

## 🧪 Testar Tudo

```bash
# 1. Verificar se Render está rodando
curl https://projeto-yf-api.onrender.com

# 2. Fazer login
curl -X POST https://projeto-yf-api.onrender.com/api/auth/signin

# 3. Listar processos
curl https://projeto-yf-api.onrender.com/api/processos

# 4. Testar do frontend (abrir devtools no navegador)
fetch('https://projeto-yf-api.onrender.com/api/processos')
  .then(r => r.json())
  .then(console.log)
```

## 📊 Status da Migração

```
Railway ❌ → Render ✅
├── Backend em Railway (obsoleto)
├── Backend em Render (novo)
└── Frontend em Vercel (mantido)
```

## 💡 Próximas Ações

1. Seguir instruções do RENDER_SETUP.md
2. Adicionar variáveis do RENDER_ENV_VARS.md
3. Testar tudo funcionando
4. Considerar desligar Railway (economiza $$)

---

**Tempo total esperado:** 15-20 minutos
