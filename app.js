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

app.get("/", (req, res) => {
   res.render("index.ejs");
});

app.post("/add", async(req, res) => {
   const data = req.body;
   console.log(data);
   res.redirect("/");
});

app.post("/edit", (req, res) => {

});

app.post("/delete", (req, res) => {

});

app.listen(3000, () => {
   console.log(`sserver is running on port ${port}`);
});