import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;
const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "world",
    password: "151201",
    port: 5432,
});

db.connect();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get("/", async(req, res) => {
   const result = await db.query("SELECT * FROM items");
   // console.log(result.rows);

   res.render("index.ejs", {
    todos: result.rows
   });
});

app.post("/add", async(req, res) => {
   const input = req.body["todo"];
   console.log(input);
   const result = await db.query("INSERT INTO items (item) VALUES ($1)", [input])
   res.redirect("/");
});

//Successfully Inserted data

app.post("/edit", async(req, res) => {
   const item = req.body.updateItem;
   const id = req.body.updateId;
   console.log(`id is, ${id}`);
   console.log(`item is ${item}`);
   const result = await db.query("UPDATE items SET item = ($1)  WHERE id = $2", [item, id]);
   res.redirect("/");
});

app.post("/delete", async(req, res) => {
   // const id = req.body.deleteIt;
   // ye wali liye toh undefined aara
   const id = req.body.deleteItem;
   // now this is working fyn
   console.log("ye hai id:", id);
   console.log("Bhai nakko nakko.....khatam gaya delete hogaya mai");
    // Check if input has a valid value
    if (id) {
      try {
         await db.query("DELETE FROM items WHERE id = $1", [id]);
      } catch (error) {
          console.log("Error deleting item:", error);
      }
  } else {
      console.log("Invalid input: empty deleteItem value");
  }
   res.redirect("/");
});

app.listen(3000, () => {
   console.log(`server is running on port ${port}`);
});