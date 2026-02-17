import { addUsers, profileUpdate } from './model.js';

//user creation req/res handler
export async function createUser(req, res) {

    await addUsers(req.body);
    res.send({ "message": "User created" })
}

export async function updateProfile(req, res) {
   await profileUpdate(req, res);
}
