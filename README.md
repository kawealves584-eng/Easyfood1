# 🍽️ EasyFood

> API REST para cadastro e listagem de restaurantes, construída com arquitetura em camadas e autenticação JWT.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat&logo=prisma&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=mysql&logoColor=white)
![JWT](https://img.shields.io/badge/Auth-JWT-orange?style=flat)

**Autor:** Kawe Alves dos Santos — RA 78815

---

## 📑 Sumário

- [Visão geral](#-visão-geral)
- [Tecnologias](#-tecnologias)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Configuração do Prisma](#-configuração-do-prisma)
- [Execução](#-execução)
- [Endpoints da API](#-endpoints-da-api)
  - [Restaurantes](#restaurantes)
  - [Autenticação](#autenticação)
- [Estrutura do projeto](#-estrutura-do-projeto)
- [Observações](#-observações)
- [Autor](#-autor)

---

## 🔎 Visão geral

O **EasyFood** foi estruturado em camadas para separar claramente as responsabilidades da aplicação:

| Camada | Caminho | Responsabilidade |
|---|---|---|
| Banco de dados | `src/database` | Conexão com o Prisma |
| Restaurantes | `src/modules/restaurants` | Regras de negócio de restaurantes |
| Autenticação | `src/modules/auth` | Login, registro e proteção de rotas |
| Aplicação | `src/app.js` | Configuração do Express |
| Entrada | `server.js` | Inicialização do servidor |
| Front-end | `public/` | Interface web (HTML/CSS/JS) que consome a API |

Cada módulo segue a divisão **routes → controller → service**, isolando o roteamento, o tratamento da requisição e as regras de negócio.

---

## 🛠 Tecnologias

- **Node.js** — runtime JavaScript
- **Express** — framework web
- **Prisma** — ORM para acesso ao banco de dados
- **MySQL** — banco de dados relacional
- **JWT** — autenticação baseada em token
- **bcryptjs** — hash de senhas
- **cors** — liberação de requisições do front-end
- **dotenv** — variáveis de ambiente

---

## ✅ Pré-requisitos

Antes de começar, garanta que você tem:

- [ ] Node.js instalado
- [ ] MySQL em execução
- [ ] npm ou yarn

---

## ⚙️ Instalação

**1.** Clone o projeto

**2.** Instale as dependências:

```bash
npm install
```

**3.** Crie o arquivo `.env` a partir do exemplo e preencha com a URL do banco e o segredo JWT:

```bash
cp .env.example .env
```

```env
DATABASE_URL="mysql://usuario:senha@localhost:3306/easyfood"
JWT_SECRET="troque-por-uma-chave-longa-e-aleatoria"
```

> O arquivo `.env` não é versionado (já está no `.gitignore`). Use o `.env.example` como referência.

---

## 🗄️ Configuração do Prisma

Gere o client e aplique as migrations:

```bash
npx prisma generate
npx prisma migrate dev
```

---

## ▶️ Execução

Inicie o servidor:

```bash
node server.js
```

A aplicação estará disponível em:

```
http://localhost:3000
```

> O **front-end** é servido automaticamente em `http://localhost:3000` (arquivos de `public/`), e a **API** responde em `/restaurants` e `/auth`.

---

## 📡 Endpoints da API

### Restaurantes

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/restaurants` | Retorna a lista de restaurantes |
| `POST` | `/restaurants` | Cria um novo restaurante |
| `DELETE` | `/restaurants/:id` | Remove um restaurante pelo ID |

**Corpo da requisição — `POST /restaurants`:**

```json
{
  "name": "Cantina Roma",
  "category": "Italiana",
  "rating": 4.5
}
```

### Autenticação

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/auth/register` | Cria um novo usuário |
| `POST` | `/auth/login` | Realiza login e retorna o JWT |
| `GET` | `/auth/me` | Retorna os dados do usuário autenticado |

**Corpo da requisição — `POST /auth/register`:**

```json
{
  "name": "Aluno",
  "email": "aluno@easyfood.com",
  "password": "123456"
}
```

**Corpo da requisição — `POST /auth/login`:**

```json
{
  "email": "aluno@easyfood.com",
  "password": "123456"
}
```

**Cabeçalho necessário — `GET /auth/me`:**

```http
Authorization: Bearer SEU_TOKEN
```

---

## 🗂️ Estrutura do projeto

```text
.
├── prisma/
│   └── schema.prisma               # Models Restaurant e User (MySQL)
├── public/
│   └── index.html                  # Front-end que consome a API
├── src/
│   ├── app.js                      # Express: middlewares, estáticos e rotas
│   ├── database/
│   │   └── prisma.js               # Instância do Prisma Client
│   └── modules/
│       ├── auth/
│       │   ├── auth.controller.js
│       │   ├── auth.middleware.js  # Proteção de rotas via Bearer token
│       │   ├── auth.routes.js
│       │   └── auth.service.js     # register / login / me (bcrypt + JWT)
│       └── restaurants/
│           ├── restaurant.controller.js
│           ├── restaurant.routes.js
│           └── restaurant.service.js
├── .env.example                    # Modelo das variáveis de ambiente
├── .gitignore
├── package.json
├── server.js                       # Ponto de entrada (require ./src/app)
└── README.md
```

---

## 📝 Observações

> ⚠️ A rota de listagem de restaurantes é pública.
> ⚠️ O cadastro e a exclusão de restaurantes podem passar a exigir autenticação conforme o projeto evoluir.
> ⚠️ O segredo do JWT deve sempre ser mantido em um ambiente seguro (nunca versionado no repositório).

---

## 👤 Autor

| Nome | RA |
|---|---|
| Kawe Alves dos Santos | 78815 |
