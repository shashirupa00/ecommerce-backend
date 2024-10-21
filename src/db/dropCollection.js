const { MongoClient } = require('mongodb');

const uri =
  process.env.MONGODB_URI ||
  'mongodb+srv://shashishirupa00:qwerty12345@cluster0.nyogk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

async function dropCollection() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db();

    const collections = await db.listCollections({ name: 'orders' }).toArray();
    if (collections.length > 0) {
      await db.collection('orders').drop();
      console.log('Orders collection dropped successfully');
    } else {
      console.log('Orders collection does not exist');
    }
  } catch (error) {
    console.error('Error dropping collection:', error);
  } finally {
    await client.close();
  }
}

dropCollection();
