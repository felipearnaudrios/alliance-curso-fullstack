import {Router} from "express";
import {Client} from "pg";

const router = Router();

router.get('/', async(req, res) => {
    let resultado = [];
    const client = criaClient();
    await client.connect();

    let queryResult = await client.query("select CODIGO_ATIVO, QUANTIDADE, LUCRO_PREJUIZO from OPERACOES where TIPO = 'V' ORDER BY CODIGO_ATIVO");
    for (let row of queryResult.rows) {
        resultado.push({
            codigo: row.codigo_ativo,
            quantidade: row.quantidade,
            lucroPrejuizo: row.lucro_prejuizo
        });        
        console.log(resultado[-1])
    };
    await client.end();
    res.send(JSON.stringify(resultado));
});

function criaClient() {
    return new Client({
        user: "dia3",
        host: "localhost",
        database: "db_dia3",
        password: '123456',
        port: 5432
    });
};

export default router;