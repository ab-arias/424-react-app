const express = require('express');
const cors = require('cors');
const app = express();
const port = 4500;

app.use(cors());

app.use(express.json());


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

app.get

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

app.post("/account/register", (req, res) => {
    const registerUser = req.body;
    const tested = testPassword(registerUser["password"]);
    if(registerUser["password"] === registerUser["confirmPassword"] && tested) {
        addUser({username: registerUser["username"], password: registerUser["password"]});
        res.status(201).end();
    }
    else {
        console.log("error")
        res.status(404).end();
    }
});

function testPassword(password) {
    let myRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{1,}$");
    return myRegex.test(password);
}

function addUser(user){
    userTable.push(user);
}

const userTable = [
        {
            username : "abe",
            password : "password" 
        }
    ]