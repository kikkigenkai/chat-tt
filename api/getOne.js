const { Router } = require('express');
const router = Router();
const Message = require('../models/messages');
const idMiddleware = require('../middleware/idMiddleware');

router.get('/:id', idMiddleware, async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);

        res.json({ data: message });
    } catch (err) {
        console.log(err);
        res.json({
            message: 'error'
        });
    }
});

module.exports = router;