Iniciando o projeto
 - clone o repositório: git clone ...
 - entre na pasta do projeto: cd projectname
 - rode o comando: yarn install // talvez nao precise
 - deploy do sistema localmente: docker-compose up
   acessar docker mysql e criar a base
 - docker exec database-node mysql -u root -proot -e "create schema project;" // descricao do comando...
 - npx sequelize-cli db:migrate
 - npx sequelize-cli db:seed:all

Para visualizar a documentação da API
 - acesse o link: localhost:3000/api-docs

Para rodar os testes e visualizar o coverage
 - comando para rodar os teste: yarn jest
 - após rodar o comando acessar o link: ...link...

Comandos
acessar mysql
docker exec -t -i database-node /bin/bash -c "mysql -uroot -p"


readme em ingles
