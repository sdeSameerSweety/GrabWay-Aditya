const express = require("express");
const cors = require("cors");
const fs = require("fs");
const jwt = require("jsonwebtoken");
jwtSecretKey="VeryImportantKey";
const cookieParser = require("cookie-parser");
const port = 8080;
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: [process.env.PUBLIC_URL],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.get("/userToken", (req,res)=>{
    const { token } = req.cookies;
    if (token) {
        tokenData = jwt.verify(token, jwtSecretKey);
        //console.log(tokenData.email)
        const tokenEmail = tokenData.email;
        //console.log(tokenEmail)
        console.log("present")
        res.status(200).send("UserData");
      } else {
        res.json(null);
        console.log("not present");
      }
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
  