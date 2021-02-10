module.exports = (req, res, next) => {
    if (req.body.nickname.length === 0 || req.body.nickname.length >= 20 || /\s/.test(req.body.nickname)) {
        return res.json({
            message: 'wrong nickname'
        });
    } else if (!/^([a-zA-z]|\d)+@[a-zA-Z]+\.[a-zA-z]+$/i.test(req.body.email)) {
        return res.json({
            message: 'wrong email'
        });
    } else if (req.body.message.trim().length === 0 || req.body.message.length > 100) {
        return res.json({
            message: 'wrong message text'
        });
    } else {
        next();
    }
};