CREATE TABLE tasks
(
    id VARCHAR(256) NOT NULL PRIMARY KEY,
    isFinished INT NOT NULL,
    task_name VARCHAR(256) NOT NULL,
    task_text TEXT,
    deadline VARCHAR(256)
);

INSERT INTO tasks VALUES ("test_id",0,"test_name","test_description","2021-1-1");