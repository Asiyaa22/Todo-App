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

app.post("/edit", (req, res) => {

});

app.post("/delete", (req, res) => {

});

app.listen(3000, () => {
   console.log(`server is running on port ${port}`);
});