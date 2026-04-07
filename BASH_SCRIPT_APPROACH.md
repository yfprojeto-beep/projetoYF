# Bash Script Approach - Render Deployment Fix

## Status: ✅ Implementado e Enviado para GitHub

**Commit:** `b012c54`  
**Data:** 07/04/2026  
**Mudança Principal:** Configurar Render para usar script bash que executa build + start

---

## O Problema Que Estamos Resolvendo

Render estava ignorando todos os métodos de configuração:
- ❌ `render.yaml` - Render não lê arquivo
- ❌ `Procfile` - Heroku standard, não funciona no Render
- ❌ `npm run prod` - Render ignora qualquer startCommand no render.yaml

Resultado: Render executava apenas `npm start` sem rodar `npm run build` primeiro, causando erro:
```
Could not find a production build in the '.next' directory
```

---

## A Solução: Script Bash

### O que foi alterado:

#### 1. **render.yaml** (Linha 7)
```yaml
startCommand: bash start.sh
```

#### 2. **start.sh** (Novo arquivo)
```bash
#!/bin/bash
set -e

echo "Building application..."
npm run build

echo "Starting application..."
npm start
```

---

## Como Funciona

1. Render inicia o contêiner
2. Executa `bash start.sh`
3. Script bash executa `npm run build` → gera `.next/`
4. Script bash executa `npm start` → inicia servidor com build pronto

---

## Próximos Passos

### 1. **Aguardar Redeploy no Render** (Manual ou automático)
   - Se você tiver webhook configurado, Render pode estar redeplantando automaticamente
   - Ou manualmente vá a https://dashboard.render.com e clique em "Manual Deploy"

### 2. **Monitorar Logs de Implantação**
   - Procure por: `Building application...` e `Starting application...`
   - Se ver esses ecos, significa que o script bash foi executado com sucesso
   - Se ver erro novo, o bash script abordagem não funcionou

### 3. **Se der erro `bash: start.sh: command not found`**
   - Significa que Render não conseguiu executar bash scripts
   - Neste caso, precisaremos usar abordagem alternativa: **Docker com Dockerfile**

### 4. **Se der erro sobre `.next` ainda não existir**
   - Pode significar que o build foi executado mas `.next/` não foi persistido entre etapas
   - Neste caso, investigaremos abordagem Docker ou mudança de plataforma

---

## Arquivos Modificados

```
render.yaml          → Alterado: startCommand agora usa bash start.sh
start.sh             → Novo: Script bash que executa build + start
```

---

## Histórico de Tentativas

1. ❌ Mover Prisma para dependencies - Resolveu erro de módulo, mas não o problema do build
2. ❌ Criar `prod` npm script - Render ignora npm scripts em startCommand
3. ❌ Tentar render.yaml - Render não lê arquivo
4. ❌ Tentar Procfile - Render não lê Procfile (é padrão Heroku)
5. ✅ **Bash Script** ← Estamos aqui agora

Se bash script não funcionar, próxima tentativa será Docker.

---

## Como Verificar Se Funcionou

Quando o deploy estiver completo, teste:

```bash
# 1. Verificar se API está respondendo
curl https://projeto-yf-api.render.com/

# 2. Se conseguir resposta HTTP (não erro 404 ou build error), funcionou!
```

---

## Contato / Próximas Ações

Aguardando feedback do deploy no Render. Se você ver:
- ✅ **Sucesso:** API respondendo - implantação completa!
- ❌ **Erro bash:** Usar Docker (Dockerfile + docker build)
- ❌ **Erro .next não encontrado:** Investigar persistência de build artifacts

**Status Atual:** Aguardando redeploy do Render
