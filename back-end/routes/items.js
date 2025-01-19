const express = require('express');
const router = express.Router();
const pool = require('../db/dbconfig');

router.get('/proveedor',obtenerProveedores);
router.post('/proveedor',agregarProveedor);
router.get('/color',obtenerColores);
router.post('/color',agregarColor);
router.get('/producto',obtenerProductos);
router.post('/producto',agregarProducto);
router.get('/categorias',obtenerCategorias);


async function obtenerProveedores(req,res){
    try {
        const [results] = await pool.promise().query('SELECT * FROM proveedor');
        res.json(results);
    } catch (error) {
        console.error('Error ejecutando la consulta:', error);
        return res.status(500).send('Error en el servidor.');
    }
}
async function agregarProveedor(req,res){
    try{

        const {nombre} = req.body;
        const connection = pool;
        if(!nombre){
            return res.status(400).send('Faltan campos obligatorios');
        }
        connection.query('INSERT INTO proveedor (nombre) VALUES (?)',[nombre],(err,results)=>{
            if(err){
                console.error('Error ejecutando la consulta:', err);
                return res.status(500).send('Error en el servidor.');
            }
            const insertId = results.insertId;
            connection.query('SELECT * FROM proveedor WHERE idProveedor = ?',[insertId],(err,results)=>{
                if(err){
                    console.error('Error ejecutando la consulta:', err);
                    return res.status(500).send('Error en el servidor.');
                }
                res.json(results);
            });
        });
    }catch(error){
        console.error('Error ejecutando la consulta:', error);
        return res.status(500).send('Error en el servidor.');
    }
}

async function obtenerColores(req,res){
    try {
        const [results] = await pool.promise().query('SELECT * FROM color');
        res.json(results);
    } catch (error) {
        console.error('Error ejecutando la consulta:', error);
        return res.status(500).send('Error en el servidor.');
    }
}
async function agregarColor(req,res){
    try{

        const {nombre} = req.body;
        const connection = pool;
        if(!nombre){
            return res.status(400).send('Faltan campos obligatorios');
        }
        connection.query('INSERT INTO color (nombre) VALUES (?)',[nombre],(err,results)=>{
            if(err){
                console.error('Error ejecutando la consulta:', err);
                return res.status(500).send('Error en el servidor.');
            }
            const insertId = results.insertId;
            connection.query('SELECT * FROM color WHERE idColor = ?',[insertId],(err,results)=>{
                if(err){
                    console.error('Error ejecutando la consulta:', err);
                    return res.status(500).send('Error en el servidor.');
                }
                res.json(results);
            });
        });
    }catch(error){
        console.error('Error ejecutando la consulta:', error);
        return res.status(500).send('Error en el servidor.');
    }
}
async function obtenerProductos(req,res){
    try {
        const [results] = await pool.promise().query('SELECT * FROM producto');
        res.json(results);
    } catch (error) {
        console.error('Error ejecutando la consulta:', error);
        return res.status(500).send('Error en el servidor.');
    }
}

async function agregarProducto(req,res){    
    try{
        const {nombre} = req.body;
        const connection = pool;
        if(!nombre){
            return res.status(400).send('Faltan campos obligatorios');
        }
        connection.query('INSERT INTO Producto (nombre) VALUES (?)',[nombre],(err,results)=>{
            if(err){
                console.error('Error ejecutando la consulta:', err);
                return res.status(500).send('Error en el servidor.');
            }
            const insertId = results.insertId;
            connection.query('SELECT * FROM producto WHERE idProducto = ?',[insertId],(err,results)=>{
                if(err){
                    console.error('Error ejecutando la consulta:', err);
                    return res.status(500).send('Error en el servidor.');
                }
                res.json(results);
            });
        });
    }catch(error){
        console.error('Error ejecutando la consulta:', error);
        return res.status(500).send('Error en el servidor.');
    }
}
async function obtenerCategorias(req,res) {
    try {
        const query = `
        SELECT * FROM categorias;`;
        const [results] = await pool.promise().query(query);
        res.json(results);
    } catch (error) {
        console.error('Error ejecutando la consulta:', error);
        return res.status(500).send('Error en el servidor.');
    }
    
}
module.exports = router;
