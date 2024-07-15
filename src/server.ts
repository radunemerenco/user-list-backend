import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Import cors
import { sequelize } from './models';
import userRoutes from './routes/users';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors()); // Use cors middleware
app.use(express.json());
app.use('/api/users', userRoutes);

sequelize.sync({ force: true }).then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
