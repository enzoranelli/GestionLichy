const express = require('express');
const router = express.Router();
const pool = require('../db/dbconfig');

router.get('/',obtenerContenedores);
router.post('/', agregarContenedor);
router.get('/contenedorEstado',obtenerContenedorEstado);
router.get('/contenedor-detalle/:id',obtenerContenedorDetalle);
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

        const {idContenedor, usuario, proveedor,categoria,factura, codigoContenedor, forwarder,sira,vep} = req.body;
        const connection = pool;
        console.log(req.body);
        if(!idContenedor || !usuario || !proveedor){    
            return res.status(400).send('Faltan campos obligatorios');
        }
        connection.query('INSERT INTO Contenedor (idContenedor, usuario, proveedor,categoria,factura, codigoContenedor, forwarder,sira,vep) VALUES (?,?,?,?,?,?,?,?,?)',[idContenedor, usuario, proveedor,categoria,factura, codigoContenedor, forwarder,sira,vep],(err,results)=>{
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
async function obtenerContenedorEstado(req,res) {
    try {
        const query = `
        SELECT  c.idContenedor,c.categoria,p.nombre,ce.idEstado,ce.estado,ce.ubicacion
        FROM Contenedor c LEFT JOIN ContenedorEstado ce ON c.idContenedor = ce.contenedor
        INNER JOIN Proveedor p ON p.idProveedor = c.proveedor;  `;
        const [results] = await pool.promise().query(query, [req.params.estado]);
        res.json(results);
    } catch (error) {
        console.error('Error ejecutando la consulta:', error);
        return res.status(500).send('Error en el servidor.');
    }
}

async function obtenerContenedorDetalle(req,res){
    try {
        const id = req.params.id;
        const query = `
        SELECT  *
        FROM Contenedor c LEFT JOIN ContenedorEstado ce ON c.idContenedor = ce.contenedor
        INNER JOIN Proveedor p ON p.idProveedor = c.proveedor
        WHERE idContenedor = ?;  `;
        const [results] = await pool.promise().query(query, [id]);
        res.json(results);
    } catch (error) {
        console.error('Error ejecutando la consulta:', error);
        return res.status(500).send('Error en el servidor.');
    }
}
module.exports = router;