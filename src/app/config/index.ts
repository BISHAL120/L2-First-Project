import dotenv from 'dotenv';
import Path from 'path';

dotenv.config({ path: Path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
  dafault_pass: process.env.DEFAULT_PASS,
};
