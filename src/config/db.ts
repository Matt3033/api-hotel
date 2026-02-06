import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

class DBConexao {

    private URI = String(process.env.DB_URI);

    public async estabelecerConexao() {
        try {
            await mongoose.connect(this.URI);
            console.log('Conexão com db estabelecida');
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
}

export default DBConexao
