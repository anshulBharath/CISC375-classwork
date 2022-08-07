const { application } = require('express');
let express = require('express');
let fs = require('fs');
let path = require('path');
let sqlite3 = require('sqlite3');

let port = 8000;
let public_dir = path.join(__dirname, 'public');

let app = express();
app.use(express.json());
app.use(express.static(public_dir));

let db = new sqlite3.Database(path.join(__dirname, 'db', 'cereal.sqlite3'), sqlite3.OPEN_READWRITE, (err) =>{
    if (err){
        console.log(err);
    }
    else {
        console.log("Connected to database");
    }
});

app.get('/:mfr', (req, res) => {
    fs.readFile(path.join(__dirname, 'cereal_template.html'), 'utf-8', (err, data)=> {
        if(err){
            res.status(404).send("Error: File Not Found");
        }
        else { 
            let response = data.replace("{{{MANUFACTURER HERE}}}", req.params.mfr);
            

            db.all('SELECT name FROM cereals WHERE mfr = ?', [req.params.mfr[0]], (err, rows) =>{
                let list_items = '';
                for(var i=0; i<rows.length; i++){
                    list_items += '<li>' +rows[i].name+'</li>\n'
                }
                response = response.replace("{{{CEREAL HERE}}}", list_items);
                res.status(200).type('html').send(response);
            });
            
        }
    });
});

app.get('/api/cereal/:mfr', (req, res) =>{
        db.get('SELECT * FROM Manufacturers WHERE UPPER(name) = ?', [req.params.mfr.toUpperCase()], (err, rows) => {
            db.all('SELECT * FROM cereals WHERE mfr = ?', [rows.id], (err, rows) =>{
                res.status(200).type('json').send(rows)
            });
        });
});

app.get('/api/mfr', (req, res) =>{
    db.all('Select * FROM Manufacturers', (err, rows) =>{
        res.status(200).type('json').send(rows)
    });
});

app.post('/api/mfr', (req, res) =>{
    console.log(req.body);
    
    db.get('SELECT * FROM Manufacturers WHERE id = ?', [req.body.id], (err, row) =>{
        if(err || row !== undefined){
            res.status(500).type('txt').send('Error, could not send Manufacturers');
        }
        else{
            db.run('INSERT INTO Manufacturers (id, name) VALUES (?,?)', [req.body.id, req.body.name], (err) => {
                res.status(200).type('txt').send('Success');
            })
        }
    });
});

app.post('/api/cereal', (req, res) =>{
    console.log(req.body);
});
  
app.listen(port, () => {
    console.log('Now listening on port ' + port);
});
