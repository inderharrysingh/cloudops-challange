import express, { Application, Request, Response } from "express"
import { PrismaClient, Project } from '@prisma/client'
import { get } from "http"
const prisma = new PrismaClient()


const app = express()
const PORT  = 5000


app.use(express.json());
app.use(express.urlencoded({ extended: true}));



async function getProjects() {
    const items  = await  prisma.project.findMany()
    return items 
}


async function addProject( project : Project ) {
    
    const items = await prisma.project.create( {
        data : project
    })

}


app.get('/',  async ( req : Request, res : Response  ) => {
    
    const items =  await getProjects() 
    console.log(items)
    res.json({ message : "Hi bro"})
})


app.post('/add',  async ( req : Request, res : Response  ) => {
   
    const newItem : Project = req.body 

    const data  = await addProject(newItem)
    console.log(data)
    res.json({ message : "Hi bro"})
})





app.listen(PORT, () => {
    console.log(`Application listening on ${PORT}`)
})



