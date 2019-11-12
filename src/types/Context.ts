import { Request, Response } from "express";

export interface Context {
    req: Request;
    res: Response;
    sessionStore: any;
}
