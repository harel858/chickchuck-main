import signUp from "@lib/routes/user/signup";
const mockDb = { createUser: jest.fn(), getIdByEmail: jest.fn() };
const req: any = {
  body: {},
  method: "POST",
};
const json = jest.fn();
const status = jest.fn(() => {
  return { json, end: jest.fn() };
});
const res: any = { status, setHeader: jest.fn() };
const bodyData = [
  {
    name: "username1",
    email: "username1@emple.com",
    password: "password1",
    businessName: "MyBsiness1",
  },
  {
    name: "username2",
    email: "username2@emple.com",
    password: "password2",
    businessName: "MyBsiness2",
  },
  {
    name: "username3",
    email: "username3@emple.com",
    password: "password3",
    businessName: "MyBsiness3",
  },
  {
    name: "username4",
    email: "username4@emple.com",
    password: "password4",
    businessName: "MyBsiness4",
  },
];
describe("user/signup", () => {
  beforeEach(() => {
    mockDb.createUser.mockReset();
    mockDb.getIdByEmail.mockReset();
    status.mockClear(); // Reset the calls length for the status mock
  });
  describe("given a username and password", () => {
    test("should reponse withd status code of 400 if user already exist", async () => {
      for (let i = 0; i < bodyData.length; i++) {
        mockDb.getIdByEmail.mockReset();
        mockDb.getIdByEmail.mockResolvedValue(i + 1);
        await signUp(
          {
            ...req,
            body: bodyData[i],
          },
          res,
          mockDb
        );
        expect(status.mock.calls.length).toBe(i + 1);
        expect(mockDb.getIdByEmail.mock.calls.length).toBe(1);
        expect(mockDb.getIdByEmail.mock.calls[0][0]).toBe(bodyData[i].email);
        expect(status.mock.calls[0]).toEqual([400]);
      }
    });
    test("should response with a json object containg the new userId", async () => {
      for (let i = 0; i < bodyData.length; i++) {
        mockDb.createUser.mockReset();
        mockDb.getIdByEmail.mockResolvedValue(null);
        mockDb.createUser.mockResolvedValue(i + 1);
        await signUp(
          {
            ...req,
            body: bodyData[i],
          },
          res,
          mockDb
        );

        const createUserCalls = mockDb.createUser.mock.calls[0][0];
        expect(status.mock.calls.length).toBe(i + 1);
        expect(mockDb.createUser.mock.calls.length).toBe(1);
        expect(createUserCalls.name).toBe(bodyData[i].name);
        expect(createUserCalls.email).toBe(bodyData[i].email);
        expect(createUserCalls.businessName).toBe(bodyData[i].businessName);
        expect(createUserCalls.password).not.toBe(bodyData[i].password);
        expect(status.mock.calls[0]).toEqual([201]);
      }
    });
  });
});
