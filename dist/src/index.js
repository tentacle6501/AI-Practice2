import express from 'express';
import userRoutes from './api/users/user.routes';
import authRoutes from './api/auth/auth.routes';
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
}
export default app;
