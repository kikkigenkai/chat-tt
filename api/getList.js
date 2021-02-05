const { Router } = require('express');
const router = Router();
const Message = require('../models/messages');

router.get('/:id', async (req, res) => {
    try {
        const allMessages = await Message.find({});
        const messages = allMessages.slice(req.params.id * 10, req.params.id * 10 + 10); //limit() offset()
        const count = allMessages.length;

        if (/\D/.test(req.params.id) || req.params.id < 0 || req.params.id > parseInt(count / 10)) {
            res.json({
                message: 'error'
            });
        } else {
            res.json({ data: {
                    count,
                    currentCount: messages.length,
                    messages 
                }
            });   
        }
    } catch (err) {
        console.log(err);
        res.json({
            message: 'error'
        });
    }
});

module.exports = router;