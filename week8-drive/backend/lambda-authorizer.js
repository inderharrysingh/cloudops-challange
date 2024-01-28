import jwt from "jsonwebtoken"
const { verify } = jwt

const SECRET = "i-am-inderjot-singh"








function authorizer(token) {

    const response = vertifyToken(token)

    return {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Action": "execute-api:Invoke",
                "Effect": response ? "Accept" : "Deny",
                "Resource": "arn:aws:execute-api:us-east-1:123456789012:ivdtdhp7b5/ESTestInvoke-stage/GET/"
            }
        ]
    }


}





function vertifyToken(token) {


    try {
        const check = verify(token, SECRET)
        console.log(check)
        return true
    }

    catch {
        console.log("wrong token")
        return false
    }

}
