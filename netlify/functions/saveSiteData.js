const fs = require('fs');
const path = require('path');

exports.handler = async function(event, context) {
  // Permite apenas POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Método não permitido' };
  }

  // (Opcional) Proteção simples por token
  // const token = event.headers['authorization'];
  // if (token !== 'Bearer SUA_SENHA_FORTE_AQUI') {
  //   return { statusCode: 401, body: 'Não autorizado' };
  // }

  try {
    const data = JSON.parse(event.body);
    const filePath = path.join('/tmp', 'siteData.json');
    fs.writeFileSync(filePath, JSON.stringify(data));
    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (err) {
    return { statusCode: 500, body: 'Erro ao salvar dados.' };
  }
};