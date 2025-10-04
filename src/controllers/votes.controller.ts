import { Request, Response } from "express";
import { normalizeIp } from "../utils/normalize-ip";

export class VotesController {
    constructor() {
        console.log('Init voting controller');
    }

    addVote = async (req: Request, res: Response) => {
        const clientIp = normalizeIp(req.ip)
        const allIps = req.ips.map(normalizeIp);

        res.json({
            ip: clientIp,
            ips: allIps,
            raw: req.socket.remoteAddress
        });
    }
}