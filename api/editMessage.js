const { Router } = require('express');
const router = Router();
const Message = require('../models/messages');

router.put('/', async (req, res) => {
    try {
        const id = req.body.id.replace(/\n/, '');
        const message = await Message.findByIdAndUpdate(id, {
            authorName: req.body.nickname,
            authorEmail: req.body.email,
            messageText: req.body.message,
            updatedAt: Date.now()
        });

        res.json({ data: message });
    } catch (err) {
        console.log(err);
        res.json({
            message: 'error'
        });
    }
});

module.exports = router;