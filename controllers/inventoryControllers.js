const {db} = require('../connections')

module.exports={
    allinventory:(req, res)=>{
        var sql = `select p.nama as product, s.branch_name as branch_name, i.inventory from inventory i 
        join store s on i.store_id=s.store_id
        join products p on i.product_id=p.product_id`
        db.query(sql, (err, inventory)=>{
            if(err) return res.status(500).send(err)
            sql = `select store_id, branch_name from store`
            db.query(sql, (err2, branch)=>{
                if(err2) return res.status(500).send(err)
                sql = `select product_id, nama from products`
                db.query(sql, (err3, product)=>{
                   if(err2) return res.status(500).send(err)
                   return res.status(200).send({inventory,branch,product})
                })
            })
        })
    },

    addinventory:(req,res)=>{
        var sql = `insert into inventory set ?`
        db.query(sql, req.body, (err, result)=>{
            if(err) return res.status(500).send(err)
            // buat dapat datanya lagi
            sql = `select p.nama as product, s.branch_name as branch_name, i.inventory from inventory i 
            join store s on i.store_id=s.store_id
            join products p on i.product_id=p.product_id`
            db.query(sql, (err1, result1)=>{
                if(err) return res.status(500).send(err1)
                return res.status(200).send(result1)
            })
        })
    },

    editinventory:(req,res)=>{
        console.log('params', req.params)
        console.log('params', req.body)
        var sql = `update inventory set ? where inventory_id =${req.params.id}`
        db.query(sql, req.body,(err, result)=>{
            if(err) return res.status(500).send(err)
            // buat dapat datanya lagi
            sql = `select p.nama as product, s.branch_name as branch_name, i.inventory from inventory i 
            join store s on i.store_id=s.store_id
            join products p on i.product_id=p.product_id`
            db.query(sql, (err1, result1)=>{
                if(err) return res.status(500).send(err1)
                return res.status(200).send(result1)
            })
        })
    },

    deleteinventory:(req,res)=>{
        console.log('params', req.params)
        console.log('params', req.body)
        var sql = `delete from inventory where inventory_id =${req.params.id}`
        db.query(sql, (err, result)=>{
            if(err) return res.status(500).send(err)
            // buat dapat datanya lagi
            sql = `select p.nama as product, s.branch_name as branch_name, i.inventory from inventory i 
            join store s on i.store_id=s.store_id
            join products p on i.product_id=p.product_id`
            db.query(sql, (err1, result1)=>{
                if(err) return res.status(500).send(err1)
                return res.status(200).send(result1)
            })
        })
    },
}