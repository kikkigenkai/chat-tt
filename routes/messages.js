const { Router } = require('express');
const Message = require('../models/messages');
const router = Router();



router.get('/', (req, res) => {
    res.render('index');
});

router.get('/:id',  async (req, res) => {
    const message = await Message.findById(req.params.id);

    res.render('edit', {
        message
    });
});

module.exports = router;