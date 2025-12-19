import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Library Management API",
      version: "1.0.0",
      description: "API quản lý Author và Book (Express + Prisma + PostgreSQL)"
    },
    servers: [
      {
        url: process.env.URL_API || "http://localhost:3001",
        description: "Local server"
      }
    ],
    components: {
      schemas: {
        Author: {
          type: "object",
          required: ["name"],
          properties: {
            id: { type: "integer", example: 1 },
            name: { type: "string", example: "J.K. Rowling" },
            bio: {
              type: "string",
              nullable: true,
              example: "British author, best known for Harry Potter"
            }
          }
        },

        Book: {
          type: "object",
          required: ["title", "price", "authorId"],
          properties: {
            id: { type: "integer", example: 1 },
            title: { type: "string", example: "Harry Potter" },
            price: { type: "number", format: "float", example: 19.99 },
            authorId: { type: "integer", example: 1 }
          }
        },

        SuccessResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            message: { type: "string", example: "Success" },
            data: {}
          }
        },

        ValidationError: {
          type: "object",
          properties: {
            errors: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  msg: { type: "string", example: "Name is required" },
                  path: { type: "string", example: "name" }
                }
              }
            }
          }
        },

        NotFoundError: {
          type: "object",
          properties: {
            message: { type: "string", example: "Resource not found" }
          }
        },

        ServerError: {
          type: "object",
          properties: {
            message: { type: "string", example: "Internal server error" }
          }
        }
      }
    }
  },

  apis: ["./src/routes/*.js"]
};

const swaggerSpec = swaggerJsdoc(options);

export const swaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
