const express = require('express');
const cors = require("cors");
const http = require("http");
const { routesInit } = require('./routes/configRoutes');
const db = require('./db/database')

const app = express();
app.use(cors());

app.use(express.json());

routesInit(app);

const server = http.createServer(app);

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
    console.log(`Server runs on port ${PORT}`);
});
