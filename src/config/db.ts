import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export default class DBConexao {

    private URI = process.env.DB_URI;

    public async estabelecerConexao() {
        try {
            if (this.URI) {
                await mongoose.connect(this.URI);
            }
            console.log('Conexão com db estabelecida');
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
} 