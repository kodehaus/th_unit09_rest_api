'use strict';

exports.propertyFilter = (res, jsonObj) =>{
  const omittedFields = ['createdAt', 'password','updatedAt'];
  const includedFields = Object.keys(jsonObj).filter(key => (!omittedFields.includes(key)))
  const newObj = {};
  includedFields.forEach(field => {newObj[field] = jsonObj[field]})
  console.log(newObj);
  res.json(newObj);;
}
