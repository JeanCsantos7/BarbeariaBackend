import { Router } from "express";
import dotenv from "dotenv";
import contasClientes from "./src/controller/contasClientes";
import AgendaHorarios from "./src/controller/AgendaHorarios";

dotenv.config();

const Routes = Router();

/**
 * @swagger
 * /registrarClientes:
 *   post:
 *     summary: Realiza o Cadastro da conta de um novo cliente.
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nome, email, senha]
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome completo do cliente
 *               email:
 *                 type: string
 *                 description: Endereço de e-mail do cliente
 *               senha:
 *                 type: string
 *                 description: Senha do cliente
 *     responses:
 *       200:
 *         description: Cliente cadastrado com sucesso
 *       400:
 *         description: Erro na validação ou dados faltando
 *       500:
 *         description: Erro no servidor
 */
Routes.post("/registrarClientes", contasClientes.createClientes);

/**
 * @swagger
 * /loginClientes:
 *   post:
 *     summary: Realiza o Login do cliente.
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, senha]
 *             properties:
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cliente Logado com sucesso
 *       400:
 *         description: Email ou senha incorretos
 *       500:
 *         description: Erro no servidor
 */
Routes.post("/loginClientes", contasClientes.loginClientes);

/**
 * @swagger
 * /admin/barbeiros:
 *   post:
 *     summary: Login de um barbeiro com perfil admin.
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, senha]
 *             properties:
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Barbeiro logado com sucesso
 *       400:
 *         description: Email ou senha incorretos
 *       500:
 *         description: Erro no servidor
 */
Routes.post("/admin/barbeiros", contasClientes.loginBarbeiros);

/**
 * @swagger
 * /registrarHorarios:
 *   post:
 *     summary: Criação de horários disponíveis por barbeiros.
 *     tags: [Horarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [id, data, horario, barbeiro]
 *             properties:
 *               id:
 *                 type: integer
 *               data:
 *                 type: string
 *                 format: date
 *               horario:
 *                 type: string
 *                 format: time
 *               barbeiro:
 *                 type: string
 *     responses:
 *       200:
 *         description: Data e horário cadastrados com sucesso
 *       400:
 *         description: Erro de dados ou dados inválidos
 *       500:
 *         description: Erro no servidor
 */
Routes.post("/registrarHorarios", AgendaHorarios.criacaoHorarios);

/**
 * @swagger
 * /agendamentoRealizado:
 *   post:
 *     summary: Cliente realiza agendamento com barbeiro.
 *     tags: [Horarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [id, data, horario, barbeiro]
 *             properties:
 *               id:
 *                 type: integer
 *               data:
 *                 type: string
 *                 format: date
 *               horario:
 *                 type: string
 *                 format: time
 *               barbeiro:
 *                 type: string
 *     responses:
 *       200:
 *         description: Agendamento realizado com sucesso
 *       400:
 *         description: Erro de dados ou dados inválidos
 *       500:
 *         description: Erro no servidor
 */
Routes.post("/agendamentoRealizado", AgendaHorarios.agendamentoRealizado);

/**
 * @swagger
 * /agendamentoBarbeiro/{barbeiro}:
 *   get:
 *     summary: Lista horários agendados de um barbeiro específico.
 *     tags: [Horarios]
 *     parameters:
 *       - in: path
 *         name: barbeiro
 *         required: true
 *         schema:
 *           type: string
 *         description: Nome do barbeiro
 *         example: "Joao"
 *     responses:
 *       200:
 *         description: Sucesso ao consultar horários
 *       400:
 *         description: Erro na consulta
 *       500:
 *         description: Erro no servidor
 */
Routes.get("/agendamentoBarbeiro/:barbeiro", AgendaHorarios.agendamentoBarbeiros);

/**
 * @swagger
 * /Clientes:
 *   get:
 *     summary: Lista todos os clientes cadastrados.
 *     tags: [Clientes]
 *     responses:
 *       200:
 *         description: Lista retornada com sucesso
 *       400:
 *         description: Erro ao buscar clientes
 *       500:
 *         description: Erro no servidor
 */
Routes.get("/Clientes", contasClientes.findClientes);

/**
 * @swagger
 * /horariosClientes/{nome}:
 *   get:
 *     summary: Consulta horários agendados por um cliente.
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: nome
 *         required: true
 *         schema:
 *           type: string
 *         description: Nome do cliente
 *         example: "Carlos"
 *     responses:
 *       200:
 *         description: Sucesso ao consultar horários
 *       400:
 *         description: Erro na consulta
 *       500:
 *         description: Erro no servidor
 */
Routes.get("/horariosClientes/:nome", contasClientes.procurarHorarios);

/**
 * @swagger
 * /listaHorarios/{barbeiro}:
 *   get:
 *     summary: Lista horários disponíveis de um barbeiro.
 *     tags: [Horarios]
 *     parameters:
 *       - in: path
 *         name: barbeiro
 *         required: true
 *         schema:
 *           type: string
 *         description: Nome do barbeiro
 *         example: "Joao"
 *     responses:
 *       200:
 *         description: Sucesso ao consultar horários
 *       400:
 *         description: Erro na consulta
 *       500:
 *         description: Erro no servidor
 */
Routes.get("/listaHorarios/:barbeiro", AgendaHorarios.horariosDisponiveis);

/**
 * @swagger
 * /editarHorarios/{id}:
 *   put:
 *     summary: Edita data/horário a partir do ID.
 *     tags: [Horarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: string
 *                 format: date
 *               horario:
 *                 type: string
 *                 format: time
 *     responses:
 *       200:
 *         description: Horário atualizado com sucesso
 *       400:
 *         description: Erro na atualização
 *       500:
 *         description: Erro no servidor
 */
Routes.put("/editarHorarios/:id", AgendaHorarios.editarHorarios);

/**
 * @swagger
 * /deletarHorarios/{id}:
 *   delete:
 *     summary: Deleta horário pelo ID.
 *     tags: [Horarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Horário deletado com sucesso
 *       400:
 *         description: Erro ao deletar horário
 *       500:
 *         description: Erro no servidor
 */
Routes.delete("/deletarHorarios/:id", AgendaHorarios.deletarHorarios);

export default Routes;
