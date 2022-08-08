var express = require('express');
var router = express.Router();
var Order = require('../models/orderModel');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/orders', (req,res,next)=>{
  Order.find((err,data)=>{
      if (err) throw  err;
      res.send(data);        
  })
})

router.post('/orders',(req,res)=>{
  var order= new Order(req.body);
  console.log(order);

  Order.create(order, (err)=>{
      if(err) throw err;
      {
          var result={
              "message":"Order added successfully"
          }
          return res.send(result);
      }
  })
})


router.delete('/orders/:id', (req,res)=>{
  Order.findByIdAndRemove(req.params.id, (err, result)=>{
    if(err) throw err;
    return res.send(result);
  })
})



router.put('/orders/:id', (req, res)=>{
  var order = new Order(req.body);
  console.log(order);
  Order.findByIdAndUpdate(req.params.id, order, (err,result)=>{
    if (err) throw err;
    return res.send(result);
  })
})

module.exports = router;
