let todos = require("../data/todos.json")

const { writeDataToFile } = require("../utils")


function generateId() {
    const id = +(new Date().getTime().toString() + Math.floor(Math.random()*10));
    const stringifiedId = id.toString();
    return stringifiedId;
}

function findAll() {
    return new Promise((resolve, reject) => {
        resolve(todos)
    })
}
function findById(id) {
    return new Promise((resolve, reject) => {
        const todo = todos.find((t) => t.id === id)
        resolve(todo)
    })
}


function create(todo) {
    return new Promise((resolve, reject) => {
        const newTodo = {...todo, id: generateId()}
        todos.push(newTodo)
        writeDataToFile("./data/todos.json", todos)
        resolve(newTodo)
    })
}

function update(id, todo) {
    return new Promise((resolve, reject) => {
        const index = todos.findIndex((t) => t.id === id)
        todos[index] = {id, ...todo}
        
        writeDataToFile("./data/todos.json", todos)
        resolve(todos[index])
    })
}

function remove(id) {
    return new Promise((resolve, reject) => {
        todos = todos.filter((t) => t.id !== id)
        writeDataToFile("./data/todos.json", todos)
        resolve()
    })
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
}