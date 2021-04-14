import { Request, Response } from 'express'
import { Controller, Post, Get } from "@overnightjs/core";
import { ApiServer } from '../server'

import axios from 'axios'

@Controller('auth')
export class AuthController {

    @Post('login')
    private async loginUser(req: Request, res: Response) {
        const db = ApiServer.db
        await db.collection('users').updateOne({ discordId: req.body.id }, { 
            $set: { 
                a_token: req.body.a_token,
                r_token: req.body.r_token,
                email: req.body.email
            }
         }, { upsert: true })
        res.send({ status: 'OK'})
    }
}