
import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { marshall } from '@aws-sdk/util-dynamodb';
import { compare } from 'bcrypt'
import jwt from "jsonwebtoken";
const { sign } = jwt


const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
const SECRET = "i-am-inderjot-singh"

async function login(email, password) {

    try {

        const user = await findUser(email)

        console.log(typeof user.Item)
        console.log(user.Item)

        if (!user || !user.Item) {
            return {
                statuscode: 400,
                message: "user doen't exist error, email is wrong  "
            }
        }

        else {
            console.log("plane pasword")
            console.log(password)
            console.log("encrptyed passwrd")
            console.log(user.Item.password.S)
            const result = await compare(password, user.Item.password.S)


            if (result) {
                return {
                    statuscode: 200,
                    message: "user logged in Successfully",
                    // have to send encrypted user key to the client , using jwt
                    token: createToken(user.Item)
                }
            }

            else {

                return {
                    statuscode: 400,
                    message: "wrong password"
                }
            }

        }



    }

    catch (err) {
        console.log(err)
        return {
            statuscode: 500,
            message: "some error occur retry"
        }
    }


}



function createToken(user) {

    const token = sign({ data: user }, SECRET, { expiresIn: 60 * 60 });

    return token


}




async function findUser(email) {

    // check the dynamodb table 
    console.log(email)
    const command = new GetItemCommand({
        TableName: "my-drive-table",
        Key: marshall({ ['email']: email })



    });

    const response = await docClient.send(command);

    return response


}

