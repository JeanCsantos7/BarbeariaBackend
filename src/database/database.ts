import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config()



const DataBase = mysql.createPool({
  
 host: process.env.MYSQLHOST,
 port: parseInt(process.env.MYSQLPORT || "5000"),
 user: process.env.MYSQLUSER,
 password: process.env.MYSQLPASSWORD,
 database: process.env.MYSQLDATABASE,
 connectTimeout: 50000,
 waitForConnections: true,
 connectionLimit: 20,
 queueLimit: 0,

})

DataBase.getConnection((error, connection) => {
   
    if(error)
    {
      console.error("Não foi possível se conectar ao banco de dados", error)
      return;
    }

  
      console.log("Conexão realizada com sucesso!!")
      connection.release()
   

   

    

})


export default DataBase