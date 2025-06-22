
# 💸 MyWallet API

Projeto de API RESTful para controle de transações financeiras (MyWallet), desenvolvido com **Node.js**, **Express**, **MongoDB**, **JWT** e hospedado no **Render**.

---

## 🚀 Link da API (Deploy Render)

👉 [https://mywallet-s3hz.onrender.com](https://mywallet-s3hz.onrender.com)

---

## 📚 Descrição do Projeto

Esta API permite que usuários se cadastrem, façam login e gerenciem suas transações financeiras (entradas e saídas), com autenticação via **JWT** e armazenamento no **MongoDB Atlas**.

**Principais funcionalidades:**

- Cadastro de usuário
- Login com geração de token JWT
- Adicionar transações (receitas e despesas)
- Listar transações com paginação
- Atualizar transações
- Deletar transações
- Validação de dados via **Joi**
- Autenticação protegida por **middleware**

---

## 📑 Tecnologias e Ferramentas

- Node.js
- Express
- MongoDB Atlas
- JWT (jsonwebtoken)
- Bcrypt
- Joi (validação)
- Dayjs (formatação de datas)
- Dotenv
- Nodemon (desenvolvimento)

---

## 🛠️ Variáveis de Ambiente (.env)

Exemplo de `.env` usado:

```
DATABASE_URL=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/MyWallet?retryWrites=true&w=majority&appName=MyWallet&tls=true
JWT_SECRET=sua_chave_secreta
PORT=5000
```

---

## ✅ Endpoints da API

---

### 📝 Autenticação

#### 🚩 POST `/sign-up`

Cadastro de novo usuário.

- **Body JSON:**

```json
{
  "name": "Exemplo",
  "email": "exemplo@gmail.com",
  "password": "123456"
}
```

---

#### 🚩 POST `/sign-in`

Login de usuário.

- **Body JSON:**

```json
{
  "email": "exemplo@gmail.com",
  "password": "123456"
}
```

- **Resposta:**  
Um token JWT.

---

### 💳 Transações (Rotas protegidas — requer token JWT no Header)

Header necessário em todas as rotas abaixo:

```
Authentication: Bearer {token}
```

---

#### 🚩 POST `/transactions`

Criar uma nova transação.

- **Body JSON:**

```json
{
  "value": 100.50,
  "description": "Salário",
  "type": "deposit"
}
```

- **Regras de `type`:** Só pode ser `"deposit"` ou `"withdraw"`.

---

#### 🚩 GET `/transactions?page=1`

Listar as transações do usuário logado com paginação (10 por página).

- **Query param opcional:**  
Se não enviar `page`, assume como 1.

- **Validação:**  
Se `page < 1`, responde com status 400.

---

#### 🚩 PUT `/transactions/:id`

Atualizar uma transação específica.

- **Body JSON:** (Mesmo formato da criação)

```json
{
  "value": 150.00,
  "description": "Salário reajustado",
  "type": "deposit"
}
```

- **Regras:**  
O usuário só pode alterar transações que ele mesmo criou.

---

#### 🚩 DELETE `/transactions/:id`

Deletar uma transação específica.

- **Regras:**  
O usuário só pode deletar transações que ele mesmo criou.

---

## 🔐 Autenticação (Middleware)

Todas as rotas de transações são protegidas por um **middleware de autenticação JWT**.

Se o token for inválido ou ausente:  
→ A API retorna **401 Unauthorized**.

---

## 🧪 Validação com Joi

- **Cadastro:**  
Valida nome, email e senha.

- **Login:**  
Valida apenas email e senha.

- **Transações:**  
Valida `value`, `description` e `type`, garantindo que `type` só seja `"deposit"` ou `"withdraw"`.

---

## 📌 Observações importantes

- **Data das transações:**  
Formato `DD/MM`, usando **dayjs**.

- **Paginação:**  
Implementada com `limit()` e `skip()` no MongoDB.

- **Banco de dados:**  
Utilizando **MongoDB Atlas**, cluster com acesso liberado por IP.

- **Deploy:**  
Feito no **Render**.

---

## 👨‍💻 Desenvolvido por

Vinicius M U Souza
