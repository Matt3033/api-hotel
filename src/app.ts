import express from 'express';
import dotenv from 'dotenv';
import cliente from './routes/cliente.route';
import DBConexao from './config/db';

dotenv.config();

const app = express();
const PORTA = process.env.PORTA || 8000;

app.use(express.json());
app.use('/api/clientes', cliente);

app.listen(PORTA, async () => {
    
    const dbConexao: DBConexao = new DBConexao();
    await dbConexao.estabelecerConexao();
     
    console.log(`Ouvindo em http://locahost:${PORTA}`);
})