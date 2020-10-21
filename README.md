# Book Stall

## Demo
URL: [Live Demo](http://18.217.200.195:30003/documentation)

## Installation
1. Install docker if not installed as instructed on link https://docs.docker.com/get-docker/
2. Install docker compose if not installed as instructed on link https://docs.docker.com/compose/install/

## Run Application

1. With Docker Compose
```
docker-compose up
```
This will run the backend, frontend and database containers.

Now Goto browser and open below link for Angular Application
[http://0.0.0.0:30003](http://0.0.0.0:30003)

Open Below link for backend swagger documentation
[http://0.0.0.0:30003/documentation](http://0.0.0.0:30003/documentation)

2. Without Docker Compose (Running Individually)
```
export NODE_ENV=env-local
node index.js
```
Open Below link for backend swagger documentation
[http://0.0.0.0:30000/documentation](http://0.0.0.0:30000/documentation)

3. Run Unit Test Case
```
npm test
```
You will the code coverage generated under ```coverage/index.html```. Open this file in broswer.
## Technologies Used
* Backend
  * NodeJS
  * Hapi
  * Mocha
  * Chai
  * Moongose
* Database
  * MongoDB


