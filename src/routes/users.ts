import { Router } from 'express';
import { User } from '../models/User';
import { v4 as uuidv4 } from 'uuid';
import { paginate } from '../middleware/pagination';

const router = Router();

router.post('/', async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).send({ error: 'All fields are required' });
  }

  try {
    const user = await User.create({ id: uuidv4(), name, email, phone });
    res.status(201).send(user);
  } catch (error) {
    res.status(500).send({ error: 'Failed to create user' });
  }
});

router.get('/', paginate(User), (req, res) => {
  res.status(200).json(res.paginatedResults);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    await user.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).send({ error: 'Failed to delete user' });
  }
});

export default router;
