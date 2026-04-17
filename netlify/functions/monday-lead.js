const MONDAY_API_TOKEN = process.env.MONDAY_API_TOKEN;

const BOARD_PIPELINE = 18398557132;
const BOARD_CONTACTS = 18398529738;

async function mondayMutation(query) {
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
  if (data.errors && data.errors.length > 0) throw new Error(data.errors[0].message);
  return data.data;
}

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Méthode non autorisée' }) };
  }

  if (!MONDAY_API_TOKEN) {
    console.error('MONDAY_API_TOKEN manquant');
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Configuration serveur incomplète' }) };
  }

  let nom, telephone, adresse;
  try {
    ({ nom, telephone, adresse } = JSON.parse(event.body));
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Corps de requête invalide' }) };
  }

  if (!nom || !telephone || !adresse) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Champs manquants: nom, telephone, adresse' }) };
  }

  const cleanPhone = telephone.replace(/[\s\-().]/g, '');

  // Étape 1 : Créer le contact dans "Contacts - Vendeurs"
  let contactItemId = null;
  try {
    const contactColumns = {
      contact_phone: { phone: cleanPhone, countryShortName: 'CA' },
    };
    const contactMutation = `
      mutation {
        create_item(
          board_id: ${BOARD_CONTACTS},
          item_name: ${JSON.stringify(nom)},
          column_values: ${JSON.stringify(JSON.stringify(contactColumns))}
        ) { id }
      }
    `;
    const contactData = await mondayMutation(contactMutation);
    contactItemId = contactData.create_item.id;
  } catch (err) {
    // Non-bloquant : le lead Pipeline sera quand même créé
    console.error('Création contact échouée:', err.message);
  }

  // Étape 2 : Créer le lead dans "Pipeline Flip - Propriétés"
  const today = new Date().toISOString().split('T')[0];
  const pipelineColumns = {
    text_mm07kbrb: adresse,
    color_mm08hgqf: { label: 'Nouveau lead' },
    color_mm073m73: { label: 'Site Web' },
    date_mm072893: { date: today },
  };

  try {
    const pipelineMutation = `
      mutation {
        create_item(
          board_id: ${BOARD_PIPELINE},
          group_id: "topics",
          item_name: ${JSON.stringify(adresse)},
          column_values: ${JSON.stringify(JSON.stringify(pipelineColumns))}
        ) { id name }
      }
    `;
    const pipelineData = await mondayMutation(pipelineMutation);
    const pipelineItemId = pipelineData.create_item.id;

    // Étape 3 : Lier le contact au lead (appel séparé, Monday ignore board_relation à la création)
    if (contactItemId) {
      try {
        const linkValue = JSON.stringify({ item_ids: [parseInt(contactItemId, 10)] });
        const linkMutation = `
          mutation {
            change_column_value(
              board_id: ${BOARD_PIPELINE},
              item_id: ${pipelineItemId},
              column_id: "board_relation_mm0ge7xd",
              value: ${JSON.stringify(linkValue)}
            ) { id }
          }
        `;
        await mondayMutation(linkMutation);
      } catch (err) {
        console.error('Liaison contact-pipeline échouée:', err.message);
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        pipeline_id: pipelineItemId,
        contact_id: contactItemId,
        linked: contactItemId ? true : false,
      }),
    };
  } catch (err) {
    console.error('Création pipeline échouée:', err.message);
    return { statusCode: 500, headers, body: JSON.stringify({ error: err.message }) };
  }
};
