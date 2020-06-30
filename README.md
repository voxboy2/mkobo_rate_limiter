# How to implement an api rate limiter in node js

### To implement an api, there are several ways to do that but we will make use of a third-party middlware built for express framework of node js.

notes:
1. its assumed node js and express installed on your machine/server
1. its assumed we are working on an application which we have built an api that simulates or performs user authentication,if you dont have kindly look for a boiler plate of node js api authentications or download this one with link:
1. run npm i on your terminal
1. its assumed you have knowledge of mongodb database and implementing it iwth node js.

lets goooooooo:

* install the third party middleware called express-rate-limit like this "npm i express-rate-limit --save"

* install mongoose and create an account with mongodb atlas

* connect your application to mongodb atlas

* in our case we have a file called index.js located at the root folder ,so we add this line of code "const rateLimit = require("express-rate-limit");" at the top of the index .js

* post the following code in your index.js file:

``` const limiter = rateLimit({
  windowMs: 60 * 1000, 
  max: 5,
  message: "Too many accounts created from this IP, please try"

});

``` 

> windowsms:for time which in our case is 60 mins(1 hour)
> max: stands for the maximum limit a user can access a certain page
> message: stands for the message we send to the user.

* we then go to our routes middleware still in the same index.js and add the limiter to the routes 
in our case we have two routes: 
  1. one for user authentication:
app.use('/api/user', authRoute)

  2. another one for the page the user tries to access when he is authenticated which is this:
app.use('/api/posts', limiter, postRoute)

* Download postman or insomnia on your system 


* go to the route, http://localhost:3000/api/user/register, and register as a user by adding your name,email,password
in this format  
```
 {
             "name":EFE EBIEROMA
             "email":efewebdev@gmail.com
             "password":pass11
}
```
you will receive a message and a token
* put the token in the header 
in this manner "auth-token  your token"
*navigate to http://localhost:3000/api/posts send the get request 5 times clicking send button 5 times after the fifth time you get a message.





Be glad you have successfully implemented a rate limiter




