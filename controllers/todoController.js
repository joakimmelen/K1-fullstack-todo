const Todo = require("../models/todoModel")

const { getPostData } = require("../utils")

async function getTodos(req, res) {
    try {
        const todos = await Todo.findAll()

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(todos));

    } catch (error) {
        console.log(error)
    }
}

async function getTodo(req, res, id) {
    try {
        const todo = await Todo.findById(id)

        if(!todo) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Todo not found"}));
        } else {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(todo));
        }
    } catch (error) {
        console.log(error)
    }
}

async function createTodo(req, res) {
    try {
        const body = await getPostData(req)

        const { title, description, done } = JSON.parse(body)

        const todo = {
            title,
            description,
            done
        }

        const newTodo = await Todo.create(todo)

        res.writeHead(201, { "Content-Type": "application/json" })
        return res.end(JSON.stringify(newTodo))

    } catch (error) {
        console.log(error)
    }
}

async function updateTodo(req, res, id) {
    try {
        const todo = await Todo.findById(id) 

        if(!todo) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Todo not found"}));
        } else {
            const body = await getPostData(req)

            const { title, description } = JSON.parse(body)
    
            const todoData = {
                title: title || todo.title,
                description: description || todo.description,
                done: false
            }
    
            const updatedTodo = await Todo.update(id, todoData)
    
            res.writeHead(200, { "Content-Type": "application/json" })
            return res.end(JSON.stringify(updatedTodo))
    
        }

    } catch (error) {
        console.log(error)
    }
}

async function deleteTodo(req, res, id) {
    try {
        const todo = await Todo.findById(id)

        if(!todo) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Todo not found"}));
        } else {
            await Todo.remove(id)
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: `Todo ${id} removed` }));
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getTodos,
    getTodo,
    createTodo,
    updateTodo,
    deleteTodo
}