# LOMAP ES 2B
[![CI for LOMAP_ES2B](https://github.com/Arquisoft/lomap_es2b/actions/workflows/lomap_es2b.yml/badge.svg)](https://github.com/Arquisoft/lomap_es2b/actions/workflows/lomap_es2b.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Arquisoft_lomap_es2b&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Arquisoft_lomap_es2b)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=Arquisoft_lomap_es2b&metric=coverage)](https://sonarcloud.io/summary/new_code?id=Arquisoft_lomap_es2b)

# Members
 |        Developers        |         UO        |
|:-----------------------------:|:------------------:|
|     Álvaro Davila Sampedro     | UO284548 |
|    Javier González Velázquez     | UO276803 | 
|  Adrián Martinez Rodriguez | UO284163 |
| Hugo Roberto Pulido Pensado| UO282823 |

# Logo
<p>
This will be the logo that we will use in the application
</p>
<img src="https://github.com/Arquisoft/lomap_es2b/blob/master/webapp/src/assets/img/logo-color.svg" height="400">

# Overview
LoMap system, an application in which citizens can have personalized maps of places and local businesses in the city.
## Requirements Overview
* Add places in different categories.
* Users will be able to display locations in a map-like window.
* Users can associate ratings, comments, photos on the added places.
* Information about a place stored by each user will be stored in each user’s pod.
* Users will be able to see places and information taken from their friends.
* Filters are allowed for searches on the map.

# Getting Started
## 📋 Prerequisites

<p align="justify">If you already have Node.js and npm, ensure that you update them before trying to construct the images. To run the project, you'll need <a href="https://nodejs.org/en/download">Node.js</a>, <a href="https://www.docker.com/">Docker</a>, <a href="https://docs.npmjs.com/downloading-and-installing-node-js-and-npm">npm</a> and <a href="https://git-scm.com/downloads">git</a> installed on your machine. Make certain that all four are installed.</p>

## Installation
<p align="justify">You can obtain the project by using the command <code>git clone https://github.com/Arquisoft/lomap_es2b</code>.</p>

### With Docker
<p align="justify">The most efficient method to initiate everything is by using Docker:</p>

```sh
docker-compose up --build
```
<p align="justify">Two docker images will be generated for the webapp and the restapi since they are not currently present on your system.</p>

### Without Docker
<p align="justify">Compile and run the restapi:</p>

```shell
cd restapi
npm install
npm start
```

<p align="justify">Now the webapp:</p>

```shell
cd webapp
npm install
npm start
```

You should be able to access the application in [http://localhost:3000](http://localhost:3000).

# Deployment
Lomap aplicattion is deployed in an Azure Machine with the next direction: https://20.19.208.114/. <br/>
There is an account with markers shared to its friends with the next webId: https://pruebapod11.inrupt.net/. 

# Technologies

<p float="left">
<img src="https://blog.wildix.com/wp-content/uploads/2020/06/react-logo.jpg" height="100">
<img src="https://miro.medium.com/max/1200/0*RbmfNyhuBb8G3LWh.png" height="100">
<img src="https://miro.medium.com/max/365/1*Jr3NFSKTfQWRUyjblBSKeg.png" height="100">
<img src="http://www.cursosgis.com/wp-content/uploads/2017/11/logomapbox.png" height="100">
<img src="https://uploads-ssl.webflow.com/62d722f9cc456d1fb015d3e7/636ab9d11b3a3c638e8bbad7_opengraph.png" height="100">
</p>
