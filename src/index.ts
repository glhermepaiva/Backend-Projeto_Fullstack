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
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

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

app.get("/teste", async (req: Request, res: Response) => {

  try {
      res.status(200).send("Oi, seu server está funcionando!");
  } catch (error) {
      res.status(400).send("ERRO");
  }
});