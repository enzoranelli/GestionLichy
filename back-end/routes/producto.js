const express = require('express');
const router = express.Router();
const pool = require('../db/dbconfig');

router.delete('/:id',eliminarProducto);
router.get('/sin-contenedor',obtenerProductosSinContenedor);
router.get('/con-contenedor',obtenerProductosConContenedor);
router.get('/cantidad-por-color/:id',obtenerCantidadPorColor);
router.get('/cantidad-por-contenedor/:id', obtenerCantidadPorContenedor);
router.get('/cantidad-total/:id',obtenerCantidadTotal);
router.get('/cantidad-por-estado/:id',obtenerCantidadPorEstado);
router.get('/cantidad-por-ubicacion/:id',obtenerCantidadPorUbicacion);
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
        const [results] = await pool.promise().query('SELECT * FROM contenedorProductos cp LEFT JOIN color c ON c.idColor = cp.color WHERE producto = ?;',[id]);
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
async function eliminarProducto(req,res){
    try{
        const {id} = req.params;
        const connection = pool;
        connection.query('DELETE FROM Producto WHERE idProducto = ?',[id],(err,results)=>{
            if(err){
                console.error('Error ejecutando la consulta:', err);
                return res.status(500).send('Error en el servidor.');
            }
            res.json(results);
        })
    }catch(error){
        console.error('Error ejecutando la consulta:', error);
        return res.status(500).send('Error en el servidor.');
    }
}
async function obtenerCantidadTotal(req,res){
    try{
        const id = req.params.id;
        const query = `
        SELECT sum(cantidad) as cantidad_total FROM contenedorproductos WHERE producto =?; `;
        const [results] = await pool.promise().query(query, [id]);
        console.log(results);
        res.json(results);
    }catch(error){
        console.error('Error ejecutando la consulta:', error);
        return res.status(500).send('Error en el servidor.');
    }
}
async function obtenerCantidadPorEstado(req,res){
    try{
        const id = req.params.id;
        const query = `
        SELECT 
           SELECT cp.*, ce.estado, ce.ubicacion, ce.fechaHora, ce.fechaManual
            FROM contenedorproductos cp
            JOIN contenedorestado ce ON cp.contenedor = ce.contenedor
            JOIN (
                SELECT contenedor, MAX(fechaHora) AS max_fechaHora
                FROM contenedorestado
                GROUP BY contenedor
            ) ultimo_estado ON ce.contenedor = ultimo_estado.contenedor AND ce.fechaHora = ultimo_estado.max_fechaHora
            WHERE cp.producto = ?;`;
        const [results] = await pool.promise().query(query, [id]);
        res.json(results);
    }catch(error){
        console.error('Error ejecutando la consulta:', error);
        return res.status(500).send('Error en el servidor.');
    }
}
function obtenerCantidadPorUbicacion(){
    return 'hola';
}
module.exports = router;