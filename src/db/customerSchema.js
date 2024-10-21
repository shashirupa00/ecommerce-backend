const customerSchema = {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['name', 'email', 'createdAt'],
      properties: {
        name: {
          bsonType: 'string',
          description: 'must be a string and is required',
        },
        email: {
          bsonType: 'string',
          pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
          description: 'must be a valid email address and is required',
        },
        phone: {
          bsonType: 'string',
          description: 'must be a string if the field exists',
        },
        address: {
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
          description: 'must be a date',
        },
      },
    },
  },
};

module.exports = customerSchema;
