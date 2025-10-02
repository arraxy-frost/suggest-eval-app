import { Request, Response } from "express";

export class VotingController {
    constructor() {
        console.log('Init voting controller');
    }

    sayHi(req: Request, res: Response) {
        return res.json({
            message: "Hello from Voting Controller!"
        });
    }
}