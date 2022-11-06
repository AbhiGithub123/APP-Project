const http = require('http');
const env = require('dotenv');
const {MongoClient} = require("mongodb");
const { urlFound } = require('./routes/studentRoutes');


//environment variables
env.config();

//mongodb connection
let connectionString = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.nl3gd.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`
let db;


MongoClient.connect(
    connectionString,
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (err, client) {
      db = client.db()
      console.log("DataBase connected");
    }
  )


const server = http.createServer(async (req, res) => {

    //Handling cors requests
    const optionsHeader = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, DELETE, PUT, PATCH",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
    }

    const Header = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
    }

    if (req.method === 'OPTIONS') {
        res.writeHead(200, optionsHeader);
        res.end();
        return;
    }
    const validUrl = await urlFound(req,db);
    if (validUrl.status == true) {
        res.writeHead(200, Header)
        let hasExpiryData;
        if(validUrl.method=="GET")
        {
        hasExpiryData=validUrl.responseData.length>0 && validUrl.responseData.find((student)=>student.showAlert==true) ? true:false;
        }
        validUrl.method == "POST" ? res.end(JSON.stringify({ message: validUrl.message })) : res.end(JSON.stringify({studentData:validUrl.responseData,hasExpiryData}));
    }
    else {
        res.writeHead(404, Header);
        res.end(JSON.stringify({ message: validUrl.message || "Route Not Found" }))
    }
});

const PORT = process.env.PORT

server.listen(PORT, () => console.log(`Server is running on port -${PORT}`));