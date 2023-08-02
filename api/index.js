import express from "express";
import mysql from "mysql2";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const db = mysql.createConnection(process.env.DATABASE_URL);

// const mysql_pool = await mysql.createPool(process.env.DATABASE_URL);

app.use(express.json());
app.use(cors());

app.get("/api/topics", (req, res) => {
  const q = "SELECT * FROM topic";
  db.query(q, (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data);
    }
  });

  // mysql_pool.getConnection(function (err, connection) {
  //   const q = "SELECT * FROM topic";

  //   if (err) {
  //     connection.release();
  //     console.log("Error getting mysql_pool connection: " + err);
  //     throw err;
  //   }

  //   connection.query(q, (err, data) => {
  //     if (err) {
  //       return res.json(err);
  //     } else {
  //       return res.json(data);
  //     }
  //   });
  //   console.log("mysql_pool.release()");
  //   connection.release();
  // });
});

app.post("/api/topics", (req, res) => {
  const q = "INSERT INTO topic (`name`) VALUES (?)";
  const values = [req.body.name];

  // mysql_pool.getConnection(function (err, connection) {
  //   const q = "INSERT INTO topic (`name`) VALUES (?)";
  //   const values = [req.body.name];
  //   if (err) {
  //     connection.release();
  //     console.log(`Error getting mysql_pool connection: ${err}`);
  //     throw err;
  //   }

  //   connection.query(q, [values], (err, data) => {
  //     if (err) {
  //       return res.json(err);
  //     } else {
  //       return res.json(`Successfully added the ${values}`);
  //     }
  //   });
  //   console.log("mysql_pool.release()");
  //   connection.release();
  // });

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json(`Successfully added the ${values}`);
  });
});

app.delete("/api/topics/:id", (req, res) => {
  const topicId = req.params.id;
  const q = "DELETE FROM topic WHERE id = ?";
  db.query(q, [topicId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Topic has been deleted successfully.");
  });
  // mysql_pool.getConnection(function (err, connection) {
  //   const topicId = req.params.id;
  //   const q = "DELETE FROM topic WHERE id = ?";
  //   if (err) {
  //     connection.release();
  //     console.log(`Error getting mysql_pool connection: ${err}`);
  //     throw err;
  //   }
  //   connection.query(q, [topicId], (err, data) => {
  //     if (err) return res.json(err);
  //     return res.json("Book has been deleted successfully.");
  //   });
  //   console.log("mysql_pool.release()");
  //   connection.release();
  // });
});

app.put("/api/topics/:id", (req, res) => {
  const topicId = req.params.id;
  const q = "UPDATE topic SET `name` = ? WHERE id = ?";
  const values = [req.body.name];
  db.query(q, [values, topicId], (err, data) => {
    if (err) return res.json(err);
    return res.json(`T has been updated successfully.`);
  });
  // mysql_pool.getConnection((err, connection) => {
  //   const topicId = req.params.id;
  //   const q = "UPDATE topic SET `name` = ? WHERE id = ?";
  //   const values = [req.body.name];
  //   console.log("####################################");
  //   console.log(topicId);
  //   console.log(values);
  //   if (err) {
  //     connection.release();
  //     console.log(`Error getting mysql_pool connection: ${err}`);
  //     throw err;
  //   }
  //   connection.query(q, [values, topicId], (err, data) => {
  //     if (err) return res.json(err);
  //     return res.json(`T has been updated successfully.`);
  //   });
  //   console.log("mysql_pool.release()");
  //   connection.release();
  // });
});

app.post("/api/posts", (req, res) => {
  const q =
    "INSERT INTO post (`category`, `topic`, `title`, `summary`, `coverPhoto`, `isFeatured`, `content`, `status`, `visibility`) VALUES (?)";
  const values = [
    req.body.category,
    req.body.topic,
    req.body.title,
    req.body.summary,
    req.body.coverPhoto,
    req.body.isFeatured,
    req.body.content,
    req.body.status,
    req.body.visibility,
  ];
  db.query(q, [values], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(`Successfully added the post!`);
    }
  });
  // mysql_pool.getConnection((err, connection) => {
  //   const q =
  //     "INSERT INTO post (`category`, `topic`, `title`, `summary`, `coverPhoto`, `isFeatured`, `content`, `status`, `visibility`) VALUES (?)";
  //   const values = [
  //     req.body.category,
  //     req.body.topic,
  //     req.body.title,
  //     req.body.summary,
  //     req.body.coverPhoto,
  //     req.body.isFeatured,
  //     req.body.content,
  //     req.body.status,
  //     req.body.visibility,
  //   ];
  //   if (err) {
  //     connection.release();
  //     console.log(`Error getting mysql_pool connection: ${err}`);
  //     throw err;
  //   }
  //   connection.query(q, [values], (err, data) => {
  //     if (err) {
  //       return res.json(err);
  //     } else {
  //       return res.json(`Successfully added the post!`);
  //     }
  //   });
  //   console.log("mysql_pool.release()");
  //   connection.release();
  // });
});

app.listen(8800, () => {
  console.log("Connected to backend!");
});
