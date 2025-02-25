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
    PRIMARY KEY(idProducto)
);

CREATE TABLE Color(
	idColor INT AUTO_INCREMENT,
    nombre VARCHAR(100),
    PRIMARY KEY(idColor)
);
CREATE TABLE categorias(
	nombreCategoria VARCHAR(100),
    PRIMARY KEY(nombreCategoria)
);

CREATE TABLE Contenedor(
	idContenedor INT AUTO_INCREMENT,
    categoria VARCHAR(100),
    usuario INT,
    proveedor INT,
    comentario VARCHAR(300),
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
    color INT,
    PRIMARY KEY(idContenedorProductos),
    FOREIGN KEY(contenedor) REFERENCES Contenedor(idContenedor) ON DELETE CASCADE,
    FOREIGN KEY(producto) REFERENCES Producto(idProducto) ON DELETE CASCADE,
    FOREIGN KEY(color) REFERENCES Color(idColor) ON DELETE SET NULL
);

DROP TABLE ContenedorProductos;
DROP TABLE ContenedorEstado;
DROP TABLE estados;

DROP TABLE contenedor;
DROP TABLE proveedor;
DROP TABLE producto;
DROP TABLE color;

DROP TABLE usuario;





