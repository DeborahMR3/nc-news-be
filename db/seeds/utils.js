const db = require("../../db/connection");

function createLookupObj(array, key, value) {
  //  Criar um objeto vazio para guardar o resultado final
  const lookupObj = {};

  // // Passar por cada item dentro do array
  array.forEach((obj) => {
    // Pegar o valor da propriedade indicada pela 'key' e usar como chave do objeto lookupObj
    // Pegar o valor da propriedade indicada por 'value' e usar como valor dessa KEY no lookupObj
    lookupObj[obj[key]] = obj[value];
  });

  //. retornar o objeto lookupObj completo
  return lookupObj;
}


// exports.convertTimestampToDate = ({ created_at, ...otherProperties }) => {
//   if (!created_at) return { ...otherProperties };
//   return { created_at: new Date(created_at), ...otherProperties };
// };

function convertTimestampToDate({ created_at, ...otherProperties }) {
  if (!created_at) return { ...otherProperties };
  return { created_at: new Date(created_at), ...otherProperties };
}

module.exports = { createLookupObj, convertTimestampToDate };
