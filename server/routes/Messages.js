// messages router and routes
const messages = require('../controllers/Messages');
const router = require('express').Router();

router.get('/', messages.getMessages);
router.post('/', messages.postMessage);
router.delete('/', messages.deleteMessages);
router.delete('/', messages.deleteMessage);

module.exports = router;
