# 🎤 Talker Manager

## 📡 Desenvolvimento

Projeto desenvolvido na <a href="https://betrybe.com/" target="_blank">Trybe</a> durante o módulo de Back-End!

Nesse projeto foi desenvolvido uma API RESTful utilizando a arquitetura MSC (model-service-controller) de um sistema de gerenciamento de vendas no formato dropshipping, onde é possivel criar, visualizar, deletar e atualizar produtos e vendas.

#

## 📚 Documentação

<details>
<summary>Instalação e execução</summary>
    <br />
  
Clone o repositório:

```
git clone git@github.com:lauropera/store-manager.git
```

Na raíz do projeto, suba os containers `store_manager` e `store_manager_db` utilizando o docker-compose.

    docker-compose up -d

Abra o terminal do container `store_manager`.

    docker exec -it store_manager bash

Uma vez no terminal do container, execute o comando `npm install`.

Para subir o servidor utilize o comando abaixo no terminal do container `store_manager`.

    npm run debug

Para se conectar com o banco de dados, abra o terminal do container `store_manager_db`.

    docker exec -it store_manager_db bash

Faça login no banco de dados utilizando as credencias descritas no arquivo **docker-compose.yaml**. E execute os scripts **migration.sql** e **seed.sql** para a criação do banco **Store Manager**

Agora podemos rodar os testes utilizando o comando abaixo no terminal do container `store_manager`.

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
- MySQL
- Docker

##

<div>
  <p align="center">🍐</p>
</div>
