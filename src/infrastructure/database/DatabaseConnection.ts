import Connection from "./Connection";
import pgp from 'pg-promise';

export default class DatabaseConnection implements Connection {
  pgp: any

  constructor() {
    if (process.env.DB_URL) this.pgp = pgp()(process.env.DB_URL);
    if (this.pgp) console.log('Connected to Database')
  }

  query(statement: string, params?: any): Promise<any> {
    return this.pgp.any(statement, params);
  };

  close(): Promise<void> {
    return this.pgp.$pool.end();
  };
}