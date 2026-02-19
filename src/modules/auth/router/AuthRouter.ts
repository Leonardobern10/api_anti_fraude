import type { Router, Request, Response } from 'express';
import express from 'express';
import type AuthController from '../controller/AuthController';
import AuthMiddleWare from '../../../gateway/middlewares/AuthMiddleware';
import { PATH } from '@utils/Path';

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Gestão de usuários e autenticação
 */
export default class AuthRouter {
    private controller: AuthController;
    private router: Router;

    constructor(controller: AuthController) {
        this.router = express.Router();
        this.controller = controller;
        this.registerRoutes();
    }

    /**
     * @swagger
     * /auth/register:
     *   post:
     *     tags: [Auth]
     *     summary: Registrar novo usuário
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/RegisterDTO'
     *     responses:
     *       201:
     *         description: Usuário criado
     */
    public createUser() {
        this.router.post(
            PATH.AUTH.REGISTER,
            async (req: Request, res: Response) => {
                this.controller.register(req, res);
            },
        );
    }

    /**
     * @swagger
     * /auth/user:
     *   get:
     *     tags: [Auth]
     *     summary: Buscar usuário autenticado
     *     security:
     *       - cookieAuth: []
     *     responses:
     *       200:
     *         description: Usuário encontrado
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ClientResponse'
     */
    public getUser() {
        this.router.get(
            PATH.AUTH.GET,
            AuthMiddleWare.checkAuthentication,
            async (req: Request, res: Response) => {
                this.controller.getUser(req, res);
            },
        );
    }

    public getRouter() {
        return this.router;
    }

    /**
     * @swagger
     * /auth/login:
     *   post:
     *     tags: [Auth]
     *     summary: Login do usuário
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/LoginDTO'
     *     responses:
     *       200:
     *         description: Login realizado com sucesso
     */
    public login() {
        this.router.post(PATH.AUTH.LOGIN, async (req, res) => {
            this.controller.login(req, res);
        });
    }

    /**
     * @swagger
     * /auth/status:
     *   get:
     *     tags: [Auth]
     *     summary: Verificar status do usuário autenticado
     *     security:
     *       - cookieAuth: []
     *     responses:
     *       200:
     *         description: Usuário autenticado
     */
    public authStatus() {
        this.router.get(
            PATH.AUTH.AUTH_STATUS,
            AuthMiddleWare.checkAuthentication,
            async (req, res) => {
                this.controller.authStatus(req, res);
            },
        );
    }

    /**
     * @swagger
     * /auth/logout:
     *   post:
     *     tags: [Auth]
     *     summary: Realizar logout do usuário
     *     security:
     *       - cookieAuth: []
     *     responses:
     *       200:
     *         description: Logout realizado com sucesso
     */
    public logout() {
        this.router.post(
            PATH.AUTH.LOGOUT,
            AuthMiddleWare.checkAuthentication,
            (req, res) => {
                this.controller.logout(req, res);
            },
        );
    }

    private registerRoutes() {
        this.createUser();
        this.getUser();
        this.login();
        this.authStatus();
        this.logout();
    }
}
