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

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
  
