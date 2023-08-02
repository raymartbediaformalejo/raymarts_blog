import express from "express";
import mysql from "mysql2";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
// const corsOptions = {
//   // origin: "https://raymartformalejoblog.vercel.app",
//   // origin: "http://localhost:5173",

//   origin: "*",
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true, //access-control-allow-credentials:true
//   // optionSuccessStatus: 200,
// };
const corsOptions = (req, res, next) => {
  // Allow requests from all origins (*), you can change this to your specific client URL if needed
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
};
const db = mysql.createConnection(process.env.DATABASE_URL);

app.use(express.json());
// Use cors with the specified options
app.use(cors(corsOptions));

// Set Access-Control-Allow-Methods header
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

app.get("/api/topics", (req, res) => {
  const q = "SELECT * FROM topic";
  db.query(q, (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data);
    }
  });
});

app.get("/api/posts", (req, res) => {
  const q = "SELECT * FROM post";
  db.query(q, (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data);
    }
  });
});

app.post("/api/topics", (req, res) => {
  const q = "INSERT INTO topic (`name`) VALUES (?)";
  const values = [req.body.name];

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
});

app.put("/api/topics/:id", (req, res) => {
  const topicId = req.params.id;
  const q = "UPDATE topic SET `name` = ? WHERE id = ?";
  const values = [req.body.name];
  db.query(q, [values, topicId], (err, data) => {
    if (err) return res.json(err);
    return res.json(`T has been updated successfully.`);
  });
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
});

// app.listen(8800, () => {
//   console.log("Connected to backend!");
// });

// app.listen(() => {
//   console.log("Connected to backend!");
// });

export default app;
