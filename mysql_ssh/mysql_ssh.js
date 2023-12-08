require("dotenv").config();
const mysql = require("mysql2");
const { Client } = require("ssh2");
const sshClient = new Client();


// const {
//   HOST_NAME,
//   HOST_USER,
//   HOST_PASSWORD,
//   DB_PORT,
//   SSH_HOST,
//   SSH_PORT,
//   SSH_USER,
//   SSH_PASSWORD,
// } = process.env;

let HOST_NAME = '127.0.0.1'
let HOST_USER = 'root'
let HOST_PASSWORD = 'R@Idfy$11'
let DB_PORT = '3306'
let SSH_HOST = '216.48.177.133'
let SSH_PORT = ''
let SSH_USER = 'root'
let SSH_PASSWORD = 'R@Idfy$11'


const dbServer = {
  host: HOST_NAME,
  user: HOST_USER,
  password: HOST_PASSWORD,
  port: DB_PORT,
};

const tunnelConfig = {
  host: SSH_HOST,
  port: SSH_PORT,
  user: SSH_USER,
  password: SSH_PASSWORD,
};

const forwardConfig = {
  srcHost: dbServer.host,
  srcPort: dbServer.port,
  dstHost: dbServer.host,
  dstPort: dbServer.port,
};

const SSHConnection = new Promise((resolve, reject) => {
  sshClient
    .on("ready", () => {
      sshClient.forwardOut(
        forwardConfig.srcHost,
        forwardConfig.srcPort,
        forwardConfig.dstHost,
        forwardConfig.dstPort,
        (err, stream) => {
          if (err) reject(err);
          const updatedDbServer = {
            ...dbServer,
            stream,
          };
          const connection = mysql.createConnection(updatedDbServer);
          connection.connect((error) => {
            if (error) {
              reject(error);
            }
            resolve(connection);
          });
        }
      );
    })
    .connect(tunnelConfig);
});


function executeQuery(sqlQuery, cb) {
  console.log(`File:database.js Function:executeQuery() sqlQuery:${sqlQuery}`);
  SSHConnection.then((mydb) => {
    mydb.query(sqlQuery, (error, result) => {
      if (error) {
        console.log(`Error in execute query. Error: ${error.message}`);
        return;
      } else {
        console.log(`sql query execute sucessfully`);
        cb(result);
      }
    });
  }).catch((error) => {
    console.log(`Error in SSH connection. Error : ${error.message}`);
  });
}

function dbConnectionEnd() {
  console.log("Database Connection Ended");
  SSHConnection.then((mydb) => {
    mydb.end();
  }).catch((error) => {
    console.log(`Error in db connection. Error : ${error.message}`);
  });
  return;
}

let sqlQuery = 'show databases;';
executeQuery(sqlQuery, ( result) => {
    console.log(err, result);
});