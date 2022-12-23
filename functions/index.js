const express = require('express');
const {createNewUser, login } = require('./firebase-module.js');
const {extractUserDetails} = require('./firebase-token-module.js');
const { sendMessage } = require('./twilio-module.js');

const functions = require('firebase-functions');


const HTTP_OK = 200;
const HTTP_FORBIDDEN = 403;
const HTTP_BAD_REQUEST = 400;

const application = express();

/*Configure JSON body parser*/
application.use(express.json());

/*API definition for Sign up*/
application.post('/api/signup',async (request,response) => {
    createNewUser(request.body.email,request.body.password)
    .then((user) => {
        response.statusCode = HTTP_OK;
        response.send(user);
    }).catch((error)=>{
        response.statusCode = HTTP_BAD_REQUEST;
        response.send({errorMessage: error.message});
    })
});

/*API definition for login*/
application.post('/api/login',(request,response)=>{
    login(request.body.email,request.body.password)
    .then((user) => {
        response.statusCode = HTTP_OK;
        response.send(user);
    }).catch((error)=>{
        response.statusCode = HTTP_BAD_REQUEST;
        response.send({errorMessage: error.message});
    })
});

/*Dummy endpoint that has access to the resources*/
application.get('/api/resource',(request,response)=>{
    extractUserDetails(request.headers.token)
    .then((userDetails)=>{
        console.log(userDetails);
        response.statusCode = HTTP_OK;
        response.send({"secret": "shown"});
    })
    .catch((error) => {
        response.statusCode = HTTP_FORBIDDEN;
        response.send({errorMessage: error.message})
    })
});

/*Send message if the user token is valid*/
application.post('/api/sendMessage',(request,response)=>{
    extractUserDetails(request.headers.token)
    .then((userDetails)=>{
        sendMessage(request.body.message)
            .then((messageId) =>{
                response.statusCode = HTTP_OK;
                response.send(messageId);
            })
            .catch((error)=>{
                response.statusCode = HTTP_BAD_REQUEST;
                response.send({errorMessage: error.message})
            })
    })
    .catch((error) => {
        response.statusCode = HTTP_FORBIDDEN;
        response.send({errorMessage: error.message})
    })
})


application.listen(3000, ()=>{
    console.log("Application web server started on port 8081")
});

exports.app=functions.https.onRequest(application);