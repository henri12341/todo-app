const sqlite3 = require('sqlite3').verbose();

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