# Render Deployment - Configuração Final

## Informações Coletadas ✅

```
DATABASE_URL: postgresql://neondb_owner:npg_ONYzQKc1iLI4@ep-sparkling-meadow-aco5em1i-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require

CLOUDINARY_UPLOAD_PRESET: ml_default

Cloudinary Credentials (já existentes):
- CLOUDINARY_CLOUD_NAME: dap4gy4pa
- CLOUDINARY_API_KEY: 714389839699964
- CLOUDINARY_API_SECRET: -wJ4nPZ_wgOk9L9iFPBmpdKYcIw

NextAuth:
- NEXTAUTH_SECRET: xK9pL3mN8qR2vW5xY7zA0bC4dE6fG7hI9jK1lM3nO5pQ7
```

## Próximos Passos para Deploy

1. **Acesse Render Dashboard:** https://dashboard.render.com

2. **Crie Web Service:**
   - New → Web Service
   - Conecte repositório: yfprojeto-beep/projetoYF
   - Branch: master

3. **Configure Serviço:**
   - Name: `projeto-yf-api`
   - Build Command: `npm ci && npm run build`
   - Start Command: `npm start`
   - Plan: Standard (recomendado)

4. **Adicione Environment Variables:**
   
   **Public Variables:**
   ```
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dap4gy4pa
   NEXT_PUBLIC_API_URL=https://projeto-yf-api.onrender.com
   ```

   **Private Variables:**
   ```
   NODE_ENV=production
   LOG_LEVEL=info
   NEXTAUTH_SECRET=xK9pL3mN8qR2vW5xY7zA0bC4dE6fG7hI9jK1lM3nO5pQ7
   NEXTAUTH_URL=https://projeto-yf-api.onrender.com
   DATABASE_URL=postgresql://neondb_owner:npg_ONYzQKc1iLI4@ep-sparkling-meadow-aco5em1i-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
   CLOUDINARY_API_KEY=714389839699964
   CLOUDINARY_API_SECRET=-wJ4nPZ_wgOk9L9iFPBmpdKYcIw
   CLOUDINARY_UPLOAD_PRESET=ml_default
   ```

5. **Deploy:**
   - Clique em "Create Web Service"
   - Aguarde 3-5 minutos

6. **Teste:**
   - Acesse: https://projeto-yf-api.onrender.com/login
   - Deve carregar a página de login

---

## ⚠️ Observações Importantes

- DATABASE_URL já tem `?sslmode=require` - não remova!
- NEXTAUTH_URL será a URL do Render (https://projeto-yf-api.onrender.com)
- Preset Cloudinary é "ml_default" (padrão do Cloudinary)
- Todas as variáveis devem ser exatamente como acima

---

## Checklist

- [ ] DATABASE_URL validada
- [ ] Preset Cloudinary criado (ml_default)
- [ ] Render Web Service criado
- [ ] Variáveis adicionadas
- [ ] Deploy iniciado
- [ ] Build concluído
- [ ] Login page carrega
- [ ] APIs respondendo
