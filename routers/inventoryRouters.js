const express=require('express')
const {Inventorycontrollers}=require('../controllers')
const router=express.Router()

router.get('/allinventory', Inventorycontrollers.allinventory)
router.post('/addinventory', Inventorycontrollers.addinventory)
router.delete('/deleteinventory/:id', Inventorycontrollers.deleteinventory)
router.put('/editinventory/:id', Inventorycontrollers.editinventory)

module.exports=router