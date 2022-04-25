CREATE TABLE IF NOT EXISTS instituicao (
    id INT NOT NULL AUTO_INCREMENT,
    nome_instituicao VARCHAR(45) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS AreaConhecimento (
    id INT NOT NULL AUTO_INCREMENT,
    nome_area VARCHAR(45) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS CorProva (
    id INT NOT NULL AUTO_INCREMENT,
    Cor VARCHAR(10) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS anoprova (
    id INT NOT NULL AUTO_INCREMENT,
    Ano VARCHAR(45) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS materia (
    id INT NOT NULL AUTO_INCREMENT,
    NomeMateria VARCHAR(50) NOT NULL,
    id_AreaConhecimento INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_AreaConhecimento) REFERENCES AreaConhecimento(id)
);

create table if not exists questoes(
    id INT NOT NULL AUTO_INCREMENT,
    numero_questao INT NOT NULL,
    id_Materia INT NOT NULL,
    id_CorProva INT NOT NULL,
    id_AnoProva INT NOT NULL,
    id_instituicao int not null,
    textoprincipal VARCHAR(1650) NOT NULL,
    textoquestao VARCHAR(300) NOT NULL,
    Img_Top VARCHAR(500) NULL DEFAULT NULL,
    Img_Central VARCHAR(500) NULL DEFAULT NULL,
    Img_Final VARCHAR(500) NULL DEFAULT NULL,
    alternativa_A VARCHAR(500) NOT NULL,
    alternativa_B VARCHAR(500) NOT NULL,
    alternativa_C VARCHAR(500) NOT NULL,
    alternativa_D VARCHAR(500) NOT NULL,
    alternativa_E VARCHAR(500) NOT NULL,
    gabarito VARCHAR(1) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_Materia) references materia(id),
    FOREIGN KEY (id_CorProva) references CorProva(id),
    FOREIGN KEY (id_anoprova) references anoprova(id),
    FOREIGN KEY (id_instituicao) references instituicao(id)
);

CREATE TABLE IF NOT EXISTS tipo_cargo (
    id INT NOT NULL AUTO_INCREMENT,
    nome_cargo VARCHAR(45) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS usuario (
    id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL,
    cpf BIGINT(20) NOT NULL,
    telefone INT(11) NOT NULL,
    senha VARCHAR(45) NOT NULL,
    id_tipo_cargo INT NULL DEFAULT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_tipo_cargo) REFERENCES tipo_cargo(id)
);

CREATE TABLE IF NOT EXISTS simulados(
    id INT NOT NULL,
    id_questoes int NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_questoes) REFERENCES questoes(id)
);

CREATE TABLE IF NOT EXISTS simulados_aluno (
    id INT NOT NULL AUTO_INCREMENT,
    id_simulado INT NOT NULL,
    id_usuario INT NOT NULL,
    data_inicio DATETIME NOT NULL,
    data_final DATETIME NOT NULL,
    duracao DATETIME NOT NULL,
    nota_geral INT NOT NULL,
    nota_ch INT NOT NULL,
    nota_cn INT NOT NULL,
    nota_lc INT NOT NULL,
    nota_mt INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id),
    FOREIGN KEY (id_simulado) REFERENCES simulados(id)
);
-- inserts 
insert into AreaConhecimento(nome_area)
values ('Ciências Humanas e suas Tecnologias'),
    ('Ciências da Natureza e suas Tecnologias'),
    ('Linguagens, Códigos e suas Tecnologias'),
    ('Matemática e suas Tecnologias');
insert into materia(Nomemateria, id_areaconhecimento)
values ('História', 1),
    ('Geografia', 1),
    ('Filosofia', 1),
    ('Sociologia', 1),
    ('Física', 2),
    ('Química', 2),
    ('Biologia', 2),
    ('Língua Portuguesa', 3),
    ('Língua Estrangeira', 3),
    ('Literatura', 3),
    ('Educação Física', 3),
    ('Tecnologias da Informação e Comunicação', 3),
    ('Artes', 3),
    ('Matemática', 4);
