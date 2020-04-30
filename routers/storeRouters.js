const express=require('express')
const {Storecontrollers}=require('../controllers')
const router=express.Router()

router.get('/allstore', Storecontrollers.allstore)
router.post('/addstore', Storecontrollers.addstores)
router.delete('/deletestore/:id', Storecontrollers.deletestore)
router.put('/editstore/:id', Storecontrollers.editstore)

module.exports=router