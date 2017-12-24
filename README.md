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

## Web-Service

This directory is a place holder for the Server-Side code. 
There is nothing in here @ the moment, because I may change what I want to use as my middle-ware from time to time.


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

