const express = require('express');
const router = express.Router();

const { getMatricula, addMatricula, deleteMatricula, updateMatricula } = require('./controllers');

router.route('/')
    .get(getMatricula)
    .post(addMatricula)

router.route('/:id')
    .delete(deleteMatricula)
    .put(updateMatricula)

module.exports = router;