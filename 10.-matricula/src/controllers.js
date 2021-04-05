const Matricula = require('./models');

exports.getMatricula = async (req, res, next) => {
    try {
        const matricula = await Matricula.find();
        return res.status(200).json({
            success: true,
            count: matricula.length,
            data: matricula
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: 'Server Error'
        });
    };
};

exports.addMatricula = async (req, res, next) => {
    try {
        const matricula = await Matricula.create(req.body);
        return res.status(201).json({
            success: true,
            data: matricula
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: 'Server Error'
        });
    };
};

exports.deleteMatricula = async(req, res, next) => {
    try {
        const matricula = await Matricula.findById(req.params.id);
        await matricula.remove();
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

exports.updateMatricula = async(req, res, next) => {
    try {
        await Matricula.findOneAndUpdate({_id: req.params.id}, req.body);
        const matricula = await Matricula.findById(req.params.id);
        return res.status(200).json({
            success: true,
            data: matricula,
            msg: 'Producto Actualizado con Exito'
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: 'Server Error'
        });
    };
};