# Render Environment Variables - Quick Reference

## 📋 Copie e Cole no Render Dashboard

### Step 1: Vá para seu Web Service no Render
- Dashboard → projeto-yf-api → Environment

### Step 2: Adicione Estas Variáveis

#### PUBLIC VARIABLES (aparece no navegador)
```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dap4gy4pa
NEXT_PUBLIC_API_URL=https://projeto-yf-api.onrender.com
```

#### PRIVATE VARIABLES (servidor only)

**Server Configuration:**
```
NODE_ENV=production
LOG_LEVEL=info
```

**Authentication:**
```
NEXTAUTH_SECRET=xK9pL3mN8qR2vW5xY7zA0bC4dE6fG7hI9jK1lM3nO5pQ7
NEXTAUTH_URL=https://projeto-yf-api.onrender.com
```

**Database (Copie do Neon):**
```
DATABASE_URL=postgresql://neondb_owner:npg_ONYzQKc1iLI4@ep-sparkling-meadow-aco5em1i-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

**Cloudinary:**
```
CLOUDINARY_API_KEY=714389839699964
CLOUDINARY_API_SECRET=-wJ4nPZ_wgOk9L9iFPBmpdKYcIw
CLOUDINARY_UPLOAD_PRESET=seu_preset_name
```

## ⚠️ Observações Importantes

1. **DATABASE_URL:**
   - Copie exatamente do Neon console
   - Mantenha `?sslmode=require&channel_binding=require` ao final
   - Não remova o protocolo `postgresql://`

2. **NEXTAUTH_SECRET:**
   - Deve ser o mesmo em Render e Vercel
   - Use o valor existente que você já tem

3. **NEXTAUTH_URL:**
   - Será a URL do seu Render service
   - Exemplo: `https://projeto-yf-api.onrender.com`
   - Deve ser https, não http

4. **CLOUDINARY_UPLOAD_PRESET:**
   - Crie um preset no Cloudinary se não tiver
   - Acesse: cloudinary.com → Settings → Upload

## 🔄 Após Adicionar Variáveis

1. Clique em "Save Changes"
2. Render vai automaticamente fazer redeploy
3. Aguarde 3-5 minutos pelo build
4. Veja os logs para confirmar sucesso

## 🧪 Testar Conexão

```bash
# Teste 1: Acessar login page
curl https://projeto-yf-api.onrender.com/login

# Teste 2: Chamar API
curl https://projeto-yf-api.onrender.com/api/processos

# Teste 3: Verificar autenticação
curl -X POST https://projeto-yf-api.onrender.com/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@projetoyf.com","password":"admin123"}'
```

## 📱 URLs Finais da Infraestrutura

```
Frontend:  https://seu-frontend.vercel.app
Backend:   https://projeto-yf-api.onrender.com
Database:  neondb (sa-east-1)
Storage:   cloudinary.com
```
