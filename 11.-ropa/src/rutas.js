const express = require('express');
const router = express.Router();

const { getRopa, addRopa, deleteRopa, updateRopa } = require('./controllers');

router.route('/')
    .get(getRopa)
    .post(addRopa)

router.route('/:id')
    .delete(deleteRopa)
    .put(updateRopa)

module.exports = router;