const { connectToDatabase } = require('./db');
const orderSchema = require('./orderSchema');
const productSchema = require('./productSchema');
const customerSchema = require('./customerSchema');

async function setupDatabase() {
  const db = await connectToDatabase();

  // Create collections with schemas
  await db.createCollection('orders', orderSchema);
  await db.createCollection('products', productSchema);
  await db.createCollection('customers', customerSchema);

  console.log('Collections created with schemas');

  await db.collection('orders').createIndex({ customerId: 1 });
  await db.collection('orders').createIndex({ status: 1 });
  await db.collection('orders').createIndex({ createdAt: -1 });

  await db.collection('products').createIndex({ name: 1 });
  await db.collection('products').createIndex({ category: 1 });

  await db.collection('customers').createIndex({ email: 1 }, { unique: true });

  console.log('Indexes created');
}

setupDatabase()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Error setting up database:', error);
    process.exit(1);
  });
