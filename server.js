//This is used to load the ENVIRONMENT variables and making it available to all of the program through process.env
require("dotenv").config();

const express = require("express");

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
require("./routes")(server);
server.listen(process.env.API_PORT, () => {
  console.log(
    "ALLKEY API is currently running on port " + process.env.API_PORT
  );
});
