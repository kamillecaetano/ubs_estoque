# 📦 Sistema de Estoque de Medicamentos da UBS
O sistema de controle de estoque de medicamentos tem como objetivo principal **gerenciar o estoque de medicamentos da UBS**, garantindo que os medicamentos estejam disponíveis para a comunidade quando necessário. O sistema permitirá:  

Cadastro de medicamentos  

Atualização de quantidades  

Consulta de medicamentos disponíveis  

Geração de relatórios e alertas de estoque baixo  

Retirada de medicamentos pelos moradores do bairro.  


## 🚀 Tecnologias utilizadas
**Backend:** Node.js + Express 

**Banco de Dados:** PostgreSQL

**Frontend:** React

**Gerenciador de Pacotes:** Yarn

## 📄 Pré-requisitos
Antes de começar, certifique-se de ter instalado:
1. Node.js
2. Yarn (opcional, pode usar npm)
3. PostgreSQL (v15 ou superior)

## 📌 Instalação e configuração

### 1️⃣ **Clone o repositório**
```bash
git clone https://github.com/kamillecaetano/ubs_estoque.git
cd ubs-estoque
```

### 2️⃣ **Instale as dependências**
```bash
npm install -g yarn
yarn
yarn add express pg body-parser 
yarn add --dev nodemon
```

### 3️⃣ **Configurar o banco de dados**
1. Instale o PostgreSQL e crie um banco chamado `ubs_estoque`.
2. Configure as credenciais do banco no index.js
3. Crie a tabela de medicamentos:
```sql
CREATE TABLE medicamentos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    quantidade INT NOT NULL,
    descricao TEXT
);
```
## ▶️ Executando o servidor
Para iniciar o servidor, execute:
```bash
yarn dev
```
O servidor será iniciado em **http://localhost:3000/**.
