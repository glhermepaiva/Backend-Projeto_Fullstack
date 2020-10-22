import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import { AddressInfo } from 'net'
import { userRouter } from './routes/userRouter'
import { imageRouter } from './routes/imageRouter'
import cors from "cors"

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/user', userRouter)
app.use('/image', imageRouter)

const server = app.listen(process.env.PORT, () => {
  if (server) {
      const address = server.address() as AddressInfo;
      console.log(`Server is running in http://localhost: ${address.port}`);
  } else {
      console.error(`Failure upon starting server.`);
  }
});