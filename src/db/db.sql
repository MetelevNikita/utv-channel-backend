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
