const config = require("config");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = config.get('port') || 3000;

//Register Auth routers
app.use('/api/auth', require('./routers/auth.routers'));

async function start(){
    try{
        //Method 'conect' returns Promise, 'avait' while Promise will be completed 
        mongoose.connect(config.get('mongoUri'),{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        //Start server

        app.listen(PORT, ()=>{
            console.log(`Server is running on port - ${PORT}`);
        }); 
    }catch(e){
        console.log("Server error "+e.message);
        //Close Node process
        process.exit(1);

    }
}
start();