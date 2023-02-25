// user ariasabraham71
// password gT5hM0khT2w82LuT

const mongoose = require("mongoose");
const User = require("./users");
const dotenv = require("dotenv");
mongoose.set("debug", true);

dotenv.config();

let dbConnection;

function getDbConnection() {
    if (!dbConnection) {
        dbConnection = mongoose.createConnection(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }
    return dbConnection;
}

async function getUsersByName(name) {
    const userSchema = getDbConnection().model("User", User);
    let result;
    result = await userSchema.find({ name: name });
    return result;
}


async function addUser(user) {
    console.log(user)
    const userSchema = getDbConnection().model("User", User);
    try {
      const userToAdd = new userSchema(user);
      const savedUser = await userToAdd.save();
      return savedUser;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async function deleteUser(user) {
    const userSchema = getDbConnection().model("User", User);
    try {
        const deletedUser = await userSchema.findByOneAndDelete(user);
        return deletedUser;
    } catch (error) {
        return false;
    }
}

async function updateUser(user, update) {
    const userSchema = getDbConnection().model("User", User);
    try {
        return await userSchema.findByOneAndUpdate(user, update, { new: true });
    } catch (error) {
        return undefined;
    }
}

async function loginUser(req) {
    
    const userSchema = getDbConnection().model("User", User);
    console.log(req)
    const username = req.username;
    const password = req.password;
    try {
        const existingUser = await userSchema.findOne({username: username });
        console.log(existingUser)

        if (password === existingUser.password) {
            console.log(existingUser.token)
            return existingUser;
        }
        else {
            return undefined;
        }

    } catch (error) {
        return undefined;
    }
}


exports.getUsersByName = getUsersByName;
exports.addUser = addUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.loginUser = loginUser;