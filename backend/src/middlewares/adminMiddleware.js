// adminMiddleware.js
import jwt from 'jsonwebtoken';

export function verifyAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }
  
  const token = authHeader.split(' ')[1];
  
  jwt.verify(token, 'secret', (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' });
    }
    
    if (decoded.role !== 'admin') {
      return res.status(403).json({ error: 'Acesso negado. Somente administradores.' });
    }
    
    req.user = decoded;
    next();
  });
}

