const jwt = require('jsonwebtoken');

exports.protect = (req, res, next) => {
  let token;

  
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      
      token = req.headers.authorization.split(' ')[1];

     
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      
      req.user = decoded; 

      next(); 

    } catch (error) {
      return res.status(401).json({ message: 'Token inválido ou expirado' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Acesso negado, token não fornecido' });
  }
};