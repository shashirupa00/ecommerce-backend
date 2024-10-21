const express = require('express');
const { Decimal128, ObjectId } = require('mongodb');
const { connectToDatabase } = require('../../db');

const router = express.Router();

// Create a new order
router.post('/', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const order = {
      ...req.body,
      customerId: new ObjectId(req.body.customerId),
      items: req.body.items.map((item) => ({
        ...item,
        productId: new ObjectId(item.productId),
        price: Decimal128.fromString(item.price.toString()),
        quantity: parseInt(item.quantity, 10), // Ensure quantity is an integer
      })),
      totalAmount: Decimal128.fromString(req.body.totalAmount.toString()),
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'pending',
    };
    const result = await db.collection('orders').insertOne(order);
    res.status(201).json({ id: result.insertedId, ...order });
  } catch (error) {
    console.error('Error creating order:', JSON.stringify(error, null, 2));
    res.status(500).json({
      error: 'Error creating order',
      details: error.errInfo?.details || error.message,
    });
  }
});

// Get an order by ID
router.get('/:id', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const order = await db
      .collection('orders')
      .findOne({ _id: new ObjectId(req.params.id) });
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Error fetching order' });
  }
});

// Update an order's status
router.patch('/:id/status', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const { id } = req.params;
    const { status } = req.body;
    const result = await db
      .collection('orders')
      .updateOne(
        { _id: new ObjectId(id) },
        { $set: { status, updatedAt: new Date() } }
      );
    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json({ status, message: 'Order status updated successfully' });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ error: 'Error updating order status' });
  }
});

// Delete an order
router.delete('/:id', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const result = await db
      .collection('orders')
      .deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount > 0) {
      res.json({ message: 'Order deleted successfully' });
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ error: 'Error deleting order' });
  }
});

// Process payment
router.post('/:id/process-payment', async (req, res) => {
  try {
    const { id } = req.params;
    const { amount } = req.body;
    // Implement your payment processing logic here
    // For this example, we'll just simulate a successful payment
    res.json({
      status: 'success',
      message: `Payment of ${amount} processed for order ${id}`,
    });
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({ error: 'Error processing payment' });
  }
});

module.exports = router;
