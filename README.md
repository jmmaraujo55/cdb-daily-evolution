# SIMULADOR CDB PÓS FIXADO

Realiza o calculo para saber qual será o valor total do investimento no final do prazo.

### Stack

- NodeJs (Api)
- Next (Frontend)
- Docker (Frontend)

## Configurações

As configurações necessárias para o projeto dependem apenas dos seguintes passos:

- Para realizar o cálculo, é necessário importar um arquivo com as taxas diarias da CDI.
Para isto, basta substituir o arquivo csv na pasta public/files com o nome `CDI_Prices.csv` por outro que contenha as duas colunas abaixo:
    - dtDate
    - dLastTradePrice

`Obs: Por padrão a aplicação já vem com um arquivo com as taxas de 04/01/2010 até 03/12/2019.`

`Obs: A importação do arquivo é feita na primeira requisição após o deploy, sendo assim, será necessário reiniciar a aplicação para nova importação`

## Execução

O projeto conta com um shell script `deploy.sh` que ao ser executado realizará todo o processo necessario para executar.
```bash
    sh deploy.sh
```
## API

> /api/cdb

### rota responsável por realizar o calculo

#### Parametros recebidos
```json
    {
        "investmentDate": "2016-11-14",
        "cdbRate": 103.5,
        "currentDate": "2016-12-26"
    }
```

#### Em caso de sucesso

```json
    [{
        "date": "14/11/2016",
        "unitPrice": 1000.53397
    }, ...]
```
