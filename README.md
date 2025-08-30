# Expenses Frontend

Frontend da aplicação **Expenses**, desenvolvido com **Next.js** e **TypeScript**.  
O projeto é responsável pela interface do usuário, incluindo login, dashboard, cadastro de despesas e visualização de gráficos.

---

## 🛠 Tecnologias

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Yarn](https://yarnpkg.com/)
- [ Fetch API](https://axios-http.com/) (para consumir a API do backend)

---

## ⚡ Pré-requisitos

Antes de começar, você precisa ter instalado:

- Node.js >= 18
- Yarn >= 1.22
- Backend da aplicação rodando (por padrão em `http://localhost:8080`)

---

## 🚀 Instalação

1. Clone o repositório:

```bash
git clone https://github.com/NicollasMelo/expenses-front.git
cd expenses-front/expenses
``` 

--- 

🔥 Scripts úteis
Comando	Descrição

| Comando           | Descrição |
|-------------------|-----------|
| `yarn run dev`    | Inicia a aplicação em modo de desenvolvimento (`http://localhost:3000`) |
| `yarn run build`  | Cria a versão de produção do projeto |

---

## 📝 Estrutura de Pastas

expenses/

├─ app/           # Páginas e componentes do Next.js

├─ public/        # Arquivos públicos (imagens, favicon)

├─ services/      # Funções de integração com o backend (login, despesas, etc.)

├─ styles/        # Estilos globais (Tailwind + CSS customizado)

├─ .gitignore

├─ package.json

├─ tsconfig.json

└─ README.md

---

## 💻 Funcionalidades

- Login e Logout de usuários
- Cadastro de usuários
- Visualização de dashboard de despesas
- Gráficos de receitas e despesas por categoria
- Registro de novas despesas
- Filtros e ordenação de despesas
- Feedback de erros e carregamento

## 📝 Licença

MIT License © Nicollas Melo

