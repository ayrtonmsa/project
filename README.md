# API Test Project v1 #

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
   - `git clone https://github.com/ayrtonmsa/project.git`
- Enter the project folder:
   - `cd project`
- Copy the env:
   - `cp .env.example .env`
- Deploy the system locally:
   - `docker-compose up -d`

### Initial setting ###
- Create database:
   - `docker exec database-node mysql -u root -proot -e "create schema project;"`
- Create the tables:
   - `docker exec project_app_1 npx sequelize-cli db:migrate`
- Load initial data:
   - `docker exec project_app_1 npx sequelize-cli db:seed:all`

## Documentation ##
- Swagger
   - [API documentation on Swagger, local link](http://localhost:3000/api-docs)
   - To view the attributes of the request and its rules click on Model as in the image
      - [Image of attributes](https://ibb.co/xgb0wP3)
- Postman
   - [API Documentation on Post, external link](https://documenter.getpostman.com/view/1680688/TzmCgt3B)

## Tests ##
- Run the tests:
   - `docker exec project_app_1 yarn jest --silent --detectOpenHandles --coverage`
- Access coverage:
   - `file:///home/{your user}/{your projects folder}/project/coverage/lcov-report/index.html`

## Commands ##
- Access mysql:
   - `docker exec -t -i database-node /bin/bash -c "mysql -uroot -p"`
- Drop the container:
   - `docker-compose down`
