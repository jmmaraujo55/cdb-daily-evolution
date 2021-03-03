import csv from 'csvtojson';

class Cdi {
    constructor() {
        this.cdiPrices = {};
    }

    async load() {
        {
            try {
                await new Promise((resolve, reject) => {
                    csv()
                        .fromFile('public/files/CDI_Prices.csv')
                        .subscribe(async cdi => this.cdiPrices[cdi.dtDate] = Number(cdi.dLastTradePrice), reject, resolve);
                });
            } catch (e) {
                console.log('[ERROR] -', e);
            }
        }

    }
}

export default new Cdi();
