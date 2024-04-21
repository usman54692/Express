import { Config } from './src/Config/Config.js';
import app from './src/app.js'


const startServer= ()=>{
    const Port= Config.port || 8000;


    app.listen(Port, ()=>{
        console.log(`LISTENING ON PORT ${Port}`);
    })
}

startServer();

