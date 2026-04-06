# 🚀 Instruções para Deploy no Vercel

## Status Atual
- ✅ Código pushado para GitHub (branch main)
- ⏳ Vercel está construindo o projeto
- ⏳ Aguardando configuração de variáveis de ambiente

## Próximas Etapas

### 1. Configurar Variáveis de Ambiente no Vercel

Acesse: https://vercel.com/dashboard/projeto-yf/settings/environment-variables

Adicione as seguintes variáveis:

```
# Database
DATABASE_URL=postgresql://user:password@host/projetoYF?schema=public&sslmode=require

# NextAuth
NEXTAUTH_URL=https://projeto-yf.vercel.app
NEXTAUTH_SECRET=<gerar uma string aleatória de 32+ caracteres>

# Cloudinary
CLOUDINARY_CLOUD_NAME=<seu_cloud_name>
CLOUDINARY_API_KEY=<sua_api_key>
CLOUDINARY_API_SECRET=<seu_api_secret>
CLOUDINARY_UPLOAD_PRESET=<seu_preset>
```

### 2. Gerar NEXTAUTH_SECRET

Execute localmente:
```bash
openssl rand -base64 32
```

Ou use:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 3. Monitorar o Deploy

1. Vá para https://vercel.com/dashboard/projeto-yf
2. Clique em "Deployments"
3. Aguarde o build completar

Se houver erro:
- Verifique os logs: Click no deployment → View Logs
- Procure por erros de build

### 4. Verificar Se Está Online

Acesse: https://projeto-yf.vercel.app/

Deve mostrar a página de login (não mais a página padrão do Next.js)

### 5. Preparar o Banco de Dados

Após o deploy estar online:

```bash
# Conectar ao banco remoto e executar as migrações
npx prisma migrate deploy

# Ou criar a migrate se não existir:
npx prisma migrate dev --name init

# Depois fazer seed dos dados iniciais
npm run seed
```

### 6. Testar a Autenticação

1. Vá para https://projeto-yf.vercel.app/login
2. Use as credenciais de demo:
   - Email: admin@projetoyf.com
   - Senha: admin123
3. Você deve ser redirecionado para o dashboard

### 7. Testar APIs

Após estar logado, abra o console do navegador e teste:

```javascript
// Listar processos
fetch('/api/processos')
  .then(r => r.json())
  .then(d => console.log(d))

// Criar um novo processo
fetch('/api/processos', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    processNumber: '202404.001.02',
    statusId: '...',  // ID do status de abertura
    insured: 'Teste',
    insurer: 'Seguradora'
  })
})
.then(r => r.json())
.then(d => console.log(d))
```

## Variáveis de Ambiente - Referência

### DATABASE_URL
- Obtém da Neon: https://console.neon.tech
- Clicar no projeto → Connection string → Pooling connection (para serverless)

### CLOUDINARY
- Obter em: https://cloudinary.com/console/settings/api-keys
- Upload Preset: Cloudinary → Settings → Upload → Add upload preset

### NEXTAUTH_SECRET
- Use um valor criptograficamente seguro (32+ caracteres)
- Mesmo valor para dev e produção

## Troubleshooting

### "Build failed"
- Verifique os logs do build no Vercel
- Procure por erros de TypeScript ou dependências
- Execute `npm install` localmente e teste com `npm run build`

### "Database connection failed"
- Verifique se DATABASE_URL está correta
- Teste a conexão localmente
- Verifique se o IP do Vercel está na allowlist do banco (geralmente não necessário para Railway)

### "Cloudinary upload failed"
- Verifique CLOUDINARY_CLOUD_NAME
- Confirme que o upload preset existe
- Teste upload localmente

### "Login não funciona"
- Verifique se NEXTAUTH_URL está correto
- Limpe cookies do navegador
- Verifique se NEXTAUTH_SECRET está configurado

## Monitoramento

### Ver logs em tempo real
```bash
# Instalgar Vercel CLI
npm install -g vercel

# Acessar logs
vercel logs projeto-yf --follow
```

### Ver Banco de Dados
- Acesse Neon: https://console.neon.tech
- Veja se dados foram criados após o seed

## Próximas Fases

Depois que estiver rodando:

1. **Phase 2:** Conectar frontend aos APIs reais
2. **Phase 3:** Testes de integração
3. **Phase 4:** Otimizações de performance
4. **Phase 5:** Relatórios e Analytics

---

**Próximo Passo:** Configure as variáveis de ambiente no Vercel e o projeto estará completamente online!
