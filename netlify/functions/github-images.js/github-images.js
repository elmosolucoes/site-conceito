const axios = require('axios');

exports.handler = async function(event, context) {
  try {
    const repo = process.env.GITHUB_REPO || 'elmosolucoes/netlify-site';
    const folder = process.env.GITHUB_FOLDER || 'images';
    
    const response = await axios.get(`https://api.github.com/repos/${repo}/contents/${folder}`, {
      headers: {
        'Authorization': `token ${process.env.GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    
    const images = response.data.filter(file => 
      file.type === 'file' && /\.(jpg|jpeg|png|gif)$/i.test(file.name)
    ).map(file => ({
      name: file.name,
      url: file.download_url
    }));
    
    return {
      statusCode: 200,
      body: JSON.stringify(images)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};