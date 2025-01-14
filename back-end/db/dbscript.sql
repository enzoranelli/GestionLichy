CREATE DATABASE LichyDB;
USE LichyDB;

CREATE TABLE Usuario(
	idUsuario INT AUTO_INCREMENT,
    nombre VARCHAR(200),
    email VARCHAR(200) UNIQUE,
    contrasena VARCHAR(200),
    tipoUsuario VARCHAR(100),
    PRIMARY KEY(idUsuario)
);

CREATE TABLE Proveedor(
	idProveedor INT AUTO_INCREMENT,
    nombre VARCHAR(100),
    PRIMARY KEY(idProveedor)
);

CREATE TABLE Contenedor(
	idContenedor INT,
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
    FOREIGN KEY(proveedor) REFERENCES Proveedor(idProveedor)
);

CREATE TABLE Producto(
	idProducto INT AUTO_INCREMENT,
    nombre VARCHAR(200),
    PRIMARY KEY(idProducto)
);

CREATE TABLE Color(
	idColor INT AUTO_INCREMENT,
    nombre VARCHAR(100),
    PRIMARY KEY(idColor)
);
CREATE TABLE estados(
	nombreEstado VARCHAR(100),
    PRIMARY KEY(nombreEstado)
);
CREATE TABLE ContenedorEstado(
	idEstado INT AUTO_INCREMENT,
    contenedor INT,
    estado VARCHAR(100),
    ubicacion VARCHAR(200),
    PRIMARY KEY(idEstado),
    FOREIGN KEY(contenedor) REFERENCES Contenedor(idContenedor),
    FOREIGN KEY(estado) REFERENCES estados(nombreEstado)
);

CREATE TABLE ContenedorProductos(
	idContenedorProductos INT AUTO_INCREMENT,
    contenedor INT, 
    producto INT,
    cantidad INT,
    unidad VARCHAR(100),
    color INT,
    PRIMARY KEY(idContenedorProductos),
    FOREIGN KEY(contenedor) REFERENCES Contenedor(idContenedor),
    FOREIGN KEY(producto) REFERENCES Producto(idProducto),
    FOREIGN KEY(color) REFERENCES Color(idColor)
);

