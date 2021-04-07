const Ropa = require('./models');

exports.getRopa = async (req, res, next) => {
    try {
        const ropa = await Ropa.find();
        return res.status(200).json({
            success: true,
            count: ropa.length,
            data: ropa,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: 'Server Error',
        });
    };
};

exports.addRopa = async (req, res, next) => {
    try {
        const ropa = await Ropa.create(req.body);
        return res.status(201).json({
            success: true,
            data: ropa,
            msg: 'Producto Agregado con exito'
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: 'Server Error',
        });
    };
};

exports.deleteRopa = async (req, res, next) => {
    try {
        const ropa = await Ropa.findById(req.params.id);
        await ropa.remove();
        return res.status(200).json({
            success: true,
            data: {},
            msg: 'Se elimino el producto con exito'
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: 'Server Error'
        });
    };
};

exports.updateRopa = async (req, res, next) => {
    try {
        await Ropa.findOneAndUpdate({_id: req.params.id}, req.body);
        const ropa = await Ropa.findById(req.params.id);
        return res.status(200).json({
            success: true,
            data: ropa,
            msg: 'Producto Actualizado con Exito'
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: 'Server Error'
        });
    };
};