insert into corprova(Cor)
values ('Azul'),
    ('Amarelo'),
    ('Branco'),
    ('Rosa'),
    ('Laranja'),
    ('Verde'),
    ('Cinza');
insert into anoprova(Ano)
values ('2000'),
    ('2001'),
    ('2002'),
    ('2003'),
    ('2004'),
    ('2005'),
    ('2006'),
    ('2007'),
    ('2008'),
    ('2009'),
    ('2010'),
    ('2011'),
    ('2012'),
    ('2013'),
    ('2014'),
    ('2015'),
    ('2016'),
    ('2017'),
    ('2018'),
    ('2019'),
    ('2020'),
    ('2021'),
    ('2022'),
    ('2023'),
    ('2024'),
    ('2025'),
    ('2026'),
    ('2027'),
    ('2028'),
    ('2029'),
    ('2030');
insert into instituicao(nome_instituicao)
values ('INEP'),
    ('UNICAMP');
-- ADM ou Aluno insert tem que ser realizado pelo postman para tem o hash
insert into usuario(nome, email, cpf, telefone, senha, id_tipo_cargo)
values (
        'Pedro Paulo Messias Lins',
        "pedropaulolins9@gmail.com",
        70704103443,
        988508897,
        "123456789",
        2
    );
insert into usuario(nome, email, cpf, telefone, senha)
values (
        'Juan Pablo Melo de Lima',
        "juam.euzin@gmail.com",
        13708022424,
        981160117,
        "nasahacker",
        
    );

    insert into simulados(id_tipo_simulado, id_usuario, data_inicio, data_final, duracao, nota_geral, status)
values (8, 4, 1604, 1560, 0006, 200, true);

    insert into questoes(numero_questao, id_Materia, id_CorProva, id_AnoProva, id_instituicao, textoprincipal, textoquestao, alternativa_A, alternativa_B, alternativa_C, alternativa_D, alternativa_E, gabarito) 
values
  (11, 8, 1, 21, 1,'Na sua imaginação perturbada sentia a natureza toda agitando-se para sufocá-la. Aumentavam as sombras. No céu, nuvens colossais e túmidas rolavam para o abismo do horizonte… Na várzea, ao clarão indeciso do crepúsculo, os seres tomavam ares de monstros… As montanhas, subindo ameaçadoras da terra, perfilavam-se tenebrosas… Os caminhos, espreguiçando-se sobre os campos, animavam-se quais serpentes infinitas… As árvores soltas choravam ao vento, como carpideiras fantásticas da natureza morta… Os aflitivos pássaros noturnos gemiam agouros com pios fúnebres. Maria quis fugir, mas os membros cansados não acudiam aos ímpetos do medo e deixavam-na prostrada em uma angústia desesperada.', 'No trecho, o narrador mobiliza recursos de linguagem que geram uma expressividade centrada na percepção da', 'relação entre a natureza opressiva e o desejo de libertação da personagem.', 'confluência entre o estado emocional da personagem e a configuração da paisagem.', 'prevalência do mundo natural em relação à fragilidade humana.', 'depreciação do sentido da vida diante da consciência da morte iminente.', 'instabilidade psicológica da personagem face à realidade hostil.', 'b');


-- select com inner

select usuario.nome, tipo_simulado.nome, nota_geral, duracao from simulados
 inner join usuario
 on simulados.id_usuario = usuario.id
 inner join tipo_simulado
 on simulados.id_tipo_simulado = tipo_simulado.id
 where id_usuario = 4

--  SELECT usuario.nome, tipo_simulado.nome, nota_geral, duracao from simulados
--               INNER JOIN usuario
--               ON simulados.id_usuario = usuario.id
--               INNER JOIN tipo_simulado
--               ON simulados.id_tipo_simulado = tipo_simulado.id
--               WHERE id_usuario = 4