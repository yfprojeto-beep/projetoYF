# 🚀 Criar Upload Preset no Cloudinary

## Passo 1: Acessar Cloudinary

1. Vá para: https://cloudinary.com/console/settings/upload
2. Login com sua conta (use a mesma que tem as credenciais)

## Passo 2: Criar Upload Preset

1. Na aba **"Upload"**, procure por **"Upload presets"**
2. Clique em **"Create unsigned preset"** (ou **"Add upload preset"**)
3. Configure:
   - **Name:** `projeto_yf_default` (ou escolha um nome)
   - **Unsigned:** ✅ Sim (deixe marcado)
   - **Allowed upload types:** Qualquer um (Images, Videos, Raw)
   - **Resource type:** Auto

4. Clique em **"Save"**

## Passo 3: Copiar o Nome do Preset

O nome do preset (ex: `projeto_yf_default`) será usado como `CLOUDINARY_UPLOAD_PRESET`

## Passo 4: Volte Aqui

Depois de criar o preset, me diga:
- ✅ Nome do preset (ex: projeto_yf_default)
- ✅ Confirmar que DATABASE_URL você já tem

Então vou fazer o deploy no Render para você!

---

**URL para criar preset:**
https://cloudinary.com/console/settings/upload

**Tempo:** 2 minutos
