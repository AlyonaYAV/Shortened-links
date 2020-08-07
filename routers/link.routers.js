//Routers for link generation to make them shorten
const {Router} = require("express");
const Link = require("./../models/Link");
const shortId = require("shortId")
const auth = require("./../middlewares/auth.middleware");
const config = require("config");
const router = Router();
//'/api/link/generate'
router.post('/generate', auth, async (request, response)=> {
    try{
        const baseUrl = config.get("baseUrl");
        const {from} = request.body;
        //Create short ID qs a unique code
        const code = shortId.generate();
        const existing = await Link.findOne({ from });
        //If link is already exists
        if (existing) {
            return response.json({ link: existing });
        }
        //Make shorten link for our service
        const to = baseUrl + '/t/' + code;
        //Create new link
        const link = new Link({
            code, to, from, owner: request.user.userId
        });
        //Save Link into the DB
        await link.save();
        //201 Created
        response.status(201).json( {link} );
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

