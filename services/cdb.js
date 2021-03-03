import moment from 'moment-timezone';

import cdi from '../services/cdi';

class CdbService {
    async simulate(investmentDate, cdbRate, currentDate) {
        if (!Object.keys(cdi.cdiPrices).length) {
            await cdi.load();
        }

        investmentDate = moment.tz(investmentDate, 'America/Sao_Paulo');
        currentDate = moment.tz(currentDate, 'America/Sao_Paulo');

        const n = currentDate.diff(investmentDate, 'day');
        let baseValue = 1000;
        let factor = 1;
        let accumulated = [];

        for (let i = 1; i <= n; i++) {
            const date = moment.tz(investmentDate, 'America/Sao_Paulo').add(i - 1, 'days');
            const formatedDate = date.format('DD/MM/YYYY');

            if (cdi.cdiPrices[formatedDate]) {
                const tcdi = ((cdi.cdiPrices[formatedDate] / 100 + 1) ** (1 / 252) - 1).toFixed(8);

                factor = Number((factor * (1 + Number(tcdi) * (cdbRate / 100))).toFixed(8));
                const accumulatedTcdi = baseValue * factor;

                accumulated.push({
                    date: formatedDate,
                    unitPrice: accumulatedTcdi
                });
            }
        }

        return accumulated;
    }
}

export default new CdbService();
