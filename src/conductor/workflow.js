const { initConductorClient } = require('./initConductor');

async function defineWorkflow() {
  const client = await initConductorClient();
  const metadata = {
    name: 'order_fulfillment_workflow',
    description: 'Process order from creation to delivery',
    version: 1,
    tasks: [
      {
        name: 'get_order_details',
        taskReferenceName: 'get_order_details',
        type: 'HTTP',
        inputParameters: {
          http_request: {
            uri: '${workflow.input.apiUrl}/api/orders/${workflow.input.orderId}',
            method: 'GET',
          },
        },
      },
      {
        name: 'process_payment',
        taskReferenceName: 'process_payment',
        type: 'HTTP',
        inputParameters: {
          http_request: {
            uri: '${workflow.input.apiUrl}/api/orders/${workflow.input.orderId}/process-payment',
            method: 'POST',
            body: {
              orderId: '${workflow.input.orderId}',
              amount: '${get_order_details.output.body.totalAmount}',
            },
          },
        },
      },
      {
        name: 'update_order_status',
        taskReferenceName: 'update_order_status',
        type: 'HTTP',
        inputParameters: {
          http_request: {
            uri: '${workflow.input.apiUrl}/api/orders/${workflow.input.orderId}/status',
            method: 'PATCH',
            body: {
              status: 'processing',
            },
          },
        },
      },
    ],
    outputParameters: {
      orderStatus: '${update_order_status.output.body.status}',
    },
  };

  try {
    await client.metadataResource.updateWorkflowDef([metadata]);
    console.log('Workflow defined successfully');
  } catch (error) {
    console.error('Error defining workflow:', error);
  }
}

module.exports = { defineWorkflow };
