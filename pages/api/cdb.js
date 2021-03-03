import service from '../../services/cdb';

export default async function cdbHandler(req, res) {
    const requiredParams = ['investmentDate', 'cdbRate', 'currentDate'];
    const missing = [];

    for (const param of requiredParams) {

        if (!req.body[param]) {
            missing.push(param);
        }
    }

    if (missing.length) {
        return res.status(400).send(`missing-params [${missing}]`);
    }

    const response = await service.simulate(req.body.investmentDate, req.body.cdbRate, req.body.currentDate);

    return res.status(200).json(response);
}
