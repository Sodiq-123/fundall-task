import { createServer } from 'http';
import { config } from 'dotenv-safe';
import app from './app';
import sequelize from './sequelize';

config();

const port = process.env.PORT || 3000;

(async () => {
  await sequelize.sync({ logging: true });
  createServer(app).listen(port, () =>
    console.info(`Server running on port ${port}`)
  );
})();
