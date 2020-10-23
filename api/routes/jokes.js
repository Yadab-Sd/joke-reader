var express = require('express');
var router = express.Router();
var request = require('request');
var store = require('../utils/store');

router.get('/', function (req, res, next) {
  const data = store.getData()
  if (data) {
    res.send(data);
  }
});

router.post('/add', function (req, res, next) {
  
  const newJoke = {
    category: req.body.category,
    type: req.body.type,
    flags: req.body.flags,
    content: req.body.content,
    delivery: req.body.delivery,
  };

  const data = store.getData('jokes')

  if (data) {
    store.setData('jokes', {...data,...newJoke})
  }
  else {
    store.setData('jokes', {...newJoke})
  }

  const newData = store.getData('jokes')

  res.send(newData);
});

module.exports = router;
