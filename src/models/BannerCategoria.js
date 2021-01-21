const {Schema,model} = require('mongoose');

const bannerCategoria = new Schema({
    tipo: {
        categoria: String,
        temporada: String
    },
    estilo: Number,
    banners: [{
        orientacion: Number,
        imagenBanner: String,
        vincular: Boolean,
        mostrarProductos: Boolean,
        mostrarTitulo: Boolean
    }]
},{
    timestamps: true
})

module.exports = model('bannerCategoria',bannerCategoria);