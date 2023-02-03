const sqlite3 = require('sqlite3').verbose();
const express = require("express")
const sqlite = require("better-sqlite3")
const path = require('path');
const db = new sqlite(path.resolve("todo_app.db"), {fileMustExist: true});

const app = express()
app.use(express.json());



app.use( (req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
    next();
})


app.get("", async (req,res,next) => {
    res.json("Server page")
})

app.get("/get_tasks", async (req,res,next) => {
    let data = await db.prepare("SELECT * FROM tasks").all()
    console.log(data)
    res.json(data)
})

const port = process.env.PORT || 5000
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Api is running on port ${port}`)
    })
}


/*
let db = new sqlite3.Database('./todo_app.db', sqlite3.OPEN_READWRITE ,(err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the todo_app database.');
});

const lisattava = "tee jotain"

db.serialize(() => {
    db.run(`INSERT INTO tasks (item) VALUES ("${lisattava}")`)
})

db.serialize(() => {
  db.each(`SELECT * FROM tasks`, (err, row) => {
    if (err) {
      console.error(err.message);
    }
    console.log(row.id + "\t" + row.item);
  });
});

db.serialize(() => {
    db.run("DELETE FROM tasks WHERE id = 2", (err, row) => {
        if (err) {
            console.error(err.message);
        }
    });
})

db.serialize(() => {
  db.each(`SELECT * FROM tasks`, (err, row) => {
    if (err) {
      console.error(err.message);
    }
    console.log(row.id + "\t" + row.item);
  });
});

db.close((err) => {
    if (err) {
        console.error(err.message)
    }
    console.log("CLosed database connection")
})
*/