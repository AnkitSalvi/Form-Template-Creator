export const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.1",
    info: {
      title: "QWLT API",
      description: "API documentation for QWLT APP",
      contact: {
        name: "My Name",
      },
      servers: [`http://localhost:${process.env.PORT}`],
    },
    components: {
      schemas: {
        login: {
          type: "object",
          properties: {
            email: {
              type: "string",
              description: "User's email",
              example: "someone@gmail.com",
            },
            password: {
              type: "string",
              description: "User's password",
              example: "s9",
            },
          },
          required: ["email", "password"],
        },
        UpdatedRequestType: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "Unique identifier for the request type",
              example: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            },
            requestType: {
              type: "string",
              description: "The category or nature of the request",
              example: "NDA Request - sales",
            },
            purpose: {
              type: "string",
              description: "The purpose of the request type",
              example: "Request to establish a sales NDA...",
            },
            informationToCollect: {
              type: "array",
              items: {
                $ref: "#/components/schemas/InformationToCollect",
              },
            },
            requestTypeOwner: {
              type: "string",
              description:
                "Email id of the user responsible for this request type",
              example: "owner@example.com",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Date and time when this request type was created",
              example: "2024-08-14T12:34:56.789Z",
            },
          },
          required: ["id", "requestDetails"],
        },
        RequestType: {
          type: "object",
          properties: {
            userId: {
              type: "string",
              description: "Unique identifier for the request type",
              example: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            },
            requestDetails: {
              type: "object",
              properties: {
                requestType: {
                  type: "string",
                  description: "The category or nature of the request",
                  example: "NDA Request - sales",
                },
                purpose: {
                  type: "string",
                  description: "The purpose of the request type",
                  example: "Request to establish a sales NDA...",
                },
                informationToCollect: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/InformationToCollect",
                  },
                },
                requestTypeOwner: {
                  type: "string",
                  description:
                    "Email id of the user responsible for this request type",
                  example: "owner@example.com",
                },
                createdAt: {
                  type: "string",
                  format: "date-time",
                  description:
                    "Date and time when this request type was created",
                  example: "2024-08-14T12:34:56.789Z",
                },
              },
              required: [
                "requestType",
                "purpose",
                "informationToCollect",
                "requestTypeOwner",
                "createdAt",
              ],
            },
          },
          required: ["id", "requestDetails"],
        },
        InformationToCollect: {
          type: "object",
          properties: {
            field: {
              type: "string",
              description: "The field name",
              example: "Confidential Information",
            },
            type: {
              type: "string",
              enum: ["text", "long-text", "date", "select"],
              description: "The type of the field",
              example: "text",
            },
            required: {
              type: "boolean",
              description: "Whether this field is required",
              example: true,
            },
            example: {
              type: "string",
              description: "An example value for this field",
              example: "Pricing details",
            },
            options: {
              type: "array",
              items: {
                type: "string",
              },
              description: "Options for select-type fields",
              example: ["Option 1", "Option 2"],
            },
          },
          required: ["field", "type", "required"],
        },
        User: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "Unique identifier for the user",
              example: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            },
            name: {
              type: "string",
              description: "Name of the user",
              example: "John Doe",
            },
            email: {
              type: "string",
              description: "Email of the user",
              example: "john.doe@example.com",
            },
            password: {
              type: "string",
              description: "Password for the user account",
              example: "securepassword",
            },
            role: {
              type: "string",
              description: "Role of the user",
              example: "admin",
            },
          },
          required: ["name", "email", "password", "role"],
        },
        UserRequestType: {
          type: "object",
          properties: {
            userId: {
              type: "string",
              description: "Unique identifier for the user",
              example: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            },
            requestTypeId: {
              type: "string",
              description: "Unique identifier for the request type",
              example: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            },
            assignedAt: {
              type: "string",
              format: "date-time",
              description:
                "Date and time when this request type was assigned to the user",
              example: "2024-08-14T12:34:56.789Z",
            },
          },
          required: ["userId", "requestTypeId", "assignedAt"],
        },
      },
      securitySchemes: {
        Bearer: {
          type: "apiKey",
          name: "Authorization",
          in: "header",
        },
      },
    },
    security: [
      {
        Bearer: [],
      },
    ],
  },
  apis: [`./src/routes/*.ts`], // This will point to all the route files in the routes directory
};
