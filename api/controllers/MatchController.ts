import { Request, Response } from 'express'
import { Controller, Post, Get } from "@overnightjs/core";
import { ApiServer } from '../server'

import axios from 'axios'

@Controller('matches')
export class MatchController {

    @Get('find')
    private async findMatches(req: Request, res: Response) {
        const db = ApiServer.db
        const user = await db.collection('users').findOne({ discordId: req.header('id')})
        
        res.send({ status: 'OK'})
    }
}