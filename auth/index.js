/** importing required functions from model.js from 'users package' and 'auth package '
 * Auth folder handles the routing, token generation for user authentication
 */
import { addUsers, getUserByEmail } from "../users/model.js";
import { tokenGeneration } from "./model.js";
import crypto from 'crypto';


/** This is regiser user function.  It takes input request from http requests
 * this function takes user email id from register requests and validates it
 * get user by email function used to validate the user in db to identify if the user is already exists
 * 
 * if not addUsers is called to register the new user into user table and user is registerd successuflly
 */

export async function registerUser(req, res) {
    const user = await getUserByEmail(req.body.email);
    // console.log('user valued returned from db', user)
    if (user.code == 100) {
        return res.status(409).send({ "message": "User already exists" })
    } else if (user.code == 102) {
        return res.status(400).send({ message: "Something went wrong" })
    }

    await addUsers(req.body);
    res.send({ "message": "User Registered Successfully" })
}

/** This is login user function.  
 * this function takes user email id and validates it
 * getuserbyemail function used to validate the user in db to identify if the user is exists
 */

export async function loginUser(req, res) {

    if (!req.body.email) {
        return res.status(400).send({ message: "Please enter valid email id" })
    }
    if (!req.body.password) {
        return res.status(400).send({ message: "Please enter password" })
    }

    const user = await getUserByEmail(req.body.email);

    if (user.code == 100) {
        const encryptedPassword = crypto.createHash('md5').update(req.body.password).digest('hex'); /** encryption for password */
        if (user.data.password == encryptedPassword) {                                          /** password validation */
            const userData = { name: user.data.name, id: user.data.id, email: user.data.email }
            const token = tokenGeneration(userData)                                             /** token generation with the user data */
            return res.send({ "message": " User logged in successfully", "user": userData, token })
        } else {
            return res.status(401).send({ message: "Incorrect Password" })
        }

    } else if (user.code == 101) {
        return res.status(404).send({ "message": "User doesnot exists" })
    } else {
        return res.status(400).send({ "message": "Something went wrong" })
    }
}
