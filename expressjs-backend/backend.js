const express = require('express');
const cors = require('cors');
const app = express();
const port = 4500;

app.use(cors());

app.use(express.json());


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.post("/users", (req, res) => {
    const userToAdd = req.body;
    const foundUser = userTable.find(user => user['username'] === userToAdd["username"] && user['password'] === userToAdd["password"]);
    if(foundUser) {
        res.status(201).send("2342f2f1d131rf12").end();
    }
    else {
        console.log("error")
        res.status(404).end();
    }
});

const userTable = [
        {
            username : "abe",
            password : "password" 
        }
    ]