import express, { Request, Response } from 'express';
import helloRoute from './routes/hello';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/hello', helloRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('🚀 Express + TypeScript Server is Running');
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
