# 📦 Sistema de Estoque de Medicamentos da UBS

O sistema de controle de estoque de medicamentos tem como objetivo principal **gerenciar o estoque de medicamentos da UBS**, garantindo que os medicamentos estejam disponíveis para a comunidade quando necessário. O sistema permite:

✅ **Cadastro de medicamentos**  
✅ **Atualização de quantidades**  
✅ **Consulta de medicamentos disponíveis**  
✅ **Geração de relatórios e alertas de estoque baixo**  
✅ **Controle de acesso para funcionários e moradores**  
✅ **Solicitação de retirada de medicamentos pelos moradores**  

## 🚀 Tecnologias Utilizadas

### **Backend**
- Node.js + Express
- PostgreSQL

### **Frontend**
- React
- Bootstrap

### **Gerenciador de Pacotes**
- Yarn

## 📄 Pré-requisitos
Antes de começar, certifique-se de ter instalado:
- **Node.js**
- **Yarn**
- **PostgreSQL (v15 ou superior)**

## 📌 Instalação e Configuração

### **1️⃣ Clone o repositório**
```bash
git clone https://github.com/kamillecaetano/ubs_estoque.git
cd ubs_estoque
```

---

## 🔹 Backend (Servidor Express + PostgreSQL)

```bash
cd backend
```

### **2️⃣ Instale as dependências**
```bash
yarn install
yarn add express pg body-parser cors
yarn add --dev nodemon dotenv
```

### **3️⃣ Configure o banco de dados**
1. Instale o PostgreSQL e crie um banco chamado `ubs_estoque`.

2. Crie as tabelas do banco de dados:
```sql
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    tipo VARCHAR(50) NOT NULL -- 'admin' ou 'user'
);

CREATE TABLE medicamentos (
    id INT SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    quantidade INT NOT NULL,
    descricao TEXT,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE solicitacoes_retirada (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL,
    medicamento_id INT NOT NULL,
    quantidade INT NOT NULL DEFAULT 1,
    status VARCHAR(50) NOT NULL DEFAULT 'pendente',
    data_solicitacao DATE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (medicamento_id) REFERENCES medicamentos(id)
);

CREATE TABLE relatorios_estoque (
    id INT SERIAL PRIMARY KEY,
    data_geracao DATE,
    descricao TEXT,
    usuario_id INT NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE alertas_estoque (
    id INT SERIAL PRIMARY KEY,
    medicamento_id INT NOT NULL,
    quantidade_minima INT NOT NULL,
    data_alerta DATE,
    FOREIGN KEY (medicamento_id) REFERENCES medicamentos(id)
);
```

### **4️⃣ Executando o servidor**
```bash
yarn dev
```
O servidor será iniciado em **http://localhost:3000/**.

---

## 🔹 Frontend (React)
```bash
cd frontend
```

### **1️⃣ Criar o projeto React e instalar dependências**
```bash
yarn create vite frontend --template react
cd frontend
yarn install
yarn add axios react-router-dom bootstrap react-bootstrap
```

### **2️⃣ Iniciar o frontend**
```bash
yarn dev
```
O frontend será iniciado em **http://localhost:5173/**.

---

## 🔐 Controle de Acesso
- **Funcionários da UBS (Admin)** têm acesso total ao sistema, podendo cadastrar, editar, remover medicamentos e aprovar solicitações de retirada.
- **Moradores (Usuários)** podem consultar medicamentos e solicitar retiradas, mas precisam da aprovação de um administrador.

---

## ✅ Funcionalidades Implementadas
### **🔹 Backend**
✔ API REST para CRUD de medicamentos  
✔ API de login e autenticação diferenciando `admin` e `user`  
✔ API de solicitações de retirada com controle de status  

### **🔹 Frontend**
✔ Login com redirecionamento baseado no tipo de usuário  
✔ Dashboard para funcionários e usuários com permissões diferentes  
✔ Página para exibir estoque de medicamentos  
✔ Página para que moradores solicitem retirada de medicamentos  

---

## 📌 Melhorias Futuras
- Implementação de autenticação JWT para maior segurança.
- Melhorar UI/UX.
- Histórico de retiradas para cada usuário.
- Implementar aprovação de solicitações
- Notificações em tempo real para novas solicitações.

---
