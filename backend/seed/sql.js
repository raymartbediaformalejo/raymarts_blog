export const createPostTableSQL = `CREATE TABLE IF NOT EXISTS post (
  id int(11) NOT NULL AUTO_INCREMENT,
  category varchar(100) DEFAULT NULL,
  topic longtext DEFAULT NULL,
  title varchar(100) DEFAULT NULL,
  summary varchar(500) DEFAULT NULL,
  coverPhoto varchar(300) DEFAULT NULL,
  isFeatured varchar(100) DEFAULT NULL,
  content longtext DEFAULT NULL,
  status varchar(50) DEFAULT NULL,
  visibility varchar(50) DEFAULT NULL,
  PRIMARY KEY (id)
)`;

export const createTopicTableSQL = `CREATE TABLE IF NOT EXISTS topic (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL,
  PRIMARY KEY (id)
)`;
