const express = require('express');
const router = express.Router();
const pool = require('../db/dbconfig');

router.get('/producto/:id',obtenerProductoContenedor);
router.get('/:id',obtenerProductosDeContenedor);
router.put('/:id',editarProductoDeContenedor);
router.delete('/:id',eliminarProductoDeContenedor);
router.post('/', agregarProductoDeContenedor);

async function obtenerProductoContenedor(req,res){
    try{
        const id = req.params.id;
        const query = `
        SELECT  idContenedorProductos,p.nombre,p.idProducto, cp.cantidad, cp.unidad,cp.precioPorUnidad, c.nombre AS color,cp.contenedor, c.idColor FROM ContenedorProductos  cp JOIN Producto p ON cp.producto = p.idProducto 
        LEFT JOIN color c ON cp.color = c.idColor
        WHERE idContenedorProductos = ?; 
        `
        const [results] = await pool.promise().query(query, [id]);
        res.json(results);
    }catch(error){
        console.error('Error ejecutando la consulta:', error);
        return res.status(500).send('Error en el servidor.');
    }
}
async function obtenerProductosDeContenedor(req,res){
    try {
        const id = req.params.id;
        const query = `
        SELECT  idContenedorProductos,p.nombre,p.idProducto, cp.cantidad, cp.unidad,cp.precioPorUnidad, c.nombre AS color,cp.contenedor, c.idColor FROM ContenedorProductos  cp JOIN Producto p ON cp.producto = p.idProducto 
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
   const connection = pool;
  
    try{
     
        const id =req.params.id;
        const {producto,cantidad,unidad,color,contenedor,precioPorUnidad,coloresAsignados} = req.body;
        console.log(coloresAsignados);
        if (coloresAsignados && coloresAsignados.length > 0) {
            for (const colorAsignado of coloresAsignados) {
                const insertQuery = `
                    INSERT INTO ContenedorProductos (contenedor, producto, cantidad, unidad, color, precioPorUnidad)
                    VALUES (?, ?, ?, ?, ?, ?);
                `;
                await connection.promise().query(insertQuery, [
                    contenedor, // contenedor (usamos el mismo contenedor)
                    producto, // producto (el mismo producto)
                    colorAsignado.cantidad, // cantidad asignada al color
                    unidad, // unidad (la misma unidad)
                    colorAsignado.color, // color asignado
                    precioPorUnidad, // precio por unidad (el mismo)
                ]);
            }
           
        }      
        if(cantidad === 0){
            await connection.promise().query('DELETE FROM contenedorProductos WHERE idContenedorProductos = ? ',[id],(err,results)=>{
                if(err){
                    console.error('Error ejecutando la consulta:', err);
                    return res.status(500).send('Error en el servidor.');
                }
                
        })
      
        }else{
            const query = `UPDATE ContenedorProductos SET
            producto = ?,
            cantidad = ?,
            unidad = ?,
            color=?,
            precioPorUnidad=?
            WHERE idContenedorProductos = ?;
        `
            await connection.promise().query(query,[producto,cantidad,unidad,color,precioPorUnidad,id],(err,results)=>{
                if(err){
                    console.error('Error ejecutando la consulta:', err);
                    return res.status(500).send('Error en el servidor.');
                }        
            })
            obtenerProductos = true
        } 
        const consulta = ` SELECT c.idContenedorProductos, p.nombre, c.cantidad, c.unidad, c.precioPorUnidad, co.nombre AS color, co.idcolor
        FROM ContenedorProductos c JOIN producto p ON c.producto = idProducto 
        LEFT JOIN color co ON c.color = co.idColor 
        WHERE contenedor = ?`
        const [results]= await pool.promise().query(consulta, [contenedor]);
        console.log(results);
        res.json(results);
        
        
        
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