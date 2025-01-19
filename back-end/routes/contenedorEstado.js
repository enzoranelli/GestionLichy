const express = require('express');
const router = express.Router();
const pool = require('../db/dbconfig');

router.get('/:id',obtenerContenedorEstado);

async function obtenerContenedorEstado(req,res){
    try{
        const idContenedor = req.params.id;
        const [results] = await pool.promise().query(`SELECT * FROM ContenedorEstado WHERE contenedor = ?  ORDER BY idEstado Desc;`,[idContenedor]);
        res.json(results);
    }catch(error){
        console.error('Error ejecutando la consulta:', error);
        return res.status(500).send('Error en el servidor.');
    }
}

module.exports = router;