var express = require('express');
var router = express.Router();
var Tarefas = require('../Controllers/tarefas')

/* GET home page. */
router.get('/', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  Tarefas.list()
    .then(tarefas => res.render('index', {tarefas: tarefas, d, tarefas_edit: undefined}))
    .catch(error => res.render('error', {error}))
});

router.post('/', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  if (req.body.type == "NEW"){
    Tarefas.insert({description: req.body.description, owner: req.body.owner, date: req.body.date, completed: false})
      .then(Tarefas.list()
              .then(tarefas => res.render('index', {tarefas: tarefas, d, tarefas_edit: undefined}))
              .catch(error => res.render('error', {error})))
      .catch(error => res.render('error', {error}))
  }
  else if (req.body.type == "COMPLETED"){
    Tarefas.get(req.body.id)
    .then(tarefa => {Tarefas.put({id: tarefa.id, description: tarefa.description, owner: tarefa.owner, date: tarefa.date, completed: !tarefa.completed })
                          .then(Tarefas.list()
                                  .then(tarefas => res.render('index', {tarefas: tarefas, d, tarefas_edit: undefined}))
                                  .catch(error => res.render('error', {error})))})
      .catch(error => res.render('error', {error}))
  }
  else if (req.body.type == "EDIT"){
    Tarefas.list()
    .then(tarefas => res.render('index', {tarefas: tarefas, d, tarefas_edit: tarefas.filter(t => t.id == req.body.id)[0]}))
    .catch(error => res.render('error', {error}))
  }
  else if (req.body.type == "REMOVE"){
    Tarefas.delete(req.body.id)
      .then(Tarefas.list()
              .then(tarefas => res.render('index', {tarefas: tarefas, d, tarefas_edit: undefined}))
              .catch(error => res.render('error', {error})))
      .catch(error => res.render('error', {error}))
  }
  else if (req.body.type == "CHANGE"){
    Tarefas.put({id: req.body.id, description: req.body.description, owner: req.body.owner, date: req.body.date, completed: (req.body.completed === "true") })
      .then(Tarefas.list()
              .then(tarefas => res.render('index', {tarefas: tarefas, d, tarefas_edit: undefined}))
              .catch(error => res.render('error', {error})))
      .catch(error => res.render('error', {error}))
  }
})

module.exports = router;
