const { Router } = require('express');
const router = Router();
const Message = require('../models/messages');
const validatorMiddleware = require('../middleware/validatorMiddleware');
const idMiddleware = require('../middleware/idMiddleware');
const listMiddleware = require('../middleware/listMiddleware');
const MessageController = require('../controllers/MessageController');

router.post('/', validatorMiddleware, MessageController.createMessage);
router.put('/', validatorMiddleware, MessageController.editMessage);
router.get('/single/:id', idMiddleware, MessageController.getOne);
router.get('/list/:id', listMiddleware, MessageController.getList);

module.exports = router;