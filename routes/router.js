let express = require('express'),
    router = express.Router(),
    PhotoController = require('../controllers/photo-controller'),
    photoController = new PhotoController()

//router

router
    .get('/',photoController.getAll)
    .get('/add',photoController.getAddSection)
    .get('/edit/:photo_id',photoController.getEditSectionByPhoto)
    .post('/add',photoController.setPhoto)
    .put('/update/:photo_id',photoController.updatePhoto)
    .delete('/delete/:photo_id/:photo_src',photoController.deletePhoto)

module.exports = router;