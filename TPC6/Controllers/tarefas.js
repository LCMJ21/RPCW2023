const tarefa = require("../models/tarefa");

module.exports.list = () => {
  return tarefa
    .find()
    .then((data) => data)
    .catch((err) => err);
};

module.exports.get = (tarefa_id) => {
    console.log(tarefa_id)
    return tarefa
    .findOne({tarefa_id})
    .then((data) => data)
    .catch((err) => err);
}

module.exports.insert = (tarefa_data) => {
    return tarefa.create(tarefa_data)
}

module.exports.put = (tarefa_data) => {
    return tarefa.updateOne({ id: tarefa_data.id}, tarefa_data);
}

module.exports.delete = (tarefa_id) => {
    return tarefa.deleteOne({ tarefa_id });
}