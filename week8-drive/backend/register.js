import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { marshall } from '@aws-sdk/util-dynamodb';
import { hash } from 'bcrypt'


const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
const SALT_ROUNDS = 5

async function registerUser(email, name, password) {

    try {

        // email has to be unique
        const response = await isUnique(email)



        // if unique
        if (!response || !response.Item) {

            const response = await addToTable(email, name, password)

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


async function isUnique(email) {

    // check the dynamodb table 
    console.log(email)
    const command = new GetItemCommand({
        TableName: "my-drive-table",
        Key: marshall({ ['email']: email })



    });

    const response = await docClient.send(command);

    return response


}




async function addToTable(email, name, password) {

    const hashedPassword = await hash(password, SALT_ROUNDS)

    const command = new PutCommand({
        TableName: "my-drive-table",
        Item: {
            email: email,
            password: hashedPassword,
            name: name
        }
    })

    const response = await docClient.send(command)
    // console.log(response)
    return response;


}

console.log(await registerUser("neplai", "nina", "asldfj"))

