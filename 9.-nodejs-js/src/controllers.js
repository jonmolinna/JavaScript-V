const Product = require('./models');

exports.getProduct = async(req, res, next) => {
    try {
        const product = await Product.find();
        return res.status(200).json({
            success: true,
            count: product.length,
            data: product
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: 'Server Error'
        });
    };
};

exports.addProduct = async(req, res, next) => {
    try {
        const product = await Product.create(req.body);
        return res.status(201).json({
            success: true,
            data: product,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: 'Server Error'
        });
    };
};

exports.deleteProduct = async(req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        await product.remove();
        return res.status(200).json({
            success: true,
            data: {},
            msg: 'Se elimino el producto con exito'
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: 'Server Error'
        });
    };
};

exports.updateProduct = async(req, res, next) => {
    try {
        const { name, precio, categoria } = req.body;
        await Product.findOneAndUpdate({_id: req.params.id}, {
            name,
            precio,
            categoria
        });
        const product = await Product.findById(req.params.id);
        console.log(product)
        return res.status(200).json({
            success: true,
            data: product,
            msg: 'Producto Actualizado con Exito'
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: 'Server Error'
        })
    }
};