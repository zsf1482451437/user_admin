const request = require("supertest");
const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const router = require("./user");
const UserController = require("../controllers/user");

jest.mock("../controllers/user");

const createApp = () => {
  const app = new Koa();
  app.use(bodyParser());
  app.use(router.routes());
  app.use(router.allowedMethods());
  return app;
};

describe("POST /login", () => {
  let app;

  beforeAll(() => {
    app = createApp();
  });

  const testCases = [
    {
      description: "Login successful",
      requestBody: { username: "testuser", password: "testpassword" },
      mockImplementation: async (ctx) => {
        ctx.status = 200;
        ctx.body = { message: "Login successful" };
      },
      expectedStatus: 200,
      expectedBody: { message: "Login successful" },
    },
    {
      description: "Invalid credentials",
      requestBody: { username: "wronguser", password: "wrongpassword" },
      mockImplementation: async (ctx) => {
        ctx.status = 401;
        ctx.body = { message: "Invalid credentials" };
      },
      expectedStatus: 401,
      expectedBody: { message: "Invalid credentials" },
    },
  ];

  testCases.forEach(
    ({
      description,
      requestBody,
      mockImplementation,
      expectedStatus,
      expectedBody,
    }) => {
      it(description, async () => {
        UserController.login.mockImplementation(mockImplementation);

        const response = await request(app.callback())
          .post("/login")
          .send(requestBody);

        expect(response.status).toBe(expectedStatus);
        expect(response.body).toEqual(expectedBody);
      });
    }
  );
});
