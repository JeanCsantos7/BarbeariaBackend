import { Router} from "express";
import dotenv from "dotenv";
import contasClientes from "./src/controller/contasClientes";
import AgendaHorarios from "./src/controller/AgendaHorarios";


dotenv.config();




const Routes = Router();






Routes.post('/registrarClientes', contasClientes.createClientes);


Routes.post('/loginClientes', contasClientes.loginClientes );

Routes.post('/admin/barbeiros', contasClientes.loginBarbeiros);


Routes.post('/registrarHorarios', AgendaHorarios.criacaoHorarios);

Routes.post('/agendamentoRealizado', AgendaHorarios.agendamentoRealizado);

Routes.get('/agendamentoBarbeiro/:barbeiro', AgendaHorarios.agendamentoBarbeiros);


Routes.get('/Clientes', contasClientes.findClientes);

Routes.get('/horariosClientes/:nome', contasClientes.procurarHorarios);



Routes.get('/listaHorarios/:barbeiro', AgendaHorarios.horariosDisponiveis);


Routes.put("/editarHorarios/:id", AgendaHorarios.editarHorarios)


Routes.delete('/deletarHorarios/:id', AgendaHorarios.deletarHorarios);




export default Routes;
