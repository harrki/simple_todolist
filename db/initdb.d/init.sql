CREATE TABLE tasks
(
    id VARCHAR(256) NOT NULL PRIMARY KEY,
    name VARCHAR(256) NOT NULL,
    isFinished INT NOT NULL,
    deadline TIMESTAMP
)

