const MessageService = require('../services/MessageService');

class MessageController {
    async createMessage(req, res) {
        try {
            const message = await MessageService.createMessage(req.body);
            
            res.json({ data: message });
        } catch (err) {
            console.log(err);
            res.json({
                message: 'error'
            });
        }
    }

    async editMessage(req, res) {
        try {
            const message = await MessageService.editMessage(req.body);
    
            res.json({ data: message });
        } catch (err) {
            console.log(err);
            res.json({
                message: 'error'
            });
        }
    }

    async getOne(req, res) {
        try {
            const message = await MessageService.getOne(req.params.id);
    
            res.json({ data: message });
        } catch (err) {
            console.log(err);
            res.json({
                message: 'error'
            });
        }
    }

    async getList(req, res) {
        try {
            const list = await MessageService.getList(req.params.id);
    
            res.json(list); 
        } catch (err) {
            console.log(err);
            res.json({
                message: 'error'
            });
        }
    }
}

module.exports = new MessageController();