# Acari Template Project

---

This project is, like the title states, a template for creating applications for the Acari web-suite.

It comes pre-baked with the following goodies

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

