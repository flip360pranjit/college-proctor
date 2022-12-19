const express = require("express");
const router = express.Router();
const User = require("../schemas/userSchema");
const bcrypt = require("bcrypt");
const Test = require("../schemas/testSchema");

function updateUser(username){
    currentUser = username;
}
function updateTest(code){
    currentTest = code;
}

//Fetching the current Date and Time
function fetchDate(){
    const date = new Date();
    const today = date.toLocaleDateString();
    return today;
}
function fetchTime(){
    const date = new Date();
    const now = date.toLocaleTimeString();
    return now;
}
//Fetcing the random Code
function makeCode(){
    var code = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const l = characters.length;
    for(var i=0;i<5;i++){
        var currChar = characters.charAt(Math.random() * l);
        code += currChar;
    }
    return code;
}

router.post("/register", async function(req,res){
    const securePassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
        fullName: req.body.fullName,
        username: req.body.username,
        password: securePassword
    });
    user.save()
    .then(() => {
        res.sendStatus(200);
    })
    .catch(error => {res.json(error)});
    updateUser(req.body.username);
});

router.post("/login", function(req,res){
    User.findOne({username: req.body.username}, async function(err, foundUser){
        if(err) throw err;
        else if(!foundUser){
            const result = {
                "status": 404,
                "data": "User does not exist!"
            }
            res.send(JSON.stringify(result));
        }
        else{
            const isValid = await bcrypt.compare(req.body.password, foundUser.password);
            if(!isValid){
                const result = {
                    "status": 401,
                    "data": "Invalid Password!"
                }
                res.send(JSON.stringify(result));
            }
            else{
                const result = {
                    "status": 200,
                    "data": "Valid Password!"
                }
                updateUser(req.body.username);
                res.send(JSON.stringify(result));
            }
        }
    })

    router.post("/create-test", function(req, res){
        const code = makeCode();
        const test = new Test({
            username: currentUser,
            title: req.body.title,
            code: code,
            numberOfQuestions: req.body.numberOfQuestions,
            total: req.body.total,
            date: fetchDate(),
            time: fetchTime()
        });
        test.save()
        .then(data => {res.json(data)})
        .catch(error => {res.json(error)});
        updateTest(code);
    });

    router.get("/get-current-test-details", function(req,res){
        Test.findOne({username: currentUser, code: currentTest}, function(err, foundTest){
            if(err) throw err;
            else{
                const test = {
                    code: foundTest.code,
                    title: foundTest.title,
                    numberOfQuestions: foundTest.numberOfQuestions,
                    total: foundTest.total
                }
                res.json(test);
            }
        })
    })

    router.post("/add-question", function(req,res){
        console.log(req.body.question);
        Test.findOneAndUpdate({username: currentUser, code: currentTest}, {"$push": {
            questions: req.body.question
        }}, function(err, result){
            if(err){
                res.json(err);
            }
        });
    })
});

module.exports = router;