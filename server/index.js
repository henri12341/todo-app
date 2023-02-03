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

app.get("/tasks", async (req,res,next) => {
    let data = await db.prepare("SELECT * FROM tasks").all()
    console.log(data)
    res.json(data)
})

app.delete("/tasks", async (req,res,next) => {
    const {id, task} = req.body;

    db.exec(`DELETE FROM tasks WHERE id=${id}`)
    return res.status(200).json("deleted")
})

app.post("/tasks", async (req,res,next) => {
    const {task} = req.body
    db.exec(`INSERT INTO tasks (item) VALUES ('${task}')`)
    res.status(201).json({newTask: task})
})

app.patch("/tasks", async (req,res,next) => {
    const {id, task} = req.body;
    console.log("patch")
    console.log(id)
    console.log(task)
    db.exec(`UPDATE tasks SET item = '${task}' WHERE id = '${id}'`)
    res.status(200).json("success")
})

const port = process.env.PORT || 5000
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Api is running on port ${port}`)
    })
}
