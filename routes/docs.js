const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    try {
        res.render('docs');
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;