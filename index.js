const express = require('express')
const app = express()
const mysql = require('mysql')
const port = process.env.PORT || 5001

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.get('/',(req,res) => {
    // res.send("Home route");
    res.render('index')
})

const connection = mysql.createConnection({
    host: 'localhost',
    password: '',
    user: 'root',
    database: 'formapp'
})

connection.connect();


connection.query('SELECT * FROM contact', (err,rows) => {
    console.log(rows);
})
app.set('view engine', 'ejs')

app.post('/create-form-data', (req,res) => {
    const {first_name, last_name, message} = req.body
    const SQL = "INSERT INTO contact (first_name, last_name, message) VALUES (?,?,?)"
    connection.query(SQL,[first_name, last_name, message],(err,row) => {
        if(err){
            console.log(err);
           
        }else{
            res.redirect('/?message=successful')
        }
    })
})

app.get('/view', (req, res) => {
    // Adatbázis lekérdezés
    const sqlQuery = 'SELECT * FROM contact ';
   
    connection.query(sqlQuery, (error, results, fields) => {
      if (error) throw error;
    
  
      // Eredmények kiíratása a böngészőbe
      let output = '<h1>Táblázat:</h1>';
      output += '<table border="1"><tr><th>Keresztnév</th><th>Vezetéknév</th></tr>';
     
      results.forEach((row) => {
        output += `<tr><td>${row.first_name}</td> <td>${row.last_name}</td></tr>`;
       
        // Itt az 'nev' a tábla oszlopainak nevére cserélendő
      });
  
        
      output += '</table>';
      res.send(output);
    });
  });
   
  
  

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
} )