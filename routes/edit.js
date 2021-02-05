const { Router } = require('express');
const router = Router();
const Message = require('../models/messages');

router.get('/:id',  async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);

        res.render('edit', {
            message
        }); 
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;