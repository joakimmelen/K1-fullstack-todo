const http = require("http");
const { getTodos, getTodo, createTodo, updatePartialTodo, updateTodo, deleteTodo } = require("./controllers/todoController")

const server = http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, PATCH, DELETE, OPTIONS, POST, PUT"
    );
  
    if (req.method === "OPTIONS") {
      res.statusCode = 200;
      return res.end();
    }

    if (req.url === "/api/todos" && req.method === "GET") {
        getTodos(req, res)
    } else if(req.url.match(/\/api\/todos\/([0-9]+)/) && req.method === "GET") {
        const id = req.url.split("/")[3]
        getTodo(req, res, id)
    } else if(req.url === "/api/todos" && req.method === "POST") {
        createTodo(req, res)
    } else if(req.url.match(/\/api\/todos\/([0-9]+)/) && req.method === "PATCH") {
        const id = req.url.split("/")[3]
        updatePartialTodo(req, res, id)
    } else if(req.url.match(/\/api\/todos\/([0-9]+)/) && req.method === "PUT") {
        const id = req.url.split("/")[3]
        updateTodo(req, res, id)
    } else if(req.url.match(/\/api\/todos\/([0-9]+)/) && req.method === "DELETE") {
        const id = req.url.split("/")[3]
        deleteTodo(req, res, id)
} else {
        res.writeHead(404, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ message: "Route not found" }));
    }
})

const PORT = process.env.PORT || 666

server.listen(PORT , () => console.log(`Server running on ${PORT}`))