const { Router } = require('express');
const Message = require('../models/messages');
const router = Router();



router.get('/', (req, res) => {
    try {
       res.render('index'); 
    } catch (err) {
        console.log(err);
    }
});

router.get('/edit/:id',  async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);

        res.render('edit', {
            message
        }); 
    } catch (err) {
        console.log(err);
    }
});

router.get('/docs', (req, res) => {
    try {
        res.render('docs');
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;