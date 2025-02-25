const express = require('express');
const router = express.Router();
const pool = require('../db/dbconfig');

router.get('/:id',obtenerProductoDeContenedor);
router.put('/:id',editarProductoDeContenedor);
router.delete('/:id',eliminarProductoDeContenedor);
router.post('/', agregarProductoDeContenedor);

async function obtenerProductoDeContenedor(req,res){
    try {
        const id = req.params.id;
        const query = `
        SELECT  idContenedorProductos,p.nombre,p.idProducto, cp.cantidad, cp.unidad,cp.precioPorUnidad, c.nombre AS color, c.idColor FROM ContenedorProductos  cp JOIN Producto p ON cp.producto = p.idProducto 
        LEFT JOIN color c ON cp.color = c.idColor
        WHERE cp.contenedor = ?; `;
        const [results] = await pool.promise().query(query, [id]);
        res.json(results);
    }catch(error){
        console.error('Error ejecutando la consulta:', error);
        return res.status(500).send('Error en el servidor.');
    }
}

async function agregarProductoDeContenedor(req,res){
    try {
        const {contenedor, producto,cantidad,unidad,color,precioPorUnidad} = req.body;
        const connection = pool;
        connection.query('INSERT INTO ContenedorProductos(contenedor,producto,cantidad,unidad,color,precioPorUnidad) VALUES(?,?,?,?,?,?);',[contenedor,producto,cantidad,unidad,color,precioPorUnidad],(err,results)=>{
            if(err){
                console.error('Error ejecutando la consulta:', err);
                return res.status(500).send('Error en el servidor.');
            }
            const query = `
                SELECT  idContenedorProductos,p.nombre,p.idProducto, cp.cantidad, cp.unidad,cp.precioPorUnidad, c.nombre AS color, c.idColor FROM ContenedorProductos  cp JOIN Producto p ON cp.producto = p.idProducto 
                LEFT JOIN color c ON cp.color = c.idColor
                WHERE cp.contenedor = ?; `;
            connection.query(query,[contenedor],(err,results)=>{
                if(err){
                    console.error('Error ejecutando la consulta:', err);
                    return res.status(500).send('Error en el servidor.');
                }
                res.json(results);
            });
        })
    } catch (error) {
        console.error('Error ejecutando la consulta:', error);
        return res.status(500).send('Error en el servidor.');
    }
}
async function editarProductoDeContenedor(req,res){
    try{
        const id =req.params.id;
        const {producto,cantidad,unidad,color,precioPorUnidad} = req.body;
        const query = `UPDATE ContenedorProductos SET
            producto = ?,
            cantidad = ?,
            unidad = ?,
            color=?,
            precioPorUnidad=?
            WHERE idContenedorProductos = ?;
        `
        const connection = pool;

        connection.query(query,[producto,cantidad,unidad,color,precioPorUnidad,id],(err,results)=>{
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
async function eliminarProductoDeContenedor(req,res){
    try{
        const id =req.params.id;
        const connection = pool;
        connection.query('DELETE FROM contenedorProductos WHERE idContenedorProductos = ? ',[id],(err,results)=>{
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
module.exports = router;