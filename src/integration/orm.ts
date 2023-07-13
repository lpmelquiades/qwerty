import { DataTypes, Model, Sequelize } from "sequelize"

export class ORM {
    
    private conn: Sequelize
    public readonly user: any
    constructor() {
        this.conn = new Sequelize('postgres://postgres:postgrespassword@postgres:5432/postgres')
        this.user = this.initUser()
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

    public async sync() {
        await this.conn.sync({ force: false })
    }

    private initUser() {
        return this.conn.define('user', {
            firstName: {
              type: DataTypes.STRING,
              allowNull: false
            },
            lastName: {
              type: DataTypes.STRING
            }
          }
        )
    }
}

