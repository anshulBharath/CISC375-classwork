let express = require('express');
let fs = require('fs');
let path = require('path');

let port = 8000;
let public_dir = path.join(__dirname, 'public');

let app = express();
app.use(express.static(public_dir));

app.get('/echo/:statement', (req, res) => {
    fs.readFile(path.join(__dirname, 'echo_template.html'), 'utf-8', (err, data)=> {
        if(err){
            res.status(404).send("Error: File Not Found");
        }
        else {
            let response = data.replace("{{{CONTENT HERE}}}", req.params.statement);
            res.status(200).type('html').send(response);
        }
    });
    //res.send('Echo: ' +req.params.statement)
});
  
app.listen(port, () => {
    console.log('Now listening on port ' + port);
});

app.get('/calc/add/:num1/:num2', (req, res) => {
    let num1 = parseInt(req.params.num1, 10);
    let num2 = parseInt(req.params.num2, 10);
    let result = num1 + num2;

    res.send(num1 + '+' + num2 + ' = ' + result);
    console.log(num1, num2)
});
    