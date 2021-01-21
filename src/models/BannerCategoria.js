const {Schema,model} = require('mongoose');

const bannerCategoria = new Schema({
    tipo: {
        categoria: String,
        temporada: String
    },
    estilo: Number,
    banners: [{
        orientacion: String,
        imagenBanner: String,
        vincular: Boolean,
        mostrarProductos: Boolean,
        mostrarTitulo: Boolean
    }]
},{
    timestamps: true
})

module.exports = model('bannerCategoria',bannerCategoria);