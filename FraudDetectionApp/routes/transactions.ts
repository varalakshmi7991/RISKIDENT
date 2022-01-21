/*
 * GET transactions listing.
 */
import express = require('express');

import t = require('../controllers/transactionsController');
const router = express.Router();

router.get('/', t.TransactionsController.instantiateController().getTransactions);

export default router;