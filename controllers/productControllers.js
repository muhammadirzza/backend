const {db} = require('../connections')
const fs = require('fs')
const {uploader} = require('../helper/upload')

module.exports={
    allproducts:(req,res) => {
        var sql=`select * from products`
        db.query(sql, (err1, result1)=>{
            if(err1) return res.status(500).send(err1)
            return res.status(200).send(result1)
        })
    },

    addproducts:(req, res)=>{
        try {
            const path='/foto' 
            const upload=uploader(path, 'TES').fields([{name: 'image'}]) 
            
            upload (req, res, (err)=>{
                if(err){
                    return res.status(500).json({message:'Upload picture failed', error:err.message});
                }
                // console.log('lewat')
                const {image}=req.files;
                // console.log(image)
                const imagepath = image ? path + '/' + image[0].filename : null
                // console.log(imagepath)
                // console.log(req.body.data)
                const data = JSON.parse(req.body.data)
                // console.log(data, '1')
                data.imagePath=imagepath
                // console.log(data,2)
                var sql = 'insert into products set ?'
                db.query(sql,data,(err, result)=>{
                    if(err) {
                        fs.unlinkSync('./public' + imagePath); 
                        return res.status(500).json({message:"There's an error on the server. Please contact the admin"})
                    }
                    sql=`select * from products`
                    db.query(sql, (err1, result1)=>{
                        if(err1) return res.status(500).send(err1)
                        return res.status(200).send(result1)
                    })
                })
            })
        } catch (error) {
            return res.status(500).send(error)
        }
    },

    deleteproducts:(req,res)=>{
        const {id}=req.params
        var sql=`select * from products where product_id=${id}`
        db.query(sql, (err, result)=>{
            if(err) res.status(500).send(err)
            if(result.length) {                 
                // console.log(result)
                sql=`delete from products where product_id=${req.params.id}`
                db.query(sql, (err,result2)=>{
                    // console.log(result2)
                    if(err) res.status(500).send(err)
                    if(result[0].imagePath) {
                        // console.log(result[0].imagePath)
                        fs.unlinkSync('./public'+result[0].imagePath)
                    }
                    sql=`select * from products`
                    db.query(sql, (err1, result1)=>{
                        if(err1) return res.status(500).send(err1)
                        return res.status(200).send(result1)
                    })
                })
            }else{
                return res.status(500).send({message:'id tidak ditemukan'})
            }
        })
    },

    editproducts:(req,res)=>{
        const {id}=req.params
        var sql=`select * from products where product_id=${id}`
        db.query(sql, (err,result)=>{
            if(err) res.status(500).send(err)
            if(result.length) {
                try {
                    const path='/foto'
                    const upload=uploader(path, 'TES').fields([{name: 'image'}])
                    upload (req, res, (err)=>{
                        if(err) {
                            return res.status(500).json({message: 'Upload Post Picture Failed !', error: err.message});        
                        }
                        console.log('upload edit foto success')
                        const { image } = req.files
                        const imagePath = image ? path + '/' + image[0].fields : null
                        const data = JSON.parse(req.body.data)
                        if(imagePath) {
                            data.imagePath=imagePath
                        }
                        sql = `Update photos set ? where id = ${id}`
                        db.query(sql,data,(err1,result1)=>{
                            if(err1) {
                                if(imagePath) {
                                    fs.unlinkSync('./public' + imagePath)
                                }
                                return res.status(500).json({message:"There's an error on the server", error: err1.message})
                            }
                            if(imagePath) {
                                if(result[0].imagePath) {
                                    fs.unlinkSync('./public' + result[0].imagePath)
                                }
                            }
                            sql=`select * from photos`
                            db.query(sql, (err1, result3)=>{
                                if(err1) return res.status(500).send(err1)
                                return res.status(200).send(result3)
                            })
                        })
                    })
                } catch (error) {
                    
                }
            }else{
                return res.status(500).send({message:'id tidak ditemukan'})
            }
        })
    }
}