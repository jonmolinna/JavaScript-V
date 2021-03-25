const express = require('express');
const router = express.Router();

const { getProduct, addProduct, deleteProduct, updateProduct } = require('./controllers');

router.route('/')
    .get(getProduct)
    .post(addProduct)

router.route('/:id')
    .delete(deleteProduct)
    .put(updateProduct)

module.exports = router;