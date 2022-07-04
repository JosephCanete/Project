const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const connectDb = require("./config/db");
const PORT = process.env.PORT || 5000;

const app = express();

//Connec to database;
connectDb();
app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

app.listen(PORT, console.log(`Our server is listening at PORT ${PORT}`));
