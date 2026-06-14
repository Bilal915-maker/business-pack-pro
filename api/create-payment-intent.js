const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const { email, name } = req.body || {};
  if (!email || !name) return res.status(400).json({ error: 'Email et prénom requis.' });

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 2900,
      currency: 'eur',
      receipt_email: email,
      metadata: { name, email, product: 'Business Pack Pro' }
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
