import { Sequelize } from "sequelize"

export class PgClient {
    
    private client: Sequelize
    constructor() {
        this.client = new Sequelize('postgres://postgres:postgrespassword@localhost:5432/postgres')
    }

    public async conn(): Promise<any>
    {
        try {
            await this.client.authenticate();
            console.log('Connection has been established successfully.');
          } catch (error) {
            console.error('Unable to connect to the database:', error);
          } 
    }
}

