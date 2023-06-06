function freezeObjProto() {
  const objProto = Object.prototype;
  
  Object.freeze(objProto);
  
  return objProto;
}

module.exports = {
  freezeObjProto
}
