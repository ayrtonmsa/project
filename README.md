Iniciando o projeto
 - clone o repositório: git clone ...
 - entre na pasta do projeto: cd projectname
 - rode o comando: yarn install // talvez nao precise
 - deploy do sistema localmente: docker-compose up -D

Para visualizar a documentação da API
 - acesse o link: localhost:3000/doc

Para rodar os testes e visualizar o coverage
 - comando para rodar os teste: yarn jest
 - após rodar o comando acessar o link: ...link...

acessar docker mysql e criar a base
docker exec database-node mysql -u root -proot -e "create schema project;"

acessar mysql
docker exec -t -i database-node /bin/bash -c "mysql -uroot -p"

npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
