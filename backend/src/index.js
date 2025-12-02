import express from "express";
import cors from "cors";
import {createServer} from "node:http"
import { PORT } from "./config/envConfig.js";
import apiRouter from "./routes/index.js";
import {Server} from "socket.io";
import chokidar from "chokidar";
import { handleEditorSocketEvents } from "./socketHandlers/editorHandler.js";
const app = express();
const server = createServer(app);
const io = new Server(server,{
    cors:{
        origin:"*",
        methods:["GET","POST"]
    }
});


app.use(express.json());
app.use(express.urlencoded());
app.use(cors({  origin: "*"}));

app.use('/api',apiRouter)

app.get("/ping",(req,res)=>{
    return res.json({mes:"pong"})
})


const editornamespace = io.of('/editor');

editornamespace.on("connection",(socket)=>{
    console.log("editor connected")
    // somehow we will get the project Id from frontend;
    const queryParams = socket.handshake.query;
    let projectId=queryParams.projectId;
 console.log("project Id recieved", projectId)
    if(projectId){
        var watcher = chokidar.watch(`./projects/${projectId}`,{
            ignored:(path)=>path.includes('node_modules') || path.includes('.git'),
            persistent:true, // keep the watcher in running state till the time app is running
            awaitWriteFinish:{
                stabilityThreshold:2000, //ensure stability of files before triggerting the event
            },
            ignoreInitial:true
        });
        watcher.on("all",(event,path)=>{
            console.log(path,event)
        })
    }

    handleEditorSocketEvents(socket)

   
    // socket.on("disconnect",async()=>{
    //     await watcher.close();
    //     console.log("editor  disconnected")
    // })
})


server.listen(PORT,()=>{
    console.log(`Server started on port :${PORT}`)
})
