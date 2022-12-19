require("dotenv").config();

const express = require("express");
const path = require("path");
const app = express();

const routeUrls = require("./routes/routes");
const cors = require("cors");
const mongoose = require("mongoose");



mongoose.connect("mongodb://localhost:27017/quizDB", {useNewUrlParser: true})
.then(() => {
    console.log("Connected to database.");
})
.catch((err) => {
    console.log(err);
});


app.use(express.static(path.join(__dirname + "public")));
app.use(express.json());
app.use(cors());
app.use("/app", routeUrls);






app.listen(process.env.PORT || 4000, () => {
    console.log("Server started successfully.");
});





















































































// require("dotenv").config();
// const express = require("express");
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
// const session = require("express-session");
// const passport = require("passport")
// const passportLocalMongoose = require("passport-local-mongoose");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const findOrCreate = require("mongoose-findorcreate");


// const app = express();

// app.use(express.static("src"));
// app.set('view engine', 'ejs');
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(express.json());
// app.use(session({
//     secret: process.env.SECRET,
//     resave: false,
//     saveUninitialized: false
// }));
// app.use(passport.initialize());
// app.use(passport.session());


// mongoose.connect("mongodb://localhost:27017/quizDB", {useNewUrlParser: true});

// const userSchema = new mongoose.Schema({
//     fullName: {
//         type: String,
//         required: true
//     },
//     username: {
//         type: String,
//         required: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     googleId: String,
//     facebookId: String,
//     secret: String
// });
// userSchema.plugin(passportLocalMongoose);
// userSchema.plugin(findOrCreate);

// const User = mongoose.model("User", userSchema);

// /////////////////////////////////////Local Serialize and Deserialize//////////////////////////////
// passport.use(User.createStrategy());


// //////////////////////////////////Universal Serialize and Deserialize//////////////////////////////
// passport.serializeUser(function(user, cb) {
//     process.nextTick(function() {
//       return cb(null, {
//         id: user.id,
//         username: user.username,
//         picture: user.picture
//       });
//     });
//   });
  
//   passport.deserializeUser(function(user, cb) {
//     process.nextTick(function() {
//       return cb(null, user);
//     });
//   });

//   //////////////////////////////////Access Token Issue////////////////////////////////////
// const HttpsProxyAgent = require('https-proxy-agent');
// const agent = new HttpsProxyAgent(process.env.HTTP_PROXY);


// ///////////////////////////////////Login With Google////////////////////////////////////////////
// const gStrategy = new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: "http://localhost:3000/auth/google/secrets",
//     userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     //View what a google cloud profile contains in your terminal
//     console.log(profile);
//     User.findOrCreate({ googleId: profile.id }, function (err, user) {
//       return cb(err, user);
//     });
//   }
// );
// gStrategy._oauth2.setAgent(agent);
// passport.use(gStrategy);


// //Authorization with google
// app.get("/auth/google",
//   passport.authenticate("google", { scope: ["profile"] })
// );

// app.get("/auth/google/secrets", 
//   passport.authenticate("google", { failureRedirect: "/login" }),
//   function(req, res) {
//     // Successful authentication, render secrets page.
//     res.redirect("/secrets");
//   });


// //   app.get("/secrets", function(req, res){
// //     User.find({secret: {$ne: null}}, function(err, foundUsers){
// //         if(err){
// //             console.log(err);
// //         }else{
// //             if(!foundUsers){
// //                 console.log("No secrets found.");
// //             }else{
// //                 res.send("Got it!");
// //             }
// //         }
// //     });
// // });
// // app.get("/submit", function(req, res){
// //     if(req.isAuthenticated()){
// //         res.render("submit");
// //     }else{
// //         res.redirect("/login");
// //     }
// // });
// // app.get("/logout", function(req, res){
// //     req.logout(function(err){
// //         if(err){
// //             console.log(err);
// //         }else{
// //             res.redirect("/");
// //         }
// //     });
// // });




// // app.post("/register", function(req, res){
// //     const user = new User({
// //         fullName: req.body.fullName,
// //         username: req.body.username,
// //         password: req.body.password
// //     })
// //     user.save();
// //     res.send("Success");
// // });
// // app.post("/login", function(req, res){
// //    const user = new User({
// //     username: req.body.username,
// //     password: req.body.password
// //    });
// //    req.login(user, function(err){
// //     if(err){
// //         console.log(err);
// //     }else{
// //         passport.authenticate("local")(req, res, function(){
// //             res.redirect("/secrets");
// //         });
// //     }
// //    });
// // });
// // app.post("/submit", function(req, res){
// //     User.findById(req.user.id, function(err, foundUser){
// //         if(err){
// //             console.log(err);
// //         }else{
// //             if(!foundUser){
// //                 console.log("User not found.")
// //             }else{
// //                 foundUser.secret = req.body.secret;
// //                 foundUser.save();
// //                 res.redirect("/secrets");
// //             }
// //         }
// //     });
// // });






// app.listen(4000, function(){
//     console.log("Server started successfully.");
// });