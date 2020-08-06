//Routers for link generation to make them shorten
const {Router, request, response} = require("express");
const Link = require("./../models/Link");
const router = Router();

router.post('/generate', async (request, response)=> {
    try{

    }catch(e){
        response.status(500).json({message: "Something went wrong!"});
    }
});
//Get all links
router.post('/', async (request, response)=> {
    try{

    }catch(e){
        response.status(500).json({message: "Something went wrong!"});
    }
});
//
router.post('/:id', async (request, response)=> {
    try{

    }catch(e){
        response.status(500).json({message: "Something went wrong!"});
    }
})

module.exports = router;

