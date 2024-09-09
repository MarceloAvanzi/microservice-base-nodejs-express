import DatabaseConnection from './DatabaseConnection';
import bcrypt from 'bcrypt';

async function seed() {
  try {
    const db = new DatabaseConnection();
    const hashPassword = await bcrypt.hash("secret", 10);

    const userQuery = `INSERT INTO eccommercedb.user (id, name, email, password, profile_image) 
                       VALUES (1, 'Admin', 'admin@jsonapi.com', $1, '')`;

    await db.query("INSERT INTO eccommercedb.user (id, name, email, password, profile_image) VALUES (1, 'Admin', 'admin@jsonapi.com', $1, '')", [hashPassword]);

    await db.close();
  } catch (error) {
    console.error('Seeding Error:', error);
  }
}

seed();
