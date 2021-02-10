const { Router } = require('express');
const router = Router();
const Message = require('../models/messages');
const validatorMiddleware = require('../middleware/validatorMiddleware');

router.post('/', validatorMiddleware, async (req, res) => {
    try {
        const message = new Message({
            authorName: req.body.nickname,
            authorEmail: req.body.email,
            messageText: req.body.message
        });

        await message.save();
        
        res.json({ data: message });
    } catch (err) {
        console.log(err);
        res.json({
            message: 'error'
        });
    }
});

module.exports = router;