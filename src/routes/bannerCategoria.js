const { Router } = require('express');
const router = Router();
const auth = require('../middleware/auth');
const {subirImagen,createBanner,getBanners,agregateBanner,deleteBanner,eliminarImagen} = require('../controllers/bannerCategoria');

router.route('/')
    .get(getBanners)
    .post(createBanner);

router.route('/:idBanner').put(subirImagen,agregateBanner);

router.route('/:idBanner/action/:idSubBanner').put()

/* router.route('/:idBanner')
    .put(auth,subirImagen,agregateBanner)   
    .delete(auth,deleteBanner); */

router.route('/imagen/:idBanner').delete(auth,eliminarImagen);

module.exports = router;