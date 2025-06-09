import * as userService from './user.service';
export const getAllUsers = async (req, res) => {
    const users = await userService.findAll();
    res.status(200).json(users);
};
export const getUserById = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const user = await userService.findById(id);
    if (user) {
        res.status(200).json(user);
    }
    else {
        res.status(404).json({ message: 'User not found' });
    }
};
export const createUser = async (req, res) => {
    const newUser = await userService.create(req.body);
    res.status(201).json(newUser);
};
export const updateUser = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const user = await userService.findById(id);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    const updatedUser = await userService.update(id, req.body);
    res.status(200).json(updatedUser);
};
export const deleteUser = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const user = await userService.findById(id);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    await userService.remove(id);
    res.status(204).send();
};
