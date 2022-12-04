create database pizza;
use pizza;

create table `status`(
idStatus INT NOT NULL AUTO_INCREMENT, 
tipo varchar(100),
primary key(idStatus));

create table sabores(
idSabores INT NOT NULL AUTO_INCREMENT, 
nome varchar(100),
primary key(idSabores));

create table massas(
idMassas INT NOT NULL AUTO_INCREMENT, 
tipo varchar(100),
primary key(idMassas));

create table bordas(
idBordas INT NOT NULL AUTO_INCREMENT, 
tipo varchar(100),
primary key(idBordas));

create table pizza(
idPizza INT NOT NULL AUTO_INCREMENT,
idBordas int,
idMassas int,
foreign key(idBordas) references bordas(idBordas),
foreign key(idMassas) references massas(idMassas),
primary key(idPizza));

create table pizza_sabor(
idPizzaSabor INT NOT NULL AUTO_INCREMENT,
idPizza int,
idSabores int,
idUser int(10) unsigned,
foreign key(idSabores) references sabores(idSabores),
foreign key(idPizza) references pizza(idPizza),
foreign key (idUser) references usuario(idUser),
primary key(idPizzaSabor));

create table pedidos(
idPedidos INT NOT NULL AUTO_INCREMENT,
idPizza int,
idStatus int,
foreign key(idStatus) references status(idStatus),
foreign key(idPizza) references pizza(idPizza),
primary key(idPedidos)
);

CREATE TABLE `usuario` (
  `idUser` int(10) unsigned unique NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `email` varchar(90) unique NOT NULL,
  `password` varchar(255) NOT NULL,
  `type` varchar(20) NOT NULL,
  PRIMARY KEY (`idUser`)
) ENGINE=InnoDB;

CREATE TABLE `endereco` (
	id int NOT null auto_increment,
    idUser int(10) unsigned,
    rua varchar(100),
    numero int,
    bairro varchar(50),
    cidade varchar(50),
    cep int(8),
    estado varchar(2),
    complemento varchar(50),
    primary key (id),
    foreign key(idUser) references usuario(idUser)
) ENGINE=InnoDB;


insert into massas(tipo) values 
("Massa comum"), 
("Massa integral"), 
("Massa temperada");

insert into bordas(tipo) values 
("Cheddar"), 
("Catupiry"), 
("Chocolate");

insert into status(tipo) values 
("Em produção"), 
("Entrega"), 
("Concluído");

insert into sabores(nome) values
("4 queijos"), 
("Frango com Catupiry"),
("Calabresa"), ("Lombinho"), 
("Filé com Cheddar"), 
("Portuguesa"), 
("Margherita");






