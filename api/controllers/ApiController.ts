import { Request, Response } from 'express';
import { Controller, Middleware, Get, Put, Post, Delete, ChildControllers } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { AuthController } from './AuthController';

//SNIPPET TAKEN FROM THIS ARTICLE: https://levelup.gitconnected.com/setup-express-with-typescript-in-3-easy-steps-484772062e01 
//(Original Author: https://github.com/seanpmaxwell)

@Controller('v1')
@ChildControllers([
    new AuthController()
])
export class ApiController {}