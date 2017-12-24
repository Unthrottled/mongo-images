# Reactive NoSql Image Persistence 

---

Have you bought into the whole [Reactive Programming](https://en.wikipedia.org/wiki/Reactive_programming) bit yet? 
Well, I have participated in consuming the "_Reactive Flavor Aid_" and there is one issue at the moment.
Currently, there is a supreme lack of helpful documentation to assist in a seamless development experience.
Fear not fellow reactive enthusiast, this post should help you save images in MongoDB utilizing reactive streams!

Recently, I wanted to create a project that is a full slice reactive application.
Meaning that the code and communication between the Frontend, Backend, and Data Persistence Layers are _reactive_.
When reactive is stated, the following can be assumed:

- All code is no blocking
- Code is processed in an [event loop](http://vertx.io/docs/guide-for-java-devs/#_core_vert_x_concepts).
- [Push based programming](https://en.wikipedia.org/wiki/Push_technology).
- Publisher/Subscriber or [Observable/Observer](http://reactivex.io/intro.html) pattern. 

With all of this criterion set, here is the following application stack that I came up with:

- [Angular 5](https://angular.io/) paired with [RxJS](http://reactivex.io/rxjs/)
- [Spring 5](https://spring.io/) paired with WebFlux powered by [Reactor](https://projectreactor.io/)
- [MongoDB](https://www.mongodb.com/) which supports reactive streams!

At a high level, the project consists of a Spring Boot server.
Which serves static content to the user, and provides a REST API to save, update, retrieve, and delete persisted images.

The images are stored in a Mongo database. 
The server takes advantage of GridFS which breaks the image binary into chunks which allows for storage of images greater than 16MB. 

This all sounds straight forward, right? As it turns out, there is very little documentation and examples on how to do anything reactive!
### [Look no further said documentation!](http://blog.acari.io/2017/12/14/Reactive-Mongo-Image-Persistence.html)

### Local Deployment (For the ambitious)

To run this project locally you will need the following goodies:

 - [Docker 17.09.0](https://www.docker.com/) 
 - [Docker-Compose 1.12.0](https://docs.docker.com/compose/install/)
 
All you have to do is at the root of this repository run:
    `docker-compose up -d`

Boom! You are done.

What this does is starts a Mongo server.
In addition to mounting the data location to dataDump in the root of this repository.
So that when the Mongo server container gets removed, all of the data is saved.

In addition to the mongo server, it also spins up the Spring boot server, and binds the container port to the host port 80.
So that mean you can open 
    
    http://localhost/
    
An get the index.html!

### Local Development

If you want to make changes to any of this code, the unpackaged code exists in the web-content directory.
Familiarity with Angular 5 is a plus.

There exists a docker compose file that will allow you to install your node modules locally (node_models).

All you have to do is run `docker-compose -f docker-compose-build.yml up`.

Once that is done, you are free to make changes!
To move the changed code into the web server all you have to do is run, 


`docker-compose -f docker-compose-deploy.yml up` and that should transpile all of the typscript, bundle it up, and move it to web-service/src/main/resources

#### Live action development!

`docker-compose -f docker-compose-dev.yml up -d` 

will run the web server, mongo, and also serve the static web-content from browsersync.

The plus here is that you get live change updates, as the dev server will watch all web-content files for changes.

The dev server runs on `http://localhost:3000`. 

Fun fact, if you make any changes to typscript files, you will have to recompile the code to get the changes to take hold.

You could create a script that has this as the command:

`docker run --rm -v /home/alex/workspace/acari-landing/web-content:/app alexsimons/nodebuild run compile` 

You will probably want to replace  /home/alex/workspace with whatever you put the repository. 


## Web-Service

This directory contains a Webflux Spring Boot server. 
Which is configured to serve static web content, which was generated from the `web-content` directory.

The Mongo client and GridFS are from the reactive streams library.

Image binary is streamed chunked to the frontend, to avoid needing to keep the entire image in memory.

Form data sent to the server via the REST API is recieved as a `Flux<Part>`



## Web-content

This directory holds all of the fun bits to serve end-user rendered html.
This can be bundled with the web-service, but is broken out in-case I want to take advantage of content servers such as Apache or nginx.
Web-content has code in it because, I know Angular 5 the best at the moment. 
Most of the work on all of these projects in front-end work. So I am currently sticking to what I know at the moment.
  

### Webpack 3

Webpack is currently configured with the following goodies:

- Browsersync Server that runs on localhost:3000 (when you run `npm run watch`) with a proxy to redirect HTTP request to an intended destination.
- It is set to create 3 files on build
    - app.[hash].js: which is all of the application code bundled together in a cache-busting hash post-fixed js file.
    - vendor.[hash].js: all of the vendor code wrapped up such as: angular5, bootstrap, rxjs, etc.
    - polyfills.[hash].js: all of the browser compatability stuff, I think....
- It is set to expose jquery as the global variables $ and jQuery
- It is set to load html templates post-fixed with htm into the javascript files (to avoid browser caching).
- It has a sass build process.
- All of the bundled files will be put into the index.html body when the node task `build` is run.

### Bootstrap 4

### Typescript Linting
Which is run by the command `npm run lint`

