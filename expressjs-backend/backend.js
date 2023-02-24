const express = require('express');
const cors = require('cors');
const app = express();
const port = 4500;
const userServices = require("./models/user-services");

app.use(cors());

app.use(express.json());


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

// app.get('/users', (req, res) => {
//     console.log(userTable)
//     res.status(201).send(userTable).end()
// });

app.post("/users", async (req, res) => {
    const user = req.body;
    const foundUser = await userServices.loginUser(user)
    if(foundUser) {
        res.status(201).send(foundUser.token).end();
    }
    else {
        console.log("error")
        res.status(404).end();
    }
});

app.post("/account/register", async (req, res) => {
    const registerUser = req.body;
    const tested = testPassword(registerUser["password"]);
    if(registerUser["password"] === registerUser["confirmPassword"] && tested) {
        await userServices.addUser({username: registerUser["username"], password: registerUser["password"], token: "2342f2f1d131rf12" });
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