var store = require('store');

const getData = (key) => { 
  var data = store.get(key);
  return data;
}

const setData = (key, data) => { 
  var existedData = getData(key);
  var expandableData = {};
  if (existedData) expandableData = existedData;
  store.set(key, {
    ...expandableData,
    ...data
  });
}

exports.setData = setData
exports.getData = getData