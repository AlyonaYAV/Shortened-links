//Routers for link generation to make them shorten
const {Router} = require("express");
const Link = require("./../models/Link");
const auth = require("./../middlewares/auth.middleware");
const router = Router();

router.post('/generate', async (request, response)=> {
    try{

    }catch(e){
        response.status(500).json({message: "Something went wrong!"});
    }
});
//Get all links
router.get('/', auth, async (request, response)=> {
    try{
        //request.user.userId - it is accesible thanks to middleware
        const links = await Link.find({owner: request.user.userId});
        response.json(links);
    }catch(e){
        response.status(500).json({message: "Something went wrong!"});
    }
});
//
router.get('/:id', async (request, response)=> {
    try{
        const link = await Link.findById(request.params.id);
        response.json(link);
    }catch(e){
        response.status(500).json({message: "Something went wrong!"});
    }
})

module.exports = router;

