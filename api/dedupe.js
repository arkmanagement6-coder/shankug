export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const { pan } = req.body;

    if (!pan) {
      return res.status(400).json({ success: false, message: 'PAN number is required' });
    }

    // Use environment variable if available, otherwise fallback to the hardcoded token
    const token = process.env.APNACRED_BEARER_TOKEN || 'YXBuYWNyZWRfZTBkZWE5NWZjZTRhNWU2NzpDM25CSGlXQjZpS1dMZU43enB4RXAxdmY1R3JsSjRJQw==';

    const response = await fetch('https://uat.apnacred.com/api/partner/dedupe', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ pan })
    });

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error) {
    console.error('Serverless Proxy Error:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Proxy Error', details: error.message });
  }
}
