import { Sequelize } from "sequelize"

export class PgClient {
    
    private conn: Sequelize
    constructor() {
        this.conn = new Sequelize('postgres://postgres:postgrespassword@postgres:5432/postgres')    
    }

    public async test()
    {
        try {
            await this.conn.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        } 
    }

    public async close()
    {
        try {
            await this.conn.close();
            console.log('Connection has been closed.');
        } catch (error) {
            console.error('Unable to close connection:', error);
        } 
    }

}

