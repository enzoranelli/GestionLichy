const express = require('express');
const router = express.Router();
const pool = require('../db/dbconfig');

router.get('/:id',obtenerProductoDeContenedor);

async function obtenerProductoDeContenedor(req,res){
    try {
        const id = req.params.id;
        const query = `
        SELECT  idContenedorProductos,p.nombre, cp.cantidad, cp.unidad, c.nombre AS color FROM ContenedorProductos  cp JOIN Producto p ON cp.producto = p.idProducto 
        LEFT JOIN color c ON cp.color = c.idColor
        WHERE cp.contenedor = ?; `;
        const [results] = await pool.promise().query(query, [id]);
        res.json(results);
    }catch(error){
        console.error('Error ejecutando la consulta:', error);
        return res.status(500).send('Error en el servidor.');
    }
}
module.exports = router;