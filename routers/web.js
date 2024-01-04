const express = require('express');
const productController = require('../controllers/productController');
const multer = require('multer');
const upload = multer({dest: 'upload/'});
const router = express.Router();

//Xử lý trên web
router.get('/', productController.getList);
router.get('/add', productController.getAdd);
router.post('/add',upload.single('anh_sp') ,productController.postAdd);
router.get('/edit/:id', productController.getEdit);
router.post('/edit/:id',upload.single('anh_sp'), productController.postEdit);
router.get('/detail/:id', productController.getDetail);
router.get('/delete/:id', productController.getDelete);
router.get('/search', productController.getSearch);

//Xử lý trên postman
router.get('/api/list', productController.getListApi);
router.post('/api/add',upload.single('anh_sp'), productController.postAddApi);
router.post('/api/edit/:id',upload.single('anh_sp'), productController.postEditApi);
router.get('/api/delete/:id', productController.getDeleteApi);
router.get('/api/search', productController.getSearchApi);

module.exports = router;
