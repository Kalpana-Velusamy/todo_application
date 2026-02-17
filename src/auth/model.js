/** importing json web token to create tokens . use npm install jsonwebtoken first to import the required files */

import jwt from 'jsonwebtoken';

/**  this function generates token for user authentication .*/

export function tokenGeneration(userdata) {
    // console.log(process.env.TOKEN_SECRET)
    var token = jwt.sign(userdata, process.env.TOKEN_SECRET, { expiresIn: '30m' });  //Token expires in 30
    //console.log(token)
    return token;
};

/**  this function validates the token used in the authorization header .*/
/** TOKEN_SECRET IS SET IN .env settings file */

export async function tokenValidation(token) {
    try {
        const tokenData = jwt.verify(token, process.env.TOKEN_SECRET)
        //console.log(tokenData);
        return { success: true, tokenData }
    } catch (err) {
        return { success: false, message: "Invalid token" }
    }


};
