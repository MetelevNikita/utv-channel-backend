create TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);



create TABLE team (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  profession VARCHAR(255) NOT NULL,
  image VARCHAR(255) NOT NULL
);



create TABLE project  (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  image VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  duration INT NOT NULL,
  year INT NOT NULL,
  author VARCHAR(255) NOT NULL,
  channel VARCHAR(255) NOT NULL,
  trailer VARCHAR(255) NOT NULL
);


create TABLE program (
  id SERIAL PRIMARY KEY,
  image VARCHAR(255) NOT NULL,
  date VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  subtitle VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  link VARCHAR(255) NOT NULL
);



create TABLE news (

  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  lead VARCHAR(100) NOT NULL,
  author VARCHAR(255),
  date VARCHAR NOT NULL,
  video VARCHAR(255),
  text_1 VARCHAR,
  image_1 VARCHAR,
  image_comment_1 VARCHAR,
  comment_1 VARCHAR,
  text_2 VARCHAR,
  image_2 VARCHAR,
  image_comment_2 VARCHAR,
  comment_2 VARCHAR,
  text_3 VARCHAR,
  image_3 VARCHAR,
  image_comment_3 VARCHAR,
  comment_3 VARCHAR,
  text_4 VARCHAR,
  image_4 VARCHAR,
  image_comment_4 VARCHAR,
  comment_4 VARCHAR,
  text_5 VARCHAR,
  image_5 VARCHAR,
  image_comment_5 VARCHAR,
  comment_5 VARCHAR,
  text_6 VARCHAR,
  image_6 VARCHAR,
  image_comment_6 VARCHAR,
  comment_6 VARCHAR,
  text_7 VARCHAR,
  image_7 VARCHAR,
  image_comment_7 VARCHAR,
  comment_7 VARCHAR,
  text_8 VARCHAR,
  image_8 VARCHAR,
  image_comment_8 VARCHAR,
  comment_8 VARCHAR,
  text_9 VARCHAR,
  image_9 VARCHAR,
  image_comment_9 VARCHAR,
  comment_9 VARCHAR,
  text_10 VARCHAR,
  image_10 VARCHAR,
  image_comment_10 VARCHAR,
  comment_10 VARCHAR,
  tags VARCHAR(255) NOT NULL,
  views INT NOT NULL
  news_description BOOLEAN
);
