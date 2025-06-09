import { z } from 'zod';
export const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
export const validate = (schema) => asyncHandler(async (req, res, next) => {
    try {
        await schema.parseAsync(req.body);
        return next();
    }
    catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json(error.errors);
        }
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
