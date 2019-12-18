import express, { Router } from 'express';
import cors from 'cors';
import Usuarios from './usuarios.js';
import Bicicletas from './bicicletas.js';

const app = express();
app.use(express.json());
app.use(cors());
app.use('/usuarios', Usuarios);
app.use('/bicicletas', Bicicletas);

app.listen(3000, () =>
    console.log('Servidor rodando na porta 3000!')
);