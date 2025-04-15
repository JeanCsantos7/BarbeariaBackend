
import AgendaHorarios from "../model/AgendaHorarios"
import { Request, Response } from "express"


class AgendaHorariosController{

    async horariosDisponiveis(req: Request, res: Response)
    {

        try {
            
            const nome =   req.params.barbeiro 
            const reqParam = await AgendaHorarios.horariosDisponiveis(nome)
            res.json(reqParam)        
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar Horarios" });
        }
    

    }




    async criacaoHorarios(req: Request, res: Response) {
        try {
          const dados = req.body;
          const reqParam = await AgendaHorarios.criacaoHorarios(dados);
          res.json(reqParam);
        } catch (error) {
          console.error("Erro ao cadastrar horário:", error);
          res.status(500).json({ error: "Erro ao cadastrar horário", detalhes: error });
        }
      }


      async agendamentoRealizado(req: Request, res: Response) {
       
        try{
          const dados = req.body
          const reqparam = await AgendaHorarios.agendamentoRealizado(dados)
          res.json(reqparam)
        }

        catch(error)
        {
          console.error(error)
          res.status(500).json({ error: "Erro ao realizar agendamento", detalhes: error });

        }

       

      }

      async agendamentoBarbeiros(req: Request, res: Response){
        
        try {
          const dados = req.params.barbeiro
         const reqparam= await AgendaHorarios.agendamentosBarbeiros(dados)
         res.status(200).json(reqparam)


        } 
        
        
        catch (error) {
           
         res.status(500).send(error)

        }
        

      }
      


    async deletarHorarios(req: Request, res: Response){
       try {
        
        const idUser = parseInt(req.params.id)
        const reqParam = await AgendaHorarios.deletarHorarios(idUser)
        res.json(reqParam)

       } 
       
       catch (error) {
         res.status(500).json({error: "Não foi possível deletar"})
       }

    }

    async editarHorarios(req: Request, res: Response){
        const idUser = parseInt(req.params.id)
        const bodyData = req.body
        const reqParam = await AgendaHorarios.editarHorarios(bodyData, idUser)

        res.json(reqParam)
    }

}

export default new AgendaHorariosController



