const User = require('../models/User');


exports.create = async (req, res) => {
    
    const { email, password, role } = req.body;

    try {
        const newUser = new User({ email, password, role });
        const savedUser = await newUser.save();

        
        const userResponse = savedUser.toObject();
        delete userResponse.password;

        res.status(201).json(userResponse);
    } catch (error) {
        if (error.code === 11000) { 
            return res.status(400).json({ message: 'E-mail já cadastrado.' });
        }
        res.status(500).json({ message: 'Erro ao criar usuário.', error: error.message });
    }
};


exports.findAllByRole = async (req, res) => {
    const { role } = req.params; 

    try {
        const users = await User.find({ role }).select('-password -__v');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: `Erro ao buscar ${role}s.`, error: error.message });
    }
};


exports.update = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        
        const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true, runValidators: true }).select('-password -__v');

        if (!updatedUser) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar usuário.', error: error.message });
    }
};


exports.remove = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await User.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        res.json({ message: 'Usuário removido com sucesso.' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao remover usuário.', error: error.message });
    }
};