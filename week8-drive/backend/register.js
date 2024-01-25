import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { marshall } from '@aws-sdk/util-dynamodb';
import { hash, compare } from 'bcrypt'


const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
const SALT_ROUNDS = 5

async function registerUser(username, name, password) {

    try {

        // username has to be unique
        const response = await isUnique(username)



        // if unique
        if (!response || !response.Item) {

            const response = await addToTable(username, name, password)

            if (response['$metadata'].httpStatusCode == 200) {
                return {
                    statusCode: 200, message: "User created Successfully"
                }
            }

            else {

                console.log(response)
                return {
                    statusCode: 200, message: "Some error occurrured "
                }
            }

        }



        // already exists 
        else {

            return {
                statusCode: 200, message: "User already exists , either login or user other email"
            }

        }


        // create entry in the dynodb table 



    }

    catch (error) {
        console.log(error)

        return {
            statusCode: 500,
            message: "Unknow error occur , retry "
        }
    }

}


async function isUnique(username) {

    // check the dynamodb table 
    console.log(username)
    const command = new GetItemCommand({
        TableName: "drive-table",
        Key: marshall({ ['username']: username })



    });

    const response = await docClient.send(command);

    return response


}




async function addToTable(username, name, password) {

    const hashedPassword = await hash(password, SALT_ROUNDS)

    const command = new PutCommand({
        TableName: "drive-table",
        Item: {
            username: username,
            password: hashedPassword,
            name: name
        }
    })

    const response = await docClient.send(command)
    // console.log(response)
    return response;


}

console.log(await registerUser("neplai", "nina", "asldfj"))

