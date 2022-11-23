# playable-factory-mulakat

About the project:  
Backend:  
Entry point starts in app.ts then loops through routes, to create these routes cleaner we are using a common.routes abstract class,
routes get registered in users/users.routes.config, there we are using middlewares to validate the incoming data with
the request, controllers to use the data and services that is getting used with controllers for processing the required
information, we are also using a dto(data transfer object) to compose the data while moving through logic, also we are using
winston for logging the request data in more depth.

Frontend:  
yarn frontend uses webpack to deploy and compile the frontend, /client folder is frontend src, /public is for general frontend configuration,
currently authguard and front-end jwt token catcher is working.

How to run the project:  
1- Install the required packages with: yarn  
2- Rename the .example-env to .env then add the required data.  
3- Push the prisma schema to posgresql with: npx prisma db push  
4- yarn dev

Postman Collection:  
Is in main folder of the project;  
Playable Factory Mulakat.postman_collection.json

Notes:  
Prisma reset/full wipe database:  
npx prisma migrate reset

References:  
https://www.prisma.io/docs  
https://fakerjs.dev/api/  
https://restfulapi.net/http-status-codes/  
https://dev.to/franciscomendes10866/testing-express-api-with-jest-and-supertest-3gf  
https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/  
https://www.toptal.com/nodejs/secure-rest-api-in-nodejs#anatomy-of-a-rest-api  
https://www.toptal.com/express-js/nodejs-typescript-rest-api-pt-1  
https://www.toptal.com/express-js/nodejs-typescript-rest-api-pt-2
