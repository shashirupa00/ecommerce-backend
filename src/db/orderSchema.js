const orderSchema = {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: [
        'customerId',
        'items',
        'totalAmount',
        'shippingAddress',
        'status',
        'createdAt',
        'updatedAt',
      ],
      properties: {
        customerId: {
          bsonType: 'objectId',
          description: 'must be an objectId and is required',
        },
        items: {
          bsonType: 'array',
          minItems: 1,
          items: {
            bsonType: 'object',
            required: ['productId', 'quantity', 'price'],
            properties: {
              productId: {
                bsonType: 'objectId',
                description: 'must be an objectId and is required',
              },
              quantity: {
                bsonType: 'int',
                minimum: 1,
                description:
                  'must be an integer greater than 0 and is required',
              },
              price: {
                bsonType: 'decimal',
                minimum: 0,
                description: 'must be a positive decimal and is required',
              },
            },
          },
        },
        totalAmount: {
          bsonType: 'decimal',
          minimum: 0,
          description: 'must be a positive decimal and is required',
        },
        status: {
          bsonType: 'string',
          enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
          description: 'can only be one of the enum values and is required',
        },
        shippingAddress: {
          bsonType: 'object',
          required: ['street', 'city', 'state', 'zipCode', 'country'],
          properties: {
            street: { bsonType: 'string' },
            city: { bsonType: 'string' },
            state: { bsonType: 'string' },
            zipCode: { bsonType: 'string' },
            country: { bsonType: 'string' },
          },
        },
        createdAt: {
          bsonType: 'date',
          description: 'must be a date and is required',
        },
        updatedAt: {
          bsonType: 'date',
          description: 'must be a date and is required',
        },
      },
    },
  },
};

module.exports = orderSchema;
