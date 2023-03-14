var axios = require('axios');

module.exports.list = () => {
    return axios.get('http://localhost:3000/tarefas?_sort=id')
        .then(response => response.data)
        .catch(error => error)
}

module.exports.get = (tarefa_id) => {
    return axios.get('http://localhost:3000/tarefas/' + tarefa_id)
        .then(response => response.data)
        .catch(error => error)
}

module.exports.insert = (tarefa) => {
    return axios.post('http://localhost:3000/tarefas', tarefa)
        .then(response => response.data)
        .catch(error => error)
}

module.exports.put = (tarefa) => {
    return axios.put('http://localhost:3000/tarefas/' + tarefa.id, tarefa)
        .then(response => response.data)
        .catch(error => error)
}

module.exports.delete = (tarefa_id) => {
    return axios.delete('http://localhost:3000/tarefas/' + tarefa_id)
        .then(response => response.data)
        .catch(error => error)
}