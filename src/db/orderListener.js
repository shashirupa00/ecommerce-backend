const { MongoClient } = require('mongodb');
const {
  initConductorClient,
  StartWorkflowRequest,
} = require('../conductor/conductorClient');

const uri =
  process.env.MONGODB_URI ||
  'mongodb+srv://shashishirupa00:qwerty12345@cluster0.nyogk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(uri);

async function startOrderListener() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('test');
    const collection = db.collection('orders');

    const changeStream = collection.watch();

    const conductorClient = await initConductorClient();

    changeStream.on('change', async (change) => {
      if (change.operationType === 'insert') {
        const newOrder = change.fullDocument;
        console.log('New order detected:', newOrder._id);

        try {
          const request = {
            name: 'OrderFulfillmentWorkflow',
            version: 1,
            input: {
              orderId: newOrder._id.toString(),
              apiUrl: 'https://ecommerce-backend-b0af.onrender.com/',
            },
          };
          const workflowId =
            await conductorClient.workflowResource.startWorkflow(request); // Await the Promise
          console.log('Workflow started for order:', workflowId); // This will print the actual workflow ID when resolved
        } catch (error) {
          console.error('Error starting workflow:', error);
        }
      }
    });

    console.log('Listening for new orders...');
  } catch (error) {
    console.error('Error in order listener:', error);
  }
}

startOrderListener();

module.exports = { startOrderListener };
