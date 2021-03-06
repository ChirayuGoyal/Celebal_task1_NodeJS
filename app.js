const express = require("express")
const app = express()
const swaggerUI = require("swagger-ui-express")
const YAML = require("yamljs")
const swaggerJsDocs = YAML.load("./api.yaml")
app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(swaggerJsDocs))
const adminRoutes = require("./routes/adminRoutes");
const studentRoutes = require("./routes/studentRoutes")
const mongoose = require("mongoose")
const CONNECTION_URI ="mongodb+srv://ChirayuGoyal:#LdYGhnEB5F26GK@cluster0.kyv1z.mongodb.net/?retryWrites=true&w=majority";
require('dotenv').config({path: './config.env'})

app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())



// Connecting to MongoDB
mongoose.connect(CONNECTION_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,

    }).then(() => {
        console.info("[MongoDB Connected Successfully]");
    })
    .catch((error) => {
        console.error("There was a problem in connecting to the database")
    })
app.get("/", (req, res) => {
    res.status(200).send("Author - CHIRAYU GOYAL CSI_204")
})

app.use(adminRoutes);
app.use(studentRoutes);


const Port = process.env.PORT || 9160
app.listen(Port, () => {
    console.log(`Connection Established with port number: ${Port}`)
})


  