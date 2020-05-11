# Edge API

This repository is part of the project for the module Mobile and Cyber-Physical Systems at University of Pisa.

Here are stored the API of the edge server

...more to come

## Description

Project details go here..

...

## Getting Started

### Dependencies

* npm 
* nodejs 
* docker

### Installing

* clone the repository
* run the command to start a mongodb instance with docker: ```docker run -d -p 27017-27019:27017-27019 --name mongodb mongo:4.0.4```
* fill the ```.env``` file according to the ```.env.example``` with the address for the mongodb instance
* cd into the cloned repo and run the command ```npm install```

### Executing program

* prod ```npm run start```
* development ```npm run dev```

If you need to access the mongo shell run the following command:

```docker exec -it mongoContainer mongo```


## Functionalities
### Endpoints
Currently the enpoints are under development. The following are available:
* ```[POST] /api/upload/images``` to post images up to the limit specified in the variable MAX_IMAGES_UPLOAD in ```.env``` file
* ```[GET] /api/upload/images``` to retrieve a sample webpage to test the previous endpoint
* ```[POST] /api/upload/bump-data``` to post bump events
* ```[POST] /api/analysis/callback``` to receive data back from the neural network
* ```[POST] /api/analysis/trigger``` to trigger the analysis of the images mocking the raspberry board. The parameter ```monitoringID``` must contain the id of the monitoring to use as mock data

## Authors

Here's the wonderful team working hard for this project:
* Matteo Barato
* Davide Barasti
* Luca Roveroni
* Gianmarco Santi

## Version History

* 0.1
    * Initial Release

## License

This project is licensed under the MIT License - see the LICENSE file for details
