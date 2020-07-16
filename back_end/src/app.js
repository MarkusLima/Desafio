const Express = require("express");
const mongoose = require("mongoose");
const BodyParser = require("body-parser");
const router = require("./routes/routes");
const cors = require("cors");
var app = Express();

mongoose.connect("mongodb+srv://user:senha@cluster0.2oaec.mongodb.net/geolocations?retryWrites=true&w=majority", {
    useNewUrlParser: true, useUnifiedTopology: true
}, () => console.log("Connect on database"));

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use("/", router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => { console.log("Acesse localhost:" + PORT); });


module.exports = app;
