
DROP TABLE IF EXISTS category;
CREATE TABLE IF NOT EXISTS category 
(
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	name VARCHAR(100) NOT NULL
);

DROP TABLE IF EXISTS ad;
CREATE TABLE ad 
(
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	title VARCHAR(100) NOT NULL,
	description TEXT,
	owner VARCHAR(100) NOT NULL,
	price INT,
    picture VARCHAR(100),
    location VARCHAR(100),
	createdAt DATE,
	category_id INT NOT NULL,
	FOREIGN KEY (category_id) REFERENCES category(id)
);

DELETE FROM ad;
DELETE FROM category;

insert into category (id, name) values 
(1, 'vêtement'),
(2, 'voiture'),
(3, 'autre');


insert into ad (title, description, owner, price, location, createdAt, category_id) 
values ('rollers', 'toujours eux, ils sont top', 'louis', 22, 'Montreuil sous bois', DATE('now'), 3);

insert into ad (title, description, owner, price, location, createdAt, category_id) 
values ('pull', 'il est troué, mais très stylé', 'louis', 222, 'Montreuil sous bois', DATE('2023-12-12'), 1);

insert into ad (title, description, owner, price, location, createdAt, category_id) 
values ('autre paire de rollers', 'toujours eux, ils sont top', 'louis', 22, 'Montreuil sous bois', DATE('now'), 3);

insert into ad (title, owner, price, location, createdAt, category_id) values ('Table de jardin', 'Thomas', 140, 'Paris', DATE('now'), 3);
insert into ad (title, owner, price, location, createdAt, category_id) values ('Peluche en forme de lapin', 'Pierre', 14, 'Bordeaux', DATE('2023-09-10'), 3);
insert into ad (title, owner, price, location, createdAt, category_id) values ('Voiture de course', 'Paul', 240, 'Lyon', DATE('2023-09-01') , 2);

