# 📦 Store Manager

## 📡 Desenvolvimento

Projeto desenvolvido na <a href="https://betrybe.com/" target="_blank">Trybe</a> durante o módulo de Back-End!

Nesse projeto foi desenvolvido uma API RESTful utilizando a arquitetura MSC (model-service-controller) de um sistema de gerenciamento de vendas no formato dropshipping, onde é possivel criar, visualizar, deletar e atualizar produtos e vendas. E também foi necessário implementar testes unitários com Mocha, Chai e Sinon.

#

<br />

## 🚀 Instalação e execução

<details>
<summary>Instalação e execução com Docker</summary>
<br />

Para rodar está aplicação é necessário ter **Git**, **Docker** e o **Docker Compose** instalados no seu computador. O Docker Compose precisa estar na versão **1.29** ou superior.

### 1 - Clone o repositório:

```
git clone git@github.com:lauropera/store-manager.git
```

### 2 - Na raíz do projeto, suba os containers `store_manager` e `store_manager_db` utilizando o docker-compose.

    docker-compose up -d --build

### 3 - Abra o terminal do container `store_manager`.

    docker exec -it store_manager bash

### 4 - No terminal do container, instale as dependências com o comando:

    npm install

### 5 - Agora execute os comandos para criar e popular o banco de dados:

Criando as tabelas

    npm run migration

Populando o banco com dados

    npm run seed
    
### 6 - Agora execute a aplicação com o comando:

    npm start

Para conferir a cobertura de testes execute o comando:

    npm run test:mocha
    
</details>
<br />

## 🔎 Rotas

### Products

<details>
  <summary><strong>GET /products</strong></summary>
  </br>
  • Traz todos os produtos do banco de dados.
</details>

<details>
  <summary><strong>GET /products/search</strong></summary>
  </br>
  • Busca produtos pelo nome através da query "q".
</details>

<details>
  <summary><strong>GET /products/:id</strong></summary>
  </br>
  • Traz um produto por id do banco de dados.
</details>

<details>
  <summary><strong>POST /products</strong></summary>
  </br>
  • Cadastra um novo produto.
</details>

<details>
  <summary><strong>PUT /products/:id</strong></summary>
  </br>
  • Atualiza um produto por id.
</details>

<details>
  <summary><strong>DELETE /products/:id</strong></summary>
  </br>
  • Deleta um produto por id do banco de dados.
</details>

### Sales

<details>
  <summary><strong>GET /sales</strong></summary>
  </br>
  • Traz todas as vendas do banco de dados.
</details>

<details>
  <summary><strong>GET /sales/:id</strong></summary>
  </br>
  • Traz uma venda por id do banco de dados.
</details>

<details>
  <summary><strong>POST /sales</strong></summary>
  </br>
  • Cadastra uma nova venda.
</details>

<details>
  <summary><strong>PUT /sales/:id</strong></summary>
  </br>
  • Atualiza uma venda por id.
</details>

<details>
  <summary><strong>DELETE /sales/:id</strong></summary>
  </br>
  • Deleta uma venda por id do banco de dados.
</details>

#

## ⚙️ Tecnologias

- JavaScript
- Node.js
- Express.js
- DotEnv
- Joi
- MySQL
- Docker
- Mocha.js
- Chai.js
- Sinon.js

##

<div>
  <p align="center">🍐</p>
</div>
