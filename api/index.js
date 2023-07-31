import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   database: "blog",
// });

const mysql_pool = mysql.createPool({
  connectionLimit: 100,
  host: "localhost",
  user: "root",
  database: "blog",
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("hello this is the backend");
});

app.get("/topics", (req, res) => {
  const q = "SELECT * FROM topic";
  // db.query(q, (err, data) => {
  //   if (err) {
  //     return res.json(err);
  //   } else {
  //     return res.json(data);
  //   }
  // });

  mysql_pool.getConnection(function (err, connection) {
    const q = "SELECT * FROM topic";

    if (err) {
      connection.release();
      console.log("Error getting mysql_pool connection: " + err);
      throw err;
    }

    connection.query(q, (err, data) => {
      if (err) {
        return res.json(err);
      } else {
        return res.json(data);
      }
      console.log("mysql_pool.release()");
      connection.release();
    });
  });
});

app.post("/topics", (req, res) => {
  const q = "INSERT INTO topic (`name`) VALUES (?)";
  const values = [req.body.name];
  console.log("###################################");
  console.log(values);

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json(`Successfully added the ${values}`);
  });
});

app.delete("/topics/:id", (req, res) => {
  const topicId = req.params.id;
  const q = "DELETE FROM topic WHERE id = ?";

  db.query(q, [topicId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been deleted successfully.");
  });
});

app.put("/topics/:id", (req, res) => {
  const topicId = req.params.id;
  const q = "UPDATE topic SET `name` = ? WHERE id = ?";

  const values = [req.body.name];
  console.log("###################################");
  console.log(values);
  console.log(topicId);

  db.query(q, [values, topicId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been updated successfully.");
  });
});

app.listen(8800, () => {
  console.log("Connected to backend!");
});
