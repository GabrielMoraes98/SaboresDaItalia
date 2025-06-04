import express from 'express';
import { Mongo } from '../database/mongo.js';
import { ObjectId } from 'mongodb';
import { verifyAdmin } from '../middlewares/adminMiddleware.js';

const adminRouter = express.Router();

adminRouter.get('/users', verifyAdmin, async (req, res) => {
  try {
    const users = await Mongo.db.collection('users')
      .find({}, { projection: { password: 0, salt: 0 } })
      .toArray();
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Erro ao buscar usuários' });
  }
});

adminRouter.get('/orders', verifyAdmin, async (req, res) => {
  try {
    const orders = await Mongo.db.collection('orders').find({}).toArray();
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Erro ao buscar pedidos' });
  }
});

adminRouter.put('/orders/:orderId', verifyAdmin, async (req, res) => {
  const { orderId } = req.params;
  const newStatus = req.body.pickupStatus; 
  try {
    const result = await Mongo.db.collection('orders').updateOne(
      { _id: new ObjectId(orderId) },
      { $set: { pickupStatus: newStatus } }
    );
    if (result.modifiedCount === 1) {
      return res.json({ success: true, message: "Status do pedido atualizado com sucesso" });
    } else {
      return res.status(404).json({ success: false, message: "Pedido não encontrado" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Erro interno no servidor", error: error.message });
  }
});

export default adminRouter;

