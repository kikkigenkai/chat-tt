const { Router } = require('express');
const Message = require('../models/messages');
const router = Router();

router.get('/list/:id', async (req, res) => {
    try {
        const allMessages = await Message.find({});
        const messages = allMessages.slice(req.params.id * 10, req.params.id * 10 + 10); //limit() offset()
        const count = allMessages.length;

        if (/\D/.test(req.params.id) || req.params.id < 0 || req.params.id > parseInt(count / 10)) {
            res.status(404).json({
                message: 'error'
            });
        } else {
            res.status(200).json({ data: {
                    count,
                    currentCount: messages.length,
                    messages 
                }
            });   
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'error'
        });
    }
});

router.get('/single/:id', async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);

        if (message.length === 0) {
            res.status(404).json({
                message: 'error'
            });
        } else {
            res.status(200).json({ data: message });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'error'
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const message = new Message({
            authorName: req.body.nickname,
            authorEmail: req.body.email,
            messageText: req.body.message
        });

        await message.save();
        
        res.status(200).json({ data: message });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'error'
        });
    }
});

router.put('/', async (req, res) => {
    try {
        const id = req.body.id.replace(/\n/, '');
        const message = await Message.findByIdAndUpdate(id, {
            authorName: req.body.nickname,
            authorEmail: req.body.email,
            messageText: req.body.message,
            updatedAt: Date.now()
        });

        res.status(200).json({ data: message });
    } catch (err) {
        res.status(500).json({
            message: 'error'
        });
    }
});

module.exports = router;