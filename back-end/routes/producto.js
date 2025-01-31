const express = require('express');
const router = express.Router();
const pool = require('../db/dbconfig');

router.get('/sin-contenedor',obtenerProductosSinContenedor);
router.get('/con-contenedor',obtenerProductosConContenedor);
router.get('/cantidad-por-color/:id',obtenerCantidadPorColor);
router.get('/cantidad-por-contenedor/:id', obtenerCantidadPorContenedor);

async function obtenerProductosSinContenedor(req,res){
    try {
        const [results] = await pool.promise().query('SELECT * FROM producto p LEFT JOIN contenedorproductos ON p.idProducto = producto WHERE producto IS NULL;');
        res.json(results);
    } catch (error) {
        console.error('Error ejecutando la consulta:', error);
        return res.status(500).send('Error en el servidor.');
    }
}
async function obtenerProductosConContenedor(req,res){
    try {
        const [results] = await pool.promise().query('SELECT * FROM producto p JOIN contenedorproductos ON p.idProducto = producto GROUP BY idProducto;');
        res.json(results);
    } catch (error) {
        console.error('Error ejecutando la consulta:', error);
        return res.status(500).send('Error en el servidor.');
    }
}

async function obtenerCantidadPorContenedor(req,res){
    try {
        const {id} = req.params;        
        const [results] = await pool.promise().query('SELECT * FROM contenedorProductos WHERE producto = ?;',[id]);
        res.json(results);
    } catch (error) {
        console.error('Error ejecutando la consulta:', error);
        return res.status(500).send('Error en el servidor.');
    }
}
async function obtenerCantidadPorColor(req,res){
    try{
        const {id} = req.params;
        const query = 
        `SELECT 
            p.idProducto, 
            p.nombre, 
            cp.color, 
            SUM(COALESCE(cp.cantidad, 0)) AS total_cantidad,
            cp.unidad,
            c.nombre AS nombreColor
        FROM producto p
        JOIN contenedorproductos cp ON p.idProducto = cp.producto
        JOIN color c ON  cp.color = idColor
        WHERE p.idProducto = ?
        GROUP BY p.idProducto, p.nombre, cp.color, cp.unidad;`;
        const [results] = await pool.promise().query(query,[id]);
        res.json(results);
    }catch(error){
        console.error('Error ejecutando la consulta:', error);
        return res.status(500).send('Error en el servidor.');
    }
}
module.exports = router;