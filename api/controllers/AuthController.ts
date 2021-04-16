import { Request, Response } from 'express'
import { Controller, Post, Get } from "@overnightjs/core";
import { ApiServer } from '../server'

import { MatchComputations } from '../algo/MatchComputations';
import { User } from '../data/Models'

@Controller('auth')
export class AuthController {

    @Post('login')
    private async loginUser(req: Request, res: Response) {
        const db = ApiServer.db
        const user: User = {
            discordId: req.body.id,
            a_token: req.body.a_token,
            r_token: req.body.r_token,
            email: req.body.email
        }

        const prefReq = await MatchComputations.generatePrefFreq(user)

        await db.collection('users').updateOne({ discordId: user.discordId }, { 
            $set: { 
                a_token: user.a_token,
                r_token: user.r_token,
                email: user.email,
                prefReq: prefReq
            }
         }, { upsert: true })

        res.send({ status: 'OK'})
    }
}