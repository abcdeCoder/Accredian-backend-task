import mysql2 from "mysql2";
import bcrypt from "bcrypt";
import { config } from "dotenv";

config();

// Database Connection
const connection = mysql2.createPool({
  host: "su3.h.filess.io",
  database: "gauravvermagv_agosimply",
  user: "gauravvermagv_agosimply",
  password: "244f8b40f5db735f6021df763b409e047349017f",
  port: "3306",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})



// Run it to craete the table in database run first database.js
// 

// const createUserTable = (id) => {
//   const command = `CREATE TABLE users (
//     id int(11) NOT NULL AUTO_INCREMENT,
//     username varchar(45) NOT NULL,
//     email varchar(45) NOT NULL,
//     password varchar(255) NOT NULL,
//     PRIMARY KEY (id),
//     UNIQUE KEY username_UNIQUE (username),
//     UNIQUE KEY email_UNIQUE (email)
//   ) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;`
  
//   connection.query(command, (err) => {
//     if (err) console.log(err);
//   })
// }

//createUserTable();

// Function to Create User
const createUser = (user) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkEmailUser(user.email);
      if (check) {
        reject(`The email ${user.email} already exist. Try with another email.`)
      }
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(user.password, salt);
      connection.query(`insert into users (email, username, password) values ('${user.email}','${user.username}','${hash}')`, (err, rows) => {
        if (err) {
          reject(err+"")
        }
        else {
          resolve("Account Created Successfully! Log In")
        }
      })
    } catch (e) {
      reject(e)
      console.log("" + e)
    }
  })
}

// Function to find a user with email
const checkEmailUser = (email) => {
  return new Promise((resolve, reject) => {
    try {
      connection.query(`select * from users where email = '${email}'`, (err, row) => {
        if (err) reject(err);
        if (row.length > 0) { resolve(true) }
        resolve(false);
      })
    } catch (e) {
      console.log("" + e)
      reject(e);
    }
  })
}

const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    try {
      connection.query(`select * from users where email = '${email}'`, (err, row) => {
        if (err) reject(err);
        if (row.length < 1) { reject("User not found") }
        let user = row[0];
        resolve(user);
      })
    } catch (e) {
      console.log("123" + e)
      reject(e);
    }
  })
}

// Function to comapare Password
const comparePassword = (password, user) => {
  return new Promise((resolve, reject) => {
    try {
      const isMatch = bcrypt.compareSync(password, user.password);
      if (isMatch) resolve(true);
      else reject("The password is incorrect")

    } catch (e) {
      console.log("3" + e)
      reject(e)
    }
  })
}


const database = {
  createUser: createUser,
  getUserByEmail: getUserByEmail,
  comparePassword: comparePassword,
  connection: connection
};

export default database;
