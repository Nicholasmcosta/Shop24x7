var express= require('express');
var router= express.Router();
var productController = require('../controllers/productController');


/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
  });

  
//POST request Adding the Product : http://localhost:3000/products/save
router.post('/save',productController.saveProduct);

//GET Products Displaying All Products: http://localhost:3000/products/products
router.get('/products', productController.getAllProducts);

//GET products by id: http://localhost:3000/products/products/60fee536e9a56238c468c4c5
router.get('/products/:id', productController.getProductById);

//post request: http://localhost:3000/products/delete/60fee536e9a56238c468c4c5
router.delete('/delete/:id', productController.deleteProduct);

//GET request:http://localhost:3000/products/update/60fee7b2e9a56238c468c4cb
router.put('/update/:id', productController.updateProduct);

//POST request : http://localhost:3000/products/60fee7b2e9a56238c468c4cb
router.post('/edit/:id', productController.editProduct);

module.exports= router;