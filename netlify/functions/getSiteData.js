const fs = require('fs');
const path = require('path');

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Método não permitido' };
  }
  try {
    const filePath = path.join('/tmp', 'siteData.json');
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      return { statusCode: 200, body: data };
    } else {
      return { statusCode: 200, body: '{}' };
    }
  } catch (err) {
    return { statusCode: 500, body: 'Erro ao ler dados.' };
  }
};