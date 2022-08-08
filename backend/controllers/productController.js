var Product = require('../models/product.model');
const express= require('express');


module.exports.saveProduct=(req,res)=>{
    var product= new Product(req.body);
    console.log(product);
    Product.create(product, (err)=>{
        if(err) throw err;
        {
            var result={
                "message":"product added successfully"
            }
            return res.send(result);
        }
    })

}

module.exports.getAllProducts = (req,res,next)=>{
    Product.find((err,products)=>{
        if(err) throw err;
      //console.log(products);
      //res.send('Products Fetched Successfully',{product : products});
      res.send(products);
    })
};

module.exports.getProductById = function(req,res,next){
    Product.findById(req.params.id,(err,product)=>{
        if(err) throw err;
        res.send(product);
        //console.log(product);
    });
}


module.exports.deleteProduct = (req,res)=>{
    Product.findById(req.params.id, (err,product)=>{
        if(err) throw err;
        if(!product) return res.status(404).send('Product Doesnt exist with this id.');
        Product.findByIdAndRemove(req.params.id,(err)=>{
            if(err) throw err;
            var result={
                "message":"product deleted successfully"
            }
            return res.send(result);
        })
    })
}

module.exports.updateProduct = (req,res)=>{
    var product = new Product(req.body);
    console.log(product);
    Product.findByIdAndUpdate(req.params.id,product,(err,product)=>{
        if(err) throw err;
        //if(!product) return res.status(404).send('Product Doesnt exist with this Id');
        res.send(product);
    })
}

module.exports.editProduct=(req,res)=>{
    Product.findById(req.params.id,(err,product)=>{
        if(err) throw err;
        if(!product) return res.status(404).send('Product Doesnt exist with this id');
        var updatedProduct ={
            productName: req.body.productName,
            department: req.body.department,
            price:req.body.price,
            discountPrice:req.body.discountPrice,
            image:req.body.image,
            description:req.body.description
        };
        Product.findByIdAndUpdate(req.params.id, updateProduct,(err)=>{
            if(err) throw err;
            res.send("Product Updated successfully");
        });
    });
}