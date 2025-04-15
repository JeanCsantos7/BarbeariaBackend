import contasClientes from "../model/contasClientes";
import rotaPrivadaBarbeiros from "../model/rotaPrivadaBarbeiros";
import { Request, Response } from "express";

class contasClientesController {
  async createClientes(req: Request, res: Response) {
    try {
      const reqParam = req.body;
      const createModel = await contasClientes.createClientes(reqParam);
      res.json(createModel);
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar conta" });
    }
  }

  async findClientes(req: Request, res: Response) {
    try {
      const reqParam = await contasClientes.findClientes();
      res.json(reqParam);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);  
      res.status(500).json({ error: "Erro ao buscar clientes" });
    }
  }
  


  async procurarHorarios(req: Request, res: Response)
  {
    try {
       
      const {nome} = req.params
      const reqParam = await contasClientes.procurarHorarios(nome)
      res.json(reqParam)

    } 
    catch (error) {
     
      console.error(error)
      
    }
  }





  async loginBarbeiros(req: Request, res: Response) {
    try {
      const { email, senha } = req.body;
      const logicaModel = await rotaPrivadaBarbeiros.loginBarbeiros(
        email,
        senha
      );
      res.json(logicaModel);
    } catch (error) {
      console.error(error);
    }
  }

  async loginClientes(req: Request, res: Response) {
    try {
      const { email, senha } = req.body;
      const loginClientes = await contasClientes.logiClientes(email, senha);
      res.json(loginClientes);
    } catch (error) {
      console.error(error);
    }
  }
}

export default new contasClientesController();
