const { orkesConductorClient } = require('@io-orkes/conductor-javascript');
require('dotenv').config();

const config = {
  keyId: '3281a278-8b65-11ef-993d-2e5ad1647bc9',
  keySecret: 'yF41Lt3C5fsnqcSqdrckuZc11ILP6e30mNVPaxBsmyUFzpnb',
  serverUrl: 'https://play.orkes.io/api',
};

async function initConductorClient() {
  try {
    console.log(
      'Initializing Conductor client with config:',
      JSON.stringify(config, null, 2)
    );
    const client = await orkesConductorClient(config);
    console.log('Conductor client initialized successfully');
    return client;
  } catch (error) {
    console.error('Error initializing Conductor client:', error);
    throw error;
  }
}

module.exports = { initConductorClient };

// const { orkesConductorClient } = require('@io-orkes/conductor-javascript');
// require('dotenv').config();

// const config = {
//   keyId: process.env.CONDUCTOR_KEY,
//   keySecret: process.env.CONDUCTOR_SECRET,
//   serverUrl: process.env.CONDUCTOR_SERVER_URL,
// };

// async function initConductorClient() {
//   try {
//     console.log(
//       'Initializing Conductor client with config:',
//       JSON.stringify(config, null, 2)
//     );
//     const client = await orkesConductorClient(config);
//     console.log('Conductor client initialized successfully');
//     return client;
//   } catch (error) {
//     console.error('Error initializing Conductor client:', error);
//     throw error;
//   }
// }
// module.exports = { initConductorClient };

// conductorClient.js
// const { orkesConductorClient } = require('@io-orkes/conductor-javascript');
// require('dotenv').config();

// const config = {
//   keyId: process.env.CONDUCTOR_KEY,
//   keySecret: process.env.CONDUCTOR_SECRET,
//   serverUrl: process.env.CONDUCTOR_SERVER_URL,
// };

// const initializeConductorClient = async () => {
//   try {
//     const clientPromise = orkesConductorClient(config);
//     const client = await clientPromise;
//     console.log('Conductor client initialized successfully');
//     return client;
//   } catch (error) {
//     console.error('Error initializing Conductor client:', error);
//     throw error;
//   }
// };

// module.exports = { initializeConductorClient };
// serverUrl: 'https://play.orkes.io/api/',
// apiKey: '3281a278-8b65-11ef-993d-2e5ad1647bc9',
// apiSecret: 'yF41Lt3C5fsnqcSqdrckuZc11ILP6e30mNVPaxBsmyUFzpnb',
