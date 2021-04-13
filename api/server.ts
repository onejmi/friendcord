import express from 'express'
import * as controllers from './controllers';
import { Server } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { MongoClient } from 'mongodb'
import secrets from '../secret'

class ApiServer extends Server {

    private readonly SERVER_STARTED = 'API server started on port: ';

    private static readonly uri = `mongodb+srv://${secrets.dbUser}:${secrets.dbPassword}@cluster0.breea.mongodb.net/${secrets.dbName}?retryWrites=true&w=majority`
    private static _client = new MongoClient(ApiServer.uri, { useNewUrlParser: true, useUnifiedTopology: true })

    public static get db() {
        return this._client.db();
    }
    
    constructor() {
        super(true);
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
        ApiServer._client.connect().then((_) => {
            this.setupControllers();
        })
    }

    private setupControllers(): void {
        const ctlrInstances = [];
        for (const name in controllers) {
            if (controllers.hasOwnProperty(name)) {
                const controller = (controllers as any)[name];
                ctlrInstances.push(new controller());
            }
        }
        super.addControllers(ctlrInstances);
    }

    public start(port: number): void {
        this.app.get('*', (_, res) => {
            res.send(this.SERVER_STARTED + port);
        });
        this.app.listen(port, () => {
            Logger.Imp(this.SERVER_STARTED + port);
        });
    }
}

module.exports = new ApiServer().app;