const { Router } = require('express');
const router = Router();
const Message = require('../models/messages');
const listMiddleware = require('../middleware/listMiddleware');

router.get('/:id', listMiddleware, async (req, res) => {
    try {
        const allMessages = await Message.find({});
        const messages = allMessages.slice(req.params.id * 10, req.params.id * 10 + 10); //limit() offset()
        const count = allMessages.length;

        res.json({ data: {
                count,
                currentCount: messages.length,
                messages 
            }
        }); 
    } catch (err) {
        console.log(err);
        res.json({
            message: 'error'
        });
    }
});

module.exports = router;