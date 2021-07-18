# English - API Test Project v1 #

## Goals ##
The purpose of the test is to build a REST API that will:

1. Allow the registration of a user requiring: Email, name and password. Whereas "email" must be a valid and UNIQUE email address.
   >POST API to create user / email validation / unique.

2. Allow user authentication via email and password.
   >API POST login for user authentication.

3. Allow the authenticated user to register a project. The project must have one or more Tags associated with it to be created.
   >MIDDLEWARE of authentication for route.
   POST API to register project and validation of the relationship with tag.
   Project creation must save the user who created it.

4. External a GET endpoint that allows returning the authenticated user's projects.
   >API GET projects per authenticated user.

## Starting and configuring environment
### Starting the project ###
- Clone the repository:
   - `git clone ...`
- Enter the project folder:
   - `cd projectname`
- Deploy the system locally:
   - `docker-compose up -d`

### Initial setting ###
- Create database:
   - `docker exec database-node mysql -u root -proot -e "create schema project;"`
- Create the tables:
   - `docker exec share_app_1 npx sequelize-cli db:migrate`
- Load initial data:
   - `docker exec share_app_1 npx sequelize-cli db:seed:all`

## Documentation ##
- Swagger
   - [API documentation on Swagger, local link](http://localhost:3000/api-docs)
   - To view the attributes of the request and its rules click on Model as in the image
      - [Image of attributes](https://ibb.co/xgb0wP3)
- Postman
   - [API Documentation on Post, external link](https://documenter.getpostman.com/view/1680688/TzmCgt3B)

## Tests ##
- Run the tests:
   - `docker exec share_app_1 yarn jest`

## Commands ##
- Access mysql
   - `docker exec -t -i database-node /bin/bash -c "mysql -uroot -p"`

## Online ##
- Access system on heroku
   - [API on Heroku](...link...)

# Português - Projeto Teste API v1 #

## Objetivos ##
O objetivo do teste é a construção de uma REST API que irá:

1. Permitir o cadastro de um usuário requerindo: Email, nome e password. Considerando que "email" precisa ser um endereço de email valido  e UNIQUE.
   >API POST para criar o usuário / validação de email / unique.
   
2. Permitir a autenticação de um usuário através do email e password. 
   >API POST login para autenticação de usuário.
   
3. Permitir que o usuário autenticado cadastre um projeto. O projeto deve ter uma ou mais Tag associada a ele para ser criado.
   >MIDDLEWARE de autenticação para rota.
   API POST para cadastrar projeto e validação do relacionamento com tag.
   A criação de projeto deve salvar o usuário que o criou.
   
4. Externar um GET endpoint que permita retornar os projetos do usuário autenticado.
   >API GET projetos por usuário autenticado.

## Iniciando e configurando ambiente
### Iniciando o projeto ###
 - Clone o repositório: 
   - `git clone ...`
 - Entre na pasta do projeto: 
   - `cd projectname`
 - Deploy do sistema localmente: 
   - `docker-compose up -d`
   
### Configuração inicial ###
 - Criar base de dados: 
   - `docker exec database-node mysql -u root -proot -e "create schema project;"`
 - Criar as tabelas:
   - `docker exec share_app_1 npx sequelize-cli db:migrate`
 - Carregar os dados iniciais:
   - `docker exec share_app_1 npx sequelize-cli db:seed:all`

## Documentação ##
 - Swagger
   - [Documentação da API no Swagger, link local](http://localhost:3000/api-docs)
   - Para visualizar os atributos da requisição e suas regras clique em Model como na imagem
     - [Imagem dos atributos](https://ibb.co/xgb0wP3)
 - Postman
   - [Documentação da API no Post, link externo](https://documenter.getpostman.com/view/1680688/TzmCgt3B)

## Testes ##
 - Executar os teste: 
   - `docker exec share_app_1 yarn jest`

## Comandos ##
 - Acessar mysql
   - `docker exec -t -i database-node /bin/bash -c "mysql -uroot -p"`

## Online ##
 - Acessar sistema no heroku
   - [API on Heroku](...link...)
