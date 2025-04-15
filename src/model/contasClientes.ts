import DataBase from "../database/database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface dadosClientes {
    nome: string,
    email: string,
    senha: string,
    role: string
}

class contasClientesModel {
    async createClientes(reqparam: dadosClientes) {
        const sql = "INSERT INTO clientes (nome, email, senha, role) VALUES (?,?,?,?)";

        const saltRounds = 10;

        const encryptedPassword = await bcrypt.hash(reqparam.senha, saltRounds);


        return new Promise((resolve, reject) => {
            DataBase.query(sql, [reqparam.nome, reqparam.email, encryptedPassword, "user"], (error, result) => {
                if (error) {
                    reject(error);
                }
                resolve(result);
            });
        });
    }

    async findClientes() {
        const sql = "SELECT * FROM clientes";
        return new Promise((resolve, reject) => {
            DataBase.query(sql, (error, result) => {
                if (error) {
                    reject(error);
                }
                resolve(result);
            });
        });
    }

    async procurarHorarios(nome: string)
    {
        const sql = "SELECT * FROM agendamentos WHERE nome = ?"
         return new Promise((resolve, reject) => {
            DataBase.query(sql, [nome], (error, result) => {
              
                if(error)
                {
                    reject(error)
                }

                resolve(result)

            })
         })
    }

    async logiClientes(email: string, senha: string) {
        const sql = "SELECT * FROM clientes WHERE email = ?";

        return new Promise((resolve, reject) => {
            DataBase.query(sql, [email], async (error, result: any) => {
                if (error) {
                    reject(error);
                    return;
                }

                if (result.length === 0) {
                    reject("Usuário não encontrado");
                    return;
                }

                const user = result[0];
                const senhaValida = await bcrypt.compare(senha, user.senha);

                if (!senhaValida) {
                    reject("Senha incorreta");
                    return;
                }

          
                if (user.role !== "user" ) {
                    reject("Acesso negado");
                    return;
                }

                const token = jwt.sign(
                    { id: user.id, nome: user.nome, email: user.email, role: user.role },
                    process.env.JWT_SECRET as string,
                    { expiresIn: "1h" }
                );

                

                resolve({ token, role: user.role, nome: user.nome });
            });
        });
    }
    
}




export default new contasClientesModel;
