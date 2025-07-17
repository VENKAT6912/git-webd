const express = require('express');
const jwt=require('jsonwebtoken');

const JWT_SECRET="randomvenkat12"

const app = express();

app.use(express.json());

const users = [];

function logger(req,res,next){
    console.log(req.method+" request came");
    next();
}
app.get("/",function(req,res){
    res.sendFile(__dirname+"/public/index.html")
})



app.post("/signup",logger, function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    // if (users.find(u => u.username === username)) {
    //   res.json({
    //     message: "You are already signedup"
    //   })
    // return
    // }


    users.push({
        username: username,
        password: password,

    })

    res.json({
        message: "You are signed up."

    })
    console.log(users)


})
app.post("/signin",logger, function (req, res) {

    const username = req.body.username;
    const password = req.body.password;

    // const foundUser=users.find(function(u){
    //     if(u.username===username && u.password===password){ // can also do with for loop;
    //         return true;

    //     }else{
    //         return false;
    //     }

    // })
    let foundUser = null;

    for (let i = 0; i < users.length; i++) {
        if (users[i].username == username && users[i].password == password) {
            foundUser = users[i];
        }
    }

    if (foundUser) {
        const token = jwt.sign({
            username:foundUser.username

        },JWT_SECRET);
        // foundUser.token = token;

        res.json({
            token: token
        })

    }
    else {
        res.status(403).send({
            message: "Invalid username or passowrd"
        })

    }
    console.log(users)
})
function auth(req,res,next){
    const token=req.headers.token;

    const decodedInformation=jwt.verify(token,JWT_SECRET);
    if(decodedInformation.username){
        req.username=decodedInformation.username;
        next();
    }else{
        res.json({
            message:"You are not logged in."
        })
    }
}

app.get("/me",logger, auth ,function(req,res){
    // const token=req.headers.token;
    // const decodedInformation=jwt.verify(token,JWT_SECRET);
    // const unAuthDecodedinfo=jwt.decode(token,);
    // const username=decodedInformation.username;
    let foundUser=null;
    
    for(let i=0;i<users.length;i++){
        if(users[i].username == req.username){ //authenticated end point!!
            foundUser=users[i];
        }

    }
    if(foundUser){
        res.json({
            username:foundUser.username,
            password:foundUser.password
        })
    }else{
        res.json({
            message:"Sorry:token invalid"
        })
    }
})








app.listen(3000);