const express = require('express');
const router = express.Router();

const MailController = require('../controllers/MailController');

router.post('/mail', MailController.mailReceived);

module.exports = router;
