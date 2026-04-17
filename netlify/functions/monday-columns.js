// Fonction utilitaire pour découvrir les IDs de colonnes d'un board Monday.
// Appel: GET /.netlify/functions/monday-columns?board_id=BOARD_ID
// Utiliser une seule fois pour configurer MONDAY_PHONE_COLUMN_ID et MONDAY_ADDRESS_COLUMN_ID.

const MONDAY_API_TOKEN = process.env.MONDAY_API_TOKEN;

exports.handler = async (event) => {
  const headers = { 'Content-Type': 'application/json' };

  if (!MONDAY_API_TOKEN) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'MONDAY_API_TOKEN manquant' }) };
  }

  const boardId = event.queryStringParameters && event.queryStringParameters.board_id;
  if (!boardId) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Paramètre board_id requis' }) };
  }

  const query = `
    query {
      boards(ids: [${parseInt(boardId, 10)}]) {
        name
        columns {
          id
          title
          type
        }
      }
    }
  `;

  try {
    const response = await fetch('https://api.monday.com/v2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': MONDAY_API_TOKEN,
        'API-Version': '2024-01',
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();

    if (data.errors && data.errors.length > 0) {
      return { statusCode: 500, headers, body: JSON.stringify({ error: data.errors[0].message }) };
    }

    return { statusCode: 200, headers, body: JSON.stringify(data.data.boards[0], null, 2) };
  } catch (err) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: err.message }) };
  }
};
