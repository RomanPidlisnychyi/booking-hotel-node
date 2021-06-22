require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRouter = require('./router/authRouter');
const userRouter = require('./router/userRouter');
const roomRouter = require('./router/roomRouter');
const orderRouter = require('./router/orderRouter');
const { sequelize } = require('./helpers/initDatabase');
const { authorized } = require('./validation/validation');
const { asyncWrapper } = require('./helpers/asyncWrapper');
const { handlerErrors } = require('./errors/handlerErrors');

(async () => {
  const app = express();

  const PORT = process.env.PORT || 3001;

  app.use(express.json());
  app.use(cors());

  app.use(asyncWrapper(authorized));
  app.get('/', (req, res, next) => {
    return req.user && req.user.status === 'admin'
      ? res.status(200).json(process.env)
      : res.status(404).json({ message: 'Not found' });
  });
  app.use('/auth', authRouter);
  app.use('/users', userRouter);
  app.use('/rooms', roomRouter);
  app.use('/orders', orderRouter);
  app.use(handlerErrors);

  await sequelize.sync();

  app.listen(PORT, () => {
    console.log('Server was started on port', PORT);
  });
})();
