const fs = require('fs');
const path = require('path');

// Caminho persistente no Netlify (apenas durante a execução da função)
const DATA_FILE = path.join('/tmp', 'siteData.json');

exports.handler = async function(event, context) {
  if (event.httpMethod === 'GET') {
    try {
      if (fs.existsSync(DATA_FILE)) {
        const data = fs.readFileSync(DATA_FILE, 'utf-8');
        return {
          statusCode: 200,
          headers: { 'Content-Type': 'application/json' },
          body: data
        };
      } else {
        return {
          statusCode: 200,
          headers: { 'Content-Type': 'application/json' },
          body: '{}'
        };
      }
    } catch (err) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Erro ao ler dados.' })
      };
    }
  }

  if (event.httpMethod === 'POST') {
    try {
      const data = event.body;
      fs.writeFileSync(DATA_FILE, data);
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ success: true })
      };
    } catch (err) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Erro ao salvar dados.' })
      };
    }
  }

  return {
    statusCode: 405,
    body: 'Método não permitido'
  };
};