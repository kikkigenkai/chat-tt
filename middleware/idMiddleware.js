const Message = require('../models/messages');

module.exports = (req, res, next) => {
    Message.findById(req.params.id, (err, item) => {
        if (err || !item) {
            return res.json({
                message: 'none'
            });
        }

        next();
    });
};