# Arquitetura e Funcionamento do Projeto

Este projeto segue uma arquitetura **limpa** (Clean Architecture) com **separação de responsabilidades** bem definida, visando manutenibilidade, escalabilidade e testabilidade.  
A aplicação foi construída com **Node.js**, **TypeScript**, **Fastify** e **Prisma ORM**.

---

## 📂 Estrutura de Pastas

```

src/
├── composition-root.ts
├── index.ts
├── adapters/
│    ├── in/http/
│    │    ├── http-server.adapter.ts
│    │    ├── controllers/
│    │    │    └── user.controller.ts
│    │    ├── middlewares/
│    │    │    └── errorHandler.ts
│    │    └── routes/
│    │         └── user.routes.ts
│    └── out/repositories/
│         └── user.repository.ts
├── application/
│    ├── contracts/
│    └── usecases/
├── domain/
│    └── entities/
└── infra/
└── database/
├── client.ts
└── prisma/

```

---

## 🏛 Arquitetura

A aplicação é dividida em **quatro grandes camadas**:

### 1. **Domain**

- Contém as **entidades de negócio** puras, sem dependências externas.
- Exemplo: `User.entity.ts` define a estrutura de um usuário.

### 2. **Application**

- Contém as **regras de negócio** (casos de uso).
- Implementa **interfaces (contracts)** para garantir que a comunicação entre camadas siga um contrato fixo.
- Exemplo: `UserUseCase` recebe um `UserRepository` para persistir dados.

### 3. **Adapters**

- Adaptadores de entrada (**in**) e saída (**out**).
- **In:** Controllers, rotas HTTP, middlewares.
- **Out:** Implementações de persistência (ex.: `UserRepository` com Prisma).
- Função: **converter dados e chamadas** entre camadas.

### 4. **Infra**

- Implementações concretas de tecnologias.
- Conexão com o banco via **Prisma ORM**.
- Configuração e instância do cliente do banco.

---

## 🔄 Fluxo de Comunicação entre as Camadas

1. **Requisição HTTP** chega via `HTTPServerAdapter` (Fastify).
2. O **router** (`user.routes.ts`) direciona para o **controller** (`UserController`).
3. O controller **valida os dados** e chama o **use case** (`UserUseCase`).
4. O use case interage com o **repositório** (`UserRepository`) para persistir no banco.
5. O repositório usa o **Prisma Client** para executar queries no banco de dados.
6. O resultado retorna **de baixo para cima**, encapsulado em um `Either` (sucesso ou erro).
7. O controller envia a **resposta HTTP** formatada para o cliente.

---

## 🛠 Tecnologias Utilizadas

- **Node.js** + **TypeScript** — base da aplicação.
- **Fastify** — servidor HTTP rápido e leve.
- **Prisma ORM** — acesso ao banco de dados.
- **Either Monad** (`@devmaggioni/either-monad`) — padrão funcional para tratamento de erros.
- **Helmet & CORS** — segurança e configuração de requisições.
- **Clean Architecture** — organização do código por responsabilidade.

---

## 🚀 Inicialização

```bash
npm install
npm run dev
```

O servidor inicia por padrão na porta **3000**.

---

## 📌 Observações Técnicas

- **`composition-root.ts`** é o ponto central de injeção de dependências.
- **Contratos (`contracts/`)** garantem que implementações diferentes possam substituir componentes sem alterar outras partes do código.
- O uso de **Either** melhora a previsibilidade e facilita testes.
- **Separação in/out** garante que a aplicação possa trocar de servidor HTTP ou banco de dados sem impactar o núcleo do negócio.

---

## 📬 Exemplo de Requisição

**POST** `/users`

```json
{
  "name": "João"
}
```

**Resposta**

```json
{
  "statusCode": 200,
  "data": {
    "isRight": true,
    "value": {
      "id": 1,
      "name": "João"
    }
  }
}
```
