import {Router} from "express";
import {Client} from "pg";

const router = Router();

router.get('/', async(req, res) => {
    let resultado = [];
    const client = criaClient();
    await client.connect();

    let queryResult = await client.query("select CODIGO_ATIVO, QUANTIDADE, PRECO_MEDIO from CARTEIRA ORDER BY CODIGO_ATIVO");
    for (let row of queryResult.rows) {
        resultado.push({
            codigo: row.codigo_ativo.trim(),
            quantidade: row.quantidade.trim(),
            preco: row.preco_medio.trim()
        });        
    };
    await client.end();
    res.send(JSON.stringify(resultado));
});

router.post('/', async(req, res) => {
    let payload = req.body;
    
    const client = criaClient();
    await client.connect();
    let sql = `insert into OPERACOES(ID, CODIGO_ATIVO, QUANTIDADE, TIPO, PRECO ) values
    (nextval('SEQ_OPERACOES_ID'), '${payload.codigo}','${payload.quantidade}', 'C', ${payload.preco})
    `;
    
    console.log("CARTEIRAAA   " + sql);

    await client.query(sql);

    sql = `insert into CARTEIRA(CODIGO_ATIVO, QUANTIDADE, PRECO_MEDIO) values
    ('${payload.codigo}','${payload.quantidade}', ${payload.preco})
    `;
    
    console.log(sql);

    await client.query(sql);
    client.end();

    res.status(201);
    res.send();
});

router.put('/:codigo', async(req, res) => {
    let codigo = req.params.codigo;
    let payload = req.body;
    const client = criaClient();
    await client.connect();
    console.log("flag " + payload.compraVenda);
    if (payload.compraVenda === "C") {
        
        let sql = `insert into OPERACOES(ID, CODIGO_ATIVO, QUANTIDADE, TIPO, PRECO) values
        (nextval('SEQ_OPERACOES_ID'), '${codigo}',${payload.quantidade}, '${payload.compraVenda}', ${payload.preco})
        `;
        await client.query(sql);

        let novaQuantidade = Number(payload.quantidade) + Number(payload.quantidadeAnterior);
        let novoPreco = (((Number(payload.quantidadeAnterior) * Number(payload.precoAnterior)) + (Number(payload.quantidade) * Number(payload.preco)))/Number(novaQuantidade)).toFixed(2)
    
         sql = `update CARTEIRA set
            QUANTIDADE = ${novaQuantidade},
            PRECO_MEDIO = ${novoPreco}
        where 
            CODIGO_ATIVO = '${codigo}'
        `;
        await client.query(sql);
        
    } else {
        
        let lucroPrejuizo = Number(payload.preco) - Number(payload.precoAnterior);

        let sql = `insert into OPERACOES(ID, CODIGO_ATIVO, QUANTIDADE, TIPO, PRECO, LUCRO_PREJUIZO) values
        (nextval('SEQ_OPERACOES_ID'), '${codigo}',${payload.quantidade}, '${payload.compraVenda}', ${payload.preco}, ${lucroPrejuizo})
        `;
        
        console.log(sql);

        await client.query(sql);
        
        let novaQuantidade =  Number(payload.quantidadeAnterior) - Number(payload.quantidade);
    
        sql = `update CARTEIRA set
            QUANTIDADE = ${novaQuantidade}
        where 
            CODIGO_ATIVO = '${codigo}'
        `;

        console.log(sql);

        await client.query(sql);
    }
   
    client.end();

    res.status(201);
    res.send();
});

router.delete('/:codigo', async(req, res) => {
    let codigo = req.params.codigo;
    let sql = `delete from ATIVOS 
    where 
        CODIGO = '${codigo}'
    `;

    const client = criaClient();
    await client.connect();
    await client.query(sql);
    client.end();

    res.status(201);
    res.send();
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