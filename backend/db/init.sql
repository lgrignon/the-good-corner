

CREATE TABLE IF NOT EXISTS ad 
(
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	title VARCHAR(100) NOT NULL,
	description TEXT,
	owner VARCHAR(100) NOT NULL,
	price INT,
    picture VARCHAR(100),
    location VARCHAR(100),
	createdAt DATE
);

DELETE FROM ad;

insert into ad (title, description, owner, price, location, createdAt) values ('rollers', 'toujours eux, ils sont top', 'louis', 22, 'Montreuil sous bois', DATE('now') );
insert into ad (title, description, owner, price, location, createdAt) values ('pull', 'il est troué, mais très stylé', 'louis', 222, 'Montreuil sous bois', DATE('2023-12-12') );
insert into ad (title, description, owner, price, location, createdAt) values ('autre paire de rollers', 'toujours eux, ils sont top', 'louis', 22, 'Montreuil sous bois', DATE('now') );
insert into ad (title, owner, price, location, createdAt) values ('Table de jardin', 'Thomas', 140, 'Paris', DATE('now') );
insert into ad (title, owner, price, location, createdAt) values ('Peluche en forme de lapin', 'Pierre', 14, 'Bordeaux', DATE('2023-09-10'));
insert into ad (title, owner, price, location, createdAt) values ('Meuble', 'Paul', 240, 'Lyon', DATE('2023-09-01') );

