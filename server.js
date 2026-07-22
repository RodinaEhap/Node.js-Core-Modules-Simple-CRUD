const http = require("http");
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "user.json");

function readUsers() {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]));
    return [];
  }
  const fileData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(fileData || "[]");
}

function writeUsers(users) {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2), "utf-8");
}

function getRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk.toString()));
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(err);
      }
    });
  });
}

const server = http.createServer(async (req, res) => {
  res.setHeader("Content-Type", "application/json");

  // q1: GET /user
  if (req.url === "/user" && req.method === "GET") {
    const users = readUsers();
    res.statusCode = 200;
    return res.end(JSON.stringify(users));
  }

  // q2: POST /user
  if (req.url === "/user" && req.method === "POST") {
    try {
      const body = await getRequestBody(req);
      const { name, age, email } = body;
      const users = readUsers();

      if (!name || !age || !email) {
        res.statusCode = 400;
        return res.end(
          JSON.stringify({ message: "Name, age, and email are required" }),
        );
      }

      const emailExists = users.some((u) => u.email === email);
      if (emailExists) {
        res.statusCode = 400;
        return res.end(JSON.stringify({ message: "Email already exists" }));
      }

      const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
      const newUser = { id: newId, name, age, email };
      users.push(newUser);
      writeUsers(users);
      res.statusCode = 201;
      return res.end(
        JSON.stringify({ message: "User created successfully", user: newUser }),
      );
    } catch (err) {
      res.statusCode = 400;
      return res.end(JSON.stringify({ message: "Invalid JSON body" }));
    }
  }
  // q3: GET /user/:id
  if (req.url.startsWith("/user/") && req.method === "GET") {
    const id = parseInt(req.url.split("/")[2]);
    const users = readUsers();
    const user = users.find((u) => u.id === id);

    if (!user) {
      res.statusCode = 404;
      return res.end(JSON.stringify({ message: "User not found" }));
    }
    res.statusCode = 200;
    return res.end(JSON.stringify(user));
  }
  // q4: PATCH /user/:id
  if (req.url.startsWith("/user/") && req.method === "PATCH") {
    try {
      const id = parseInt(req.url.split("/")[2]);
      const body = await getRequestBody(req);
      const users = readUsers();
      const userIndex = users.findIndex((u) => u.id === id);
      if (userIndex === -1) {
        res.statusCode = 404;
        return res.end(JSON.stringify({ message: "User not found" }));
      }
      if (body.name) users[userIndex].name = body.name;
      if (body.age) users[userIndex].age = body.age;
      if (body.email) users[userIndex].email = body.email;
      writeUsers(users);
      res.statusCode = 200;
      return res.end(
        JSON.stringify({
          message: "User updated successfully",
          user: users[userIndex],
        }),
      );
    } catch (err) {
      res.statusCode = 400;
      return res.end(JSON.stringify({ message: "Invalid JSON body" }));
    }
  }

  // q5: DELETE /user/:id
  if (req.url.startsWith("/user/") && req.method === "DELETE") {
    const id = parseInt(req.url.split("/")[2]);
    let users = readUsers();

    const userExists = users.some((u) => u.id === id);
    if (!userExists) {
      res.statusCode = 404;
      return res.end(JSON.stringify({ message: "User not found" }));
    }

    users = users.filter((u) => u.id !== id);
    writeUsers(users);

    res.statusCode = 200;
    return res.end(JSON.stringify({ message: "User deleted successfully" }));
  }

  // Route Not Found
  res.statusCode = 404;
  res.end(JSON.stringify({ message: "Route not found" }));
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
