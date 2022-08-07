let express = require('express');
let fs = require('fs');
let path = require('path');
let sqlite3 = require('sqlite3');

let port = 8000;
let public_dir = path.join(__dirname, 'public');

let app = express();
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
  
app.listen(port, () => {
    console.log('Now listening on port ' + port);
});
