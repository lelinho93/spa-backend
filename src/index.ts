import express from "express";
import { AddressInfo } from "net";
import calculateHours from "./endpoints/calculateHours";

const cors = require("cors");

const app = express();


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin","*")
    app.use(cors())
    next();
})

app.use(express.json());

/**************************************************************************/

app.post("/calcularhoras", calculateHours)


/**************************************************************************/

app.listen(process.env.PORT || 3003)