import signup from "@api/user/signup";
test("user/signup", async () => {
  const req: any = {
    body: {
      name: "John Doe",
      email: "jhn@emple.com",
      password: "password123",
      businessName: "MyBsiness",
    },
    method: "POST",
  };
  const json = jest.fn();
  const status = jest.fn(() => {
    return { json, end: jest.fn() };
  });
  const res: any = { status, setHeader: jest.fn() };
  await signup(req, res);
  console.log(status.mock.calls);
});
