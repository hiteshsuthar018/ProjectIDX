import Docker from "dockerode";

const docker = new Docker();

export async function GetContainerPort(projectId){
    try {
        const conatiner = await docker.listContainers({projectId:projectId, all:true});
        if(conatiner.length>0){
            const containerDetails = docker.getContainer(conatiner[0].Id);
            const containerInfo = await containerDetails.inspect();
            const port = containerInfo.NetworkSettings.Ports["5173/tcp"][0].HostPort;
            return port;
        }
    } catch (error) {
        console.log("error while getting container port", error);
        return null;
    }
    
}

export const handleContainerCreate = async (projectId, terminalSocket,req,tcpSocket,head) => {
    console.log("project Id Recieved from container create", projectId);
    try {
        const conatiners = await docker.listContainers({projectId:projectId, all:true});
        if(conatiners.length>0){
            console.log("Container already exists");
            //start the existing container
            const existingContainer = docker.getContainer(conatiners[0].Id);
            await existingContainer.remove({force:true});
            console.log("Existing container removed");
        }   
        
        const container = await docker.createContainer({
            Image: 'sandbox',
            AttachStdin: true,
            AttachStdout: true,
            AttachStderr: true,
            name:projectId,
            Cmd: ['/bin/bash'],
            Tty: true, //interactive behaviour like yes/no
            User: 'sandbox',
            ExposedPorts: {
                    "5173/tcp": {}
            },
            ENV: ["HOST=0.0.0.0"],
            HostConfig: {
                Binds: [ //mouting the project directory to container
                    `${process.cwd()}/projects/${projectId}/sandbox:/home/sandbox/app`
                ],
                PortBindings: {
                    "5173/tcp": [
                        {
                            "HostPort": "0" //random port will be assigned by docker
                        }
                    ]
                },
            },
            
        })
        console.log("conatiner created :", container.id)
        await container.start();

        console.log("container started");
        //below is the place from where we upgrade the connection to websocket
        terminalSocket.handleUpgrade(req,tcpSocket,head,(establishedWSConn)=>{
            terminalSocket.emit("connection",establishedWSConn,req,container);
        })

        console.log("container started successfully")
    } catch (error) {
        console.log("error while creating container ", error)
    }
}


