import express from 'express';
import AuthRoutes from './routes/auth.routes';
const app = express();

let user = {
    userName: "test@test.com",
    password: "12345"
}

app.use(express.json());
app.use('/api/auth',AuthRoutes)

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

app.post('/user', (req, res) => {
    const { userName, password } = req.body;
    if (user.userName == userName && user.password == password) {
        res.status(200).json({ status: 'ok' });
    }
    else
        res.status(400).json({ status: 'Incrorrect creds' })

});

export default app;
