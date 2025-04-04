CREATE DATABASE LichyDB;
USE LichyDB;

CREATE TABLE Usuario(
	idUsuario INT AUTO_INCREMENT,
    nombre VARCHAR(200),
    email VARCHAR(200) UNIQUE,
    contrasena VARCHAR(200),
    tipoUsuario VARCHAR(100),
    permisos VARCHAR(500),
    PRIMARY KEY(idUsuario)
);

CREATE TABLE Proveedor(
	idProveedor INT AUTO_INCREMENT,
    nombre VARCHAR(100),
    PRIMARY KEY(idProveedor)
);

CREATE TABLE Producto(
	idProducto INT AUTO_INCREMENT,
    nombre VARCHAR(200),
    unidadPredeterminada ENUM('m','kg'),
    codigoInterno INT UNIQUE,
    tipoBultoPredeterminado ENUM('rollos','cajas'),
    PRIMARY KEY(idProducto)
);
ALTER TABLE Producto ADD COLUMN tipoBultoPredeterminado ENUM('rollos','cajas');
CREATE TABLE Color(
	idColor INT AUTO_INCREMENT,
    nombre VARCHAR(100),
    codigoInterno INT UNIQUE,
    PRIMARY KEY(idColor)
);

CREATE TABLE categorias(
	nombreCategoria VARCHAR(100),
    PRIMARY KEY(nombreCategoria)
);

CREATE TABLE ubicacion(
	nombreUbicacion VARCHAR(100),
    estado VARCHAR(100),
    FOREIGN KEY(estado) REFERENCES categorias(nombreCategoria) ON DELETE CASCADE,
    PRIMARY KEY(nombreUbicacion)
);
CREATE TABLE Contenedor(
	idContenedor INT AUTO_INCREMENT,
    categoria VARCHAR(100),
    usuario INT,
    proveedor INT,
    comentario VARCHAR(300),
    ubicacion VARCHAR(100),
    codigoContenedor VARCHAR(100),
    forwarder VARCHAR(100),
    sira VARCHAR(100),
    factura varchar(100),
    vep VARCHAR(100),
    PRIMARY KEY(idContenedor),
    FOREIGN KEY(proveedor) REFERENCES Proveedor(idProveedor) ON DELETE SET NULL,
    FOREIGN KEY(categoria) REFERENCES categorias(nombreCategoria)ON DELETE SET NULL
);

CREATE TABLE ContenedorEstado(
	idEstado INT AUTO_INCREMENT,
    contenedor INT,
    estado VARCHAR(100),
    ubicacion VARCHAR(200),
    fechaHora DATETIME DEFAULT CURRENT_TIMESTAMP,
    fechaManual DATE DEFAULT (CURRENT_DATE()),
    PRIMARY KEY(idEstado),
    FOREIGN KEY(contenedor) REFERENCES Contenedor(idContenedor) ON DELETE CASCADE
);

CREATE TABLE ContenedorProductos(
	idContenedorProductos INT AUTO_INCREMENT,
    contenedor INT, 
    producto INT,
    cantidad INT,
    unidad VARCHAR(100),
    precioPorUnidad FLOAT,
    item_proveedor VARCHAR(200),
    color INT,
    cantidadBulto INT,
    PRIMARY KEY(idContenedorProductos),
    tipoBulto ENUM ('rollos','cajas'),
    FOREIGN KEY(contenedor) REFERENCES Contenedor(idContenedor) ON DELETE CASCADE,
    FOREIGN KEY(producto) REFERENCES Producto(idProducto) ON DELETE CASCADE,
    FOREIGN KEY(color) REFERENCES Color(idColor) ON DELETE SET NULL
);

ALTER TABLE ContenedorProductos MODIFY COLUMN cantidadBulto INT;
ALTER TABLE ContenedorProductos ADD COLUMN tipoBulto ENUM ('rollos','cajas');

CREATE TABLE ContenedorProductosHistorial (
	idHistorial INT AUTO_INCREMENT,
    idContenedorProductos INT,
    contenedor INT,
    tipoCambio ENUM('UPDATE','DELETE','INSERT'),
    cambios TEXT,
    fechaCambio DATETIME DEFAULT CURRENT_TIMESTAMP,
    usuarioCambio INT,
    motivo VARCHAR(500),
    PRIMARY KEY(idHistorial),
    FOREIGN KEY(contenedor) REFERENCES Contenedor(idContenedor) ON DELETE CASCADE
);


DROP TABLE ContenedorProductos;
DROP TABLE ContenedorEstado;
DROP TABLE categorias;
DROP TABLE contenedorproductoshistorial;
DROP TABLE contenedor;
DROP TABLE proveedor;
DROP TABLE producto;
DROP TABLE color;
ALTER TABLE contenedorEstado ADD COLUMN fechaManual DATE DEFAULT (CURRENT_DATE()) ;
DROP TABLE usuario;
DROP TABLE ubicacion;
SELECT * FROM contenedorproductos;
ALTER TABLE contenedorproductos ADD COLUMN item_proveedor VARCHAR(200);
SELECT *  FROM PRODUCTO;
ALTER TABLE ContenedorProductos 
MODIFY COLUMN unidad ENUM('kg', 'm', 'un');
SELECT * FROM ubicacion;
ALTER TABLE Producto
MODIFY COLUMN unidadPredeterminada VARCHAR(10);

DELETE FROM producto WHERE idProducto > 1;

