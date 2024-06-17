const express = require("express");
const connection = require("./configs/mongoose");
const router = require("./routes/Routes");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require('http');
const socketIo = require('socket.io');
require("dotenv").config();
const cookieParser = require('cookie-parser');
const { saveProdcut } = require('./controllers/UploadProduct');

const app = express();
const port = process.env.PORT;

connection();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());



app.use(cors({
  origin:"https://667051d11c5ad13992580f09--rococo-biscochitos-89295e.netlify.app",
  credentials: true,
}));

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "https://667051d11c5ad13992580f09--rococo-biscochitos-89295e.netlify.app",
    methods: ["GET", "POST"]
  }
});

saveProdcut(io);

app.use("/", router);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
