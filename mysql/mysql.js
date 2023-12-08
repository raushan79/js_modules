const mysql = require('mysql2');



// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
//   database: 'your_database_name',
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
  
  // You can perform database queries here
  // For example, you can run a query like this:

});

connection.query('SHOW DATABASES', (error, result)=>{
    console.log(result)
})

