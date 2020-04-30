const {db} = require('../connections')

module.exports={
    allstore:(req, res)=>{
        db.query('select * from store', (err, result)=>{
            if(err) return res.status(500).send(err)
            return res.status(200).send(result)
        })
    },

    addstores:(req,res)=>{
        var sql = `insert into store set ?`
        db.query(sql, req.body, (err, result)=>{
            if(err) return res.status(500).send(err)
            // buat dapat datanya lagi
            db.query(`select * from store`, (err1, result1)=>{
                if(err) return res.status(500).send(err1)
                return res.status(200).send(result1)
            })
        })
    },

    editstore:(req,res)=>{
        console.log('params', req.params)
        console.log('params', req.body)
        var sql = `update store set ? where store_id =${req.params.id}`
        db.query(sql, req.body,(err, result)=>{
            if(err) return res.status(500).send(err)
            // buat dapat datanya lagi
            db.query('select * from store', (err1, result1)=>{
                if(err) return res.status(500).send(err1)
                return res.status(200).send(result1)
            })
        })
    },

    deletestore:(req,res)=>{
        console.log('params', req.params)
        console.log('params', req.body)
        var sql = `delete from store where store_id =${req.params.id}`
        db.query(sql, (err, result)=>{
            if(err) return res.status(500).send(err)
            // buat dapat datanya lagi
            db.query('select * from store', (err1, result1)=>{
                if(err) return res.status(500).send(err1)
                return res.status(200).send(result1)
            })
        })
    },
}