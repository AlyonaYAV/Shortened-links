const { Router } = require('express');
const Link = require('./../models/Link');
const router = Router();

router.get('/:code', async (request, response)=>{
    try{
        const link = await Link.findOne( {code: request.params.code} );
        if(link){
            link.clicks++;
            //Save into the DB
            await link.save();
            return response.redirect(link.from);
        }
        response.status(404).json({message: "Link isn't found!"})
    }catch(e){
        response.status(500).json({message: "Something went wrong!"})
    }
})

module.exports = router;