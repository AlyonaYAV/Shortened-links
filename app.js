const config = require("config");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const { request } = require("http");
const { response } = require("express");
const PORT = config.get('port') || 3000;

//To get correct property 'body' from Request object. 'body' is a stream.
app.use(express.json({ extended:true }));

//Register Auth routers
app.use('/api/auth', require('./routers/auth.routers'));
app.use('/api/link', require('./routers/link.routers'));
app.use('/t', require('./routers/redirect.routers'));

if(process.env.NODE_ENV === 'production'){
    app.use('/', express.static(path.join(__dirname, 'client', 'build')));

    app.get('*',(request, response)=>{
        response.sentFile( path.resolve(__dirname, 'client', 'build', 'index.html'))
    };
}

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