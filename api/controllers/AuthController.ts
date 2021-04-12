import { Request, Response } from 'express'
import { Controller, Post, Get } from "@overnightjs/core";

import axios from 'axios'

@Controller('auth')
export class AuthController {
    loggingInTokens: string[] = []

    @Post('login')
    private async loginUser(req: Request, res: Response) {
        res.send('pong')
    }
}