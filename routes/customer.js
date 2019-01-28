const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');


router.get('/', (req, res) => {
    customerController.getCustomers((customers, err) => {
        if (err){
            res.json({
                success: false,
                msg: 'Failed to show customers'
            });
        }else{
            res.render('customer', {customers});
        }    
    });
});

router.post("/delete/:id", (req, res) => {
    if (!!req.params.id) {
        customerController.deleteCustomer(req.params.id, (err) => {
        if (err)
          res.json({
            success: false,
            msg: 'Failed to delete customer'
          });
        else
          res.redirect('/customer/');
      });
    }
});

router.post("/create", (req, res) => {
    console.log('Hello from routes!');
    console.log(req.body);
    if (!!req.body) {
        customerController.createCustomer(req.body, (err) => {
        if (err)
          res.json({
            success: false,
            msg: 'Failed to create customer'
          });
        else
          res.redirect('/customer/');
      });
    }
});

router.get('/customer/:id');

module.exports = router;