INSERT INTO Categorias (nombreCategoria) VALUES
('COMPRADO'),
('EMBARCADO'),
('ARRIBADO'),
('DEPOSITO NACIONAL'),
('EN STOCK'),
('ENTREGADO'),
('ANULADO');
INSERT INTO Ubicacion (nombreUbicacion, estado) VALUES
-- Estado COMPRADO
('FALTA DISPONER', 'COMPRADO'),
('DESARROLLO LD-SOFF', 'COMPRADO'),
('LD-SOFF LLEGARON', 'COMPRADO'),
('PRODUCCION', 'COMPRADO'),

-- Estado EMBARCADO
('BOOKING', 'EMBARCADO'),
('EMBARCADO', 'EMBARCADO'),

-- Estado ARRIBADO
('TERMINAL', 'ARRIBADO'),
('DF DASSA', 'ARRIBADO'),
('DF LOGISTICA CENTRAL', 'ARRIBADO'),
('PARA OFICIALIZAR', 'ARRIBADO'),
('PARA OFICIALIZAR HOY', 'ARRIBADO'),
('POR COORDINAR', 'ARRIBADO'),
('COORDINADO', 'ARRIBADO'),

-- Estado DEPOSITO NACIONAL
('ALTITUD', 'DEPOSITO NACIONAL'),
('MOREIRO', 'DEPOSITO NACIONAL'),
('OPEN CARGO', 'DEPOSITO NACIONAL'),
('LOGISTICA CENTRAL', 'DEPOSITO NACIONAL'),
('ULOG', 'DEPOSITO NACIONAL'),
('ALA', 'DEPOSITO NACIONAL'),

-- Estado EN STOCK
('MITRE', 'EN STOCK'),
('LAVALLE', 'EN STOCK'),

-- Estado ENTREGADO
('ENTREGADO', 'ENTREGADO'),

-- Estado ANULADO
('ANULADO', 'ANULADO');

SELECT * FROM producto;
ALTER TABLE producto
MODIFY COLUMN unidadPredeterminada ENUM('m','kg','uni');
SELECT * FROM contenedorestado WHERE contenedor = 8;


SELECT *
FROM contenedorestado
WHERE contenedor = ? 
ORDER BY fechaHora DESC
LIMIT 1;

SELECT * FROM contenedorproductoshistorial;
SELECT * FROM contenedorproductos cp JOIN contenedorestado ce ON cp.contenedor= ce.contenedor WHERE producto = 8;
SELECT cp.*, ce.estado, ce.ubicacion, ce.fechaHora
FROM contenedorproductos cp
JOIN (
    SELECT contenedor, estado, ubicacion, fechaHora
    FROM contenedorestado
    ORDER BY fechaHora DESC
    LIMIT 1
) ce ON cp.contenedor = ce.contenedor
WHERE cp.producto = 8;

SELECT * FROM contenedorestado ;

SELECT * FROM contenedorproductos WHERE producto = 8;

SELECT cp.*, ce.estado, ce.ubicacion, ce.fechaHora, ce.fechaManual
FROM contenedorproductos cp
JOIN contenedorestado ce ON cp.contenedor = ce.contenedor
JOIN (
    SELECT contenedor, MAX(fechaHora) AS max_fechaHora
    FROM contenedorestado
    GROUP BY contenedor
) ultimo_estado ON ce.contenedor = ultimo_estado.contenedor AND ce.fechaHora = ultimo_estado.max_fechaHora
WHERE cp.producto = 8;


SELECT cp.*, ce.estado, ce.ubicacion, ce.fechaHora, ce.fechaManual,SUM(COALESCE(cp.cantidad, 0)) AS total_cantidad
FROM contenedorproductos cp
JOIN contenedorestado ce ON cp.contenedor = ce.contenedor
JOIN (
    SELECT contenedor, MAX(fechaHora) AS max_fechaHora
    FROM contenedorestado
    GROUP BY contenedor
) ultimo_estado ON ce.contenedor = ultimo_estado.contenedor AND ce.fechaHora = ultimo_estado.max_fechaHora
WHERE cp.producto = 1 
group by cp.producto, cp.color, cp.unidad;

SELECT 
    cp.producto,
    cp.color,
    cp.unidad,
    ce.estado,
    ce.ubicacion,
    SUM(COALESCE(cp.cantidad, 0)) AS total_cantidad
FROM 
    contenedorproductos cp
JOIN 
    contenedorestado ce ON cp.contenedor = ce.contenedor
JOIN (
    SELECT 
        contenedor, 
        MAX(fechaHora) AS max_fechaHora
    FROM 
        contenedorestado
    GROUP BY 
        contenedor
) ultimo_estado ON ce.contenedor = ultimo_estado.contenedor AND ce.fechaHora = ultimo_estado.max_fechaHora
WHERE 
    cp.producto = 1
GROUP BY 
    cp.producto, 
    cp.color, 
    cp.unidad, 
    ce.estado, 
    ce.ubicacion;


SELECT cp.*, ce.estado, ce.ubicacion, ce.fechaHora, ce.fechaManual
FROM contenedorproductos cp
JOIN contenedorestado ce ON cp.contenedor = ce.contenedor
JOIN (
    SELECT contenedor, MAX(fechaHora) AS max_fechaHora
    FROM contenedorestado
    GROUP BY contenedor
) ultimo_estado ON ce.contenedor = ultimo_estado.contenedor AND ce.fechaHora = ultimo_estado.max_fechaHora
WHERE cp.producto = 1 AND ce.estado LIKE '%';