const Message = require('../models/messages');

class MessageService {
    async createMessage(message) {
        const createdMessage = new Message({
            authorName: message.nickname,
            authorEmail: message.email,
            messageText: message.message
        });

        await createdMessage.save();
        
        return createdMessage;
    }

    async editMessage(message) {
        const id = message.id.replace(/\n/, '');
        const editedMessage = await Message.findByIdAndUpdate(id, {
            authorName: message.nickname,
            authorEmail: message.email,
            messageText: message.message,
            updatedAt: Date.now()
        });

        return editedMessage;
    }

    async getOne(id) {
        const message = await Message.findById(id);

        return message;
    }

    async getList(id) {
        const allMessages = await Message.find({});
        const messages = allMessages.slice(id * 10, id * 10 + 10); //limit() offset()
        const count = allMessages.length;

        return { data: {
                count,
                currentCount: messages.length,
                messages 
            }
        };
    }
}

module.exports = new MessageService();