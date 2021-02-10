const Message = require('../models/messages');

module.exports = async (req, res, next) => {
    const allMsgs = await Message.find({});
    const count = allMsgs.length;
    
    if (/\D/.test(req.params.id) || req.params.id < 0 || req.params.id > parseInt(count / 10)) {
        return res.json({
            message: 'bad list number'
        });
    }

    next();
};