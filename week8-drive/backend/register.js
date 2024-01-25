import { DynamoDBClient, GetItemCommand, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { GetCommand, DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);


function registerUser(username, name, password) {

    try {

        // username has to be unique
        // isUnique(username)


        // create entry in the dynodb table 



    }

    catch (error) {
        console.log(error)
    }

}


async function isUnique(username) {

    // check the dynamodb table 

    const command = new GetItemCommand({
        "TableName": "drive-table",
        "Key": {
            "username": {
                "S": username
            }
        }



    });

    const response = await docClient.send(command);
    console.log(response)


}




async function addToTable(username, name, password) {

    const command = new PutCommand({
        tablename: "drive-table",
        item: {
            username: username,
            password: password,
            name: name
        }
    })

    const response = await docClient.put(command)
    console.log(response)
    return response;


}

await isUnique('indejot')
// await addToTable("raju", "inderjot", "indejot")



