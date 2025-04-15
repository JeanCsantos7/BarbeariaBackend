import DataBase from "../database/database";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

class rotaPrivadaBarbeiros {
  
  
    loginBarbeiros(email: string, senha: string) {
    const sql = "SELECT * FROM barbeiros WHERE email=?";

    return new Promise((resolve, reject) => {
      DataBase.query(sql, [email], async (error, result: any) => {
        if (error) {
          reject(error);
          return;
        }

        const user = result[0];

        if (user.role !== "admin") {
          return reject("Usuário não autorizado");
        }

        const token = jwt.sign(
          {
            id: user.id,
            nome: user.nome,
            email: user.email,
            role: user.role,
          },
          process.env.JWT_SECRET as string,
          { expiresIn: "1h" }
        );

        resolve({token, role:user.role, nome: user.nome});
      });
    });
  }
}

export default new rotaPrivadaBarbeiros();
