

import DataBase from "../database/database"


interface updateDados{
    id: number,
    nome? : string,
    telefone?: number,
    observacoes? : string,
    servico? : string,
    data: string,
    horario: string,
    barbeiro: string
}


class AgendaHorariosModel{

    horariosDisponiveis(barbeiro: string)
    {
    const sql = "SELECT * FROM horariosdisponiveis WHERE barbeiro=? "
    
    return new Promise((resolve, reject) => {

        DataBase.query(sql, barbeiro, (error, result) => {

            if(error){
                reject(error)
            }


           resolve(result)
        })
    })


    }

    criacaoHorarios(dados: updateDados){
        const sql = "INSERT INTO  horariosdisponiveis (id, data, horario, barbeiro) VALUES (?,?,?,?)"
        return new Promise((resolve, reject) => {
            DataBase.query(sql, [dados.id, dados.data, dados.horario, dados.barbeiro], (error, result) => {
                if(error){
                    reject(error)
                }

                resolve(result)
            })
        })
    }

    agendamentoRealizado(dados: updateDados){

      const sql = "INSERT INTO agendamentos (id, nome, barbeiro, telefone, data, horario, servico, observacoes) VALUES(?,?,?,?,?,?,?)"
      
      return new Promise((resolve, reject) => {

        DataBase.query(sql, [dados.id, dados.nome, dados.barbeiro, dados.telefone, dados.data, dados.horario, dados.servico, dados.observacoes], (error, result) => {
 
            if(error)
            {
                reject(error)
            }

            resolve(result)

        })

      })
      
      

    }

    agendamentosBarbeiros(barbeiro : string){

        const sql = "SELECT * FROM agendamentos WHERE barbeiro=?"
        return new Promise((resolve, reject) => {

            DataBase.query(sql, barbeiro, (error, result) => {

                if(error)
                {
                    reject(error)
                }

                resolve(result)
            })
        })
    }




    


    deletarHorarios(idUser : number){
     const sql = "DELETE FROM horariosdisponiveis WHERE id=?"
     return new Promise((resolve, reject) => {
        DataBase.query(sql, idUser, (error, result) => {
            if(error){
                reject(error)
            }

            resolve(result)
        })
     })

    }

    editarHorarios(bodyData: updateDados, idUser: number ){
       
        const sql = "UPDATE horariosdisponiveis SET data=?, horario=? WHERE id=?"
        return new Promise((resolve, reject) => {
            DataBase.query(sql,  [bodyData.data, bodyData.horario, idUser],  (error, result) => {
                if(error)
                {
                    reject(error)
                }

                resolve(result)
            })
        })

    }

}

export default new AgendaHorariosModel



