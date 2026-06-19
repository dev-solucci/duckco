# Publicação (deploy)

> Como colocar e manter a Duck Co. no ar. Repositório: `dev-solucci/duckco`.
> Hospedagem: Vercel (plano grátis). Conta de commits: Solucci Team.

## Como funciona

```
edita e testa no local  ->  Push no GitHub Desktop  ->  Vercel republica sozinha
```

O local é o campo de testes. O que vai pro ar é o **push**. A Vercel observa o
repositório e republica a cada push na branch `main`.

## Primeira publicação (uma vez)

### 1. GitHub (push)
1. Abrir o **GitHub Desktop** logado como **dev-solucci**.
2. **File, Add Local Repository**, escolher a pasta do projeto.
3. Branch **main**.
4. **Push origin**. É fast forward, um clique.

### 2. Vercel (deploy)
1. Em vercel.com, **Add New, Project, Import** o repositório **dev-solucci/duckco**.
2. Framework detectado: **Next.js**.
3. **Environment Variables** (copiar do `.env.local`):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. **Deploy**. Sai uma URL grátis, tipo `duckco.vercel.app`.

### 3. Supabase (login em produção)
Em **Authentication, URL Configuration**:
- **Site URL:** a URL da Vercel.
- **Redirect URLs:** adicionar `https://suaurl.vercel.app/auth/callback`.

Lembrete: o Google sempre volta para a Supabase, então o redirect URI no Google
Cloud (`https://vnuqycphghyjsmwymvcf.supabase.co/auth/v1/callback`) **não muda**
entre local e produção.

## Atualizações do dia a dia

1. As mudanças entram no local (commit, identidade Solucci Team).
2. **Push** no GitHub Desktop.
3. A Vercel republica em um ou dois minutos.

Branches geram URLs de preview separadas da produção. A `main` é o site oficial.

## Domínio próprio (quando quiser)

1. Comprar o domínio (`.com.br` no registro.br, `.com` em qualquer registrador).
2. Na Vercel, **Settings, Domains**, adicionar o domínio e seguir o DNS.
3. Trocar o **Site URL** e adicionar o `https://dominio/auth/callback` nas
   Redirect URLs do Supabase.

## Variáveis de ambiente

| Variável | Onde pegar | Onde colocar |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase, Settings, API | `.env.local` (local) e Vercel (produção) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase, Settings, API | `.env.local` (local) e Vercel (produção) |

A anon key é pública, pode ficar no navegador. A senha do banco e a service role
key nunca entram no código nem em variável `NEXT_PUBLIC_`.
