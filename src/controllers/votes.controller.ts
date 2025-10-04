import { Request, Response } from "express";

export class VotesController {
    constructor() {
        console.log('Init voting controller');
    }

    sayHi = async (req: Request, res: Response) => {
        return res.json({
            message: "Hello from Voting Controller!"
        });
    }
}