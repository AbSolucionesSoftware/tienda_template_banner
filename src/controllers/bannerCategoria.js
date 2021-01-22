const bannerCtrl =  {};
const imagen = require('./uploadFile.controllers');
const modelBanner = require('../models/BannerCategoria');

bannerCtrl.subirImagen = async (req,res,next) => {
    imagen.upload(req, res, function (err) {
		if (err) {
			res.status(404).json({ message: "formato de imagen no valido", err });
		}else{
			return next();
		}
	});
}

bannerCtrl.getBanners = async (req,res) => {
    try {
        const banners = await modelBanner.find({});
        res.status(200).json(banners);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error en el servidor",error });
    }
}

bannerCtrl.createBanner = async (req,res) => {
    try {
        console.log(req.body);
        const banner = new modelBanner(req.body);
        await banner.save();
        res.status(200).json({message: "Banner creado correctamente."});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error en el servidor",error });
    }
}

bannerCtrl.agregateBanner = async (req,res) => {
    try {
        const {orientacion,vincular,mostrarProductos,mostrarTitulo,categoria,temporada} = req.body;
        const banner = {
            tipo: {}
        };
        banner.vincular = vincular;
        banner.mostrarProductos = mostrarProductos;
        banner.mostrarTitulo = mostrarTitulo;
        if(req.file){
            banner.imagenBanner = req.file.key;
        }
        if(orientacion){
            banner.orientacion = orientacion;
        }
        if(categoria){
            banner.tipo.categoria = categoria;
        }
        if(temporada){
            banner.tipo.temporada = temporada;
        }
        await modelBanner.updateOne(
            {
                _id: req.params.idBanner
            },
            {
                $addToSet: {
                    banners: [ banner ]
                }
            }
        )
        res.status(200).json({message: "Banner agregado correctamente."});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error en el servidor",error });
    }
}

bannerCtrl.editSubBanner = async (req,res) => {
    try {
        const {orientacion,vincular,mostrarProductos,mostrarTitulo} = req.body;
        const banner = {};
        banner.vincular = vincular;
        banner.mostrarProductos = mostrarProductos;
        banner.mostrarTitulo = mostrarTitulo;
        if(req.file){
            banner.imagenBanner = req.file.key;
        }
        if(orientacion){
            banner.orientacion = orientacion;
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error en el servidor",error });
    }
}

bannerCtrl.deleteBanner = async (req,res) => {
    try {
        const bannerBase = await modelBanner.findById(req.params.idBanner);
        if(bannerBase){
            if(bannerBase.imagenBanner){
                await imagen.eliminarImagen(bannerBase.imagenBanner)
            }
            await modelBanner.findByIdAndDelete(req.params.idBanner);
            res.status(200).json({message: "Banner eliminado."})
        }else{
            res.status(404).json({ message: "El banner no existe" });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error en el servidor",error });
    }
}

bannerCtrl.eliminarImagen = async (req,res) => {
    try {
        const bannerBase = await modelBanner.findById(req.params.idBanner);
        const newBanner = {};
        if(bannerBase.imagenBanner){
            await imagen.eliminarImagen(bannerBase.imagenBanner);
            newBanner.imagenBanner = '';
            await modelBanner.findByIdAndUpdate(req.params.idBanner,newBanner);
        }
        res.status(200).json({message: "Imagen eliminada."})
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error en el servidor",error }); 
    }
}

module.exports = bannerCtrl;