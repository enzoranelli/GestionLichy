const express = require('express');
const router = express.Router();
const pool = require('../db/dbconfig');

router.get('/',obtenerContenedores);
router.post('/', agregarContenedor);

async function obtenerContenedores(req,res){
    try {
        const [results] = await pool.promise().query('SELECT * FROM contenedor');
        res.json(results);
    } catch (error) {
        console.error('Error ejecutando la consulta:', error);
        return res.status(500).send('Error en el servidor.');
    }
}

async function agregarContenedor(req,res){
    try{

        const {idContenedor, usuario, proveedor, codigoContenedor, forwarder,sira,vep} = req.body;
        const connection = pool;
        if(!idContenedor || !usuario || !proveedor){    
            return res.status(400).send('Faltan campos obligatorios');
        }
        connection.query('INSERT INTO Contenedor (idContenedor, usuario, proveedor, codigoContenedor, forwarder,sira,vep) VALUES (?,?,?,?,?,?,?)',[idContenedor, usuario, proveedor, codigoContenedor, forwarder,sira,vep],(err,results)=>{
            if(err){
                console.error('Error ejecutando la consulta:', err);
                return res.status(500).send('Error en el servidor.');
            }
            res.json(results);
        });
        
    }catch(error){
        console.error('Error ejecutando la consulta:', error);
        return res.status(500).send('Error en el servidor.');
    }
}

module.exports = router;