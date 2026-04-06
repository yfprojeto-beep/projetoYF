# 🎯 Checklist para Colocar PROJETO YF Online

## ✅ Completed (2026-04-06)
- [x] Código implementado com NextAuth, APIs e Prisma
- [x] Todos os endpoints CRUD criados
- [x] Seed script para banco de dados
- [x] Código enviado para GitHub (master branch)
- [x] **TODOS TypeScript errors corrigidos** (colSpan, type safety, NextAuth handlers)
- [x] Vercel build passou com sucesso
- [x] Railway type compatibility issues resolvidos
- [x] Commits: 6724048 (TypeScript fixes) e d6d2052 (NextAuth type fix)

## 📋 Próximos Passos

### PASSO 1: Verificar Build no Vercel ⏳
**Status:** Provavelmente em construção agora

1. Acesse: https://vercel.com/dashboard
2. Procure por "projeto-yf"
3. Veja o status do deployment

**Se o build falhar:**
- Clique em "View Logs"
- Procure pela causa do erro
- Geralmente é por variáveis de ambiente faltando

---

### PASSO 2: Configurar Variáveis de Ambiente no Vercel 🔧

**Você precisa fazer isso no dashboard do Vercel:**

1. Vá para: https://vercel.com/dashboard/projeto-yf/settings/environment-variables

2. Clique em "Add New"

3. Adicione EXATAMENTE estas variáveis:

| Nome | Valor | Onde Obter |
|------|-------|-----------|
| `DATABASE_URL` | `postgresql://...` | Neon Console → Connection String |
| `NEXTAUTH_URL` | `https://projeto-yf.vercel.app` | Usa essa URL mesmo |
| `NEXTAUTH_SECRET` | Gere com: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` | Execute no terminal |
| `CLOUDINARY_CLOUD_NAME` | Seu cloud name | Cloudinary → Settings → Account |
| `CLOUDINARY_API_KEY` | Sua API key | Cloudinary → Settings → API Keys |
| `CLOUDINARY_API_SECRET` | Seu API secret | Cloudinary → Settings → API Keys |
| `CLOUDINARY_UPLOAD_PRESET` | Nome do preset | Cloudinary → Settings → Upload |

**⚠️ IMPORTANTE:** Certifique-se de:
- Não deixar espaços em branco extras
- Usar a URL exata do Vercel
- DATABASE_URL com `?sslmode=require` ao final

---

### PASSO 3: Redeploy no Vercel 🚀

Depois de adicionar as variáveis:

1. Vá para: https://vercel.com/dashboard/projeto-yf/deployments
2. Clique em "Redeploy" no deployment mais recente
3. Aguarde o novo build completar

**Sinais de sucesso:**
- Build completa sem erros
- Status muda para "Ready"

---

### PASSO 4: Executar Migrações do Banco de Dados 🗄️

Quando o Vercel estiver ready, execute:

```bash
# SSH para banco de dados e execute:
npx prisma migrate deploy

# Ou crie a migrate inicial se não existir:
npx prisma migrate dev --name init
```

**Se usar Neon Query Editor:**
1. Copie os comandos SQL do arquivo de migração
2. Cole no Neon Query Editor
3. Execute

---

### PASSO 5: Fazer Seed do Banco de Dados 🌱

Execute o script de seed para criar usuários de teste:

```bash
npm run seed
```

**O que isso cria:**
- 4 roles (SuperAdmin, Analista, Vistoriador, Financeiro)
- 4 usuários de teste com senhas hash
- 1 processo de exemplo

**Usuários criados:**
```
admin@projetoyf.com / admin123
analista@projetoyf.com / analista123
vistoriador@projetoyf.com / vistoriador123
financeiro@projetoyf.com / financeiro123
```

---

### PASSO 6: Testar Login 🔐

1. Abra: https://projeto-yf.vercel.app/login
2. Faça login com:
   - **Email:** admin@projetoyf.com
   - **Senha:** admin123
3. Você deve ver o dashboard

**Se não funcionar:**
- Verifique se NEXTAUTH_SECRET está configurado
- Limpe cookies do navegador
- Tente incógnito

---

### PASSO 7: Testar APIs 🧪

Após estar logado no navegador, abra o console (F12) e execute:

```javascript
// Teste 1: Listar Processos
fetch('/api/processos')
  .then(r => r.json())
  .then(d => console.log('Processos:', d))

// Teste 2: Criar Novo Processo
fetch('/api/processos', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    processNumber: '202404.100.01',
    statusId: '<STATUS_ID>',
    insured: 'Teste Cliente',
    insurer: 'Seguradora XYZ'
  })
})
.then(r => r.json())
.then(d => console.log('Processo criado:', d))

// Teste 3: Listar Salvados
fetch('/api/salvados')
  .then(r => r.json())
  .then(d => console.log('Salvados:', d))

// Teste 4: Listar Transações Financeiras
fetch('/api/financeiro')
  .then(r => r.json())
  .then(d => console.log('Financeiro:', d))
```

**Resultados esperados:**
- Status 200 com dados em JSON
- Arrays vazios ou com dados conforme banco

---

## 📊 Status Atual

```
┌─────────────────────────────────────────────────────┐
│  PROJETO YF - Status de Deployment (06/04/2026)    │
├─────────────────────────────────────────────────────┤
│ ✅ Código no GitHub (master branch)                 │
│ ✅ TypeScript errors - RESOLVIDOS                   │
│ ✅ Vercel build - SUCESSO                           │
│ ✅ Railway type compatibility - CORRIGIDO           │
│ ⏳ Railway deploy - AGUARDANDO (erro durante build) │
│ ⏳ Vercel variáveis ambiente - PARCIAL              │
│ ❌ Banco de dados não migrado                       │
│ ❌ Usuários de teste não criados                    │
│ ❌ APIs não testadas em prod                        │
└─────────────────────────────────────────────────────┘
```

### Variáveis no Railway (ATUAL)
```
✅ CLOUDINARY_API_KEY
✅ CLOUDINARY_API_SECRET
✅ DATABASE_URL
✅ NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
✅ NEXTAUTH_SECRET
✅ NODE_ENV
✅ LOG_LEVEL
❌ CLOUDINARY_UPLOAD_PRESET (faltando)
❌ NEXTAUTH_URL (faltando - ex: https://projeto-yf-api.railway.app)
❌ NEXT_PUBLIC_API_URL (opcional, para frontend calls)
```

---

## 🐛 Troubleshooting

### Erro: "Build failed"
**Solução:** Verifique logs → procure por erros TypeScript ou dependências faltando

### Erro: "Database connection refused"
**Solução:** DATABASE_URL está incorreta ou falta SSL mode

### Erro: "Next-auth not configured"
**Solução:** NEXTAUTH_SECRET não está definido

### Login redireciona para /login infinitamente
**Solução:** Limpe cookies e limpe cache do navegador

### Cloudinary upload falha
**Solução:** Verifique credenciais do Cloudinary e upload preset

---

## 📚 Documentação

Para mais detalhes, veja:
- `PHASE_1_COMPLETE.md` - Arquitetura completa
- `VERCEL_DEPLOYMENT.md` - Instruções de deploy
- `src/auth.ts` - Configuração de autenticação
- `prisma/schema.prisma` - Estrutura do banco

---

## 🎉 Próximo Marco

Quando tudo estiver funcionando:

1. ✅ Login funcionando
2. ✅ APIs retornando dados
3. ✅ Banco de dados populado
4. ✅ Uploads para Cloudinary funcionando

**Então:** Iniciar Phase 2 - Conectar Frontend aos APIs

---

---

## 🔧 Ações Recomendadas para RAILWAY

1. **Adicione estas variáveis no Railway dashboard:**
   ```
   NEXTAUTH_URL = https://seu-railway-url.railway.app
   CLOUDINARY_UPLOAD_PRESET = seu-preset-name
   ```

2. **Faça deploy manual no Railway** (se não fizer auto-deploy):
   - Vá ao dashboard do Railway
   - Clique em "Deploy" ou "Redeploy"
   - Aguarde a conclusão do build

3. **Se ainda der erro:**
   - Verifique os logs no Railway
   - Procure por "Type error" ou "failed to type check"
   - Compare com os commits recentes (d6d2052 tem a fix do NextAuth)

---

## 🔧 Ações Recomendadas para VERCEL

1. **Configure estas variáveis no Vercel dashboard:**
   ```
   DATABASE_URL = seu-neon-url
   NEXTAUTH_URL = https://projeto-yf.vercel.app
   NEXTAUTH_SECRET = seu-secret
   CLOUDINARY_CLOUD_NAME = dap4gy4pa
   CLOUDINARY_API_KEY = 714389839699964
   CLOUDINARY_API_SECRET = -wJ4nPZ_wgOk9L9iFPBmpdKYcIw
   CLOUDINARY_UPLOAD_PRESET = seu-preset
   ```

2. **Redeploy no Vercel** após adicionar variáveis

3. **Teste a URL:** https://projeto-yf.vercel.app/login

---

**Última Atualização:** 06/04/2026
**Status:** Código pronto, aguardando ambiente configurado
