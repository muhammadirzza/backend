const express=require('express')
const {Productcontrollers}=require('../controllers')
const router=express.Router()

router.get('/allproducts', Productcontrollers.allproducts)
router.post('/addproducts', Productcontrollers.addproducts)
router.delete('/deleteproduct/:id', Productcontrollers.deleteproducts)
router.put('/editproduct/:id', Productcontrollers.editproducts)

module.exports=router