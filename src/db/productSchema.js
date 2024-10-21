const productSchema = {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['name', 'description', 'price', 'stock'],
      properties: {
        name: {
          bsonType: 'string',
          description: 'must be a string and is required',
        },
        description: {
          bsonType: 'string',
          description: 'must be a string and is required',
        },
        price: {
          bsonType: 'decimal',
          minimum: 0,
          description: 'must be a positive decimal and is required',
        },
        stock: {
          bsonType: 'int',
          minimum: 0,
          description: 'must be a non-negative integer and is required',
        },
        category: {
          bsonType: 'string',
          description: 'must be a string if the field exists',
        },
        images: {
          bsonType: 'array',
          items: {
            bsonType: 'string',
            description: 'must be a string (URL)',
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

module.exports = productSchema;
