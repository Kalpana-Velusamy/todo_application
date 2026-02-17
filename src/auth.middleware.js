/** this file handles the token validation
 * validate token gets token from request and executes token validation 
 * handles response from token valiation function
 */
import { tokenValidation } from "./auth/model.js"

export async function validateToken(req, res, next) {
    if (!req.headers.authorization)
        return res.status(401).send({ "message": "Unauthorized" })


    const tokenResposne = await tokenValidation(req.headers.authorization)


    if (tokenResposne.success == false) {
        return res.status(401).send({ message: tokenResposne.message })
    }
    
    req.user = tokenResposne.tokenData;

    next()
}
