import signin from "@lib/routes/user/signin";
const mockDb = { getUserByEmail: jest.fn() };
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
    email: "username1@emple.com",
    password: "password1",
  },
  {
    email: "username2@emple.com",
    password: "password2",
  },
  {
    email: "username3@emple.com",
    password: "password3",
  },
  {
    email: "username4@emple.com",
    password: "password4",
  },
];

describe("POST/signin", () => {
  test("");
});
