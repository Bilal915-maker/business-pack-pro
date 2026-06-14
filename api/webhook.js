const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const nodemailer = require('nodemailer');

const NOTION_LINK = 'https://app.notion.com/p/37ffb40734fa81419766cba362e296c0';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

module.exports = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'payment_intent.succeeded') {
    const pi = event.data.object;
    const { email, name } = pi.metadata;

    await transporter.sendMail({
      from: `"Business Pack Pro" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: '🚀 Votre Business Pack Pro — accès immédiat',
      html: `
        <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;padding:32px;">
          <h2 style="margin-bottom:8px;">Bonjour ${name} 👋</h2>
          <p style="color:#444;line-height:1.7;">Merci pour votre achat ! Votre Business Pack Pro est prêt.</p>
          <div style="background:#F2F2F0;border-radius:12px;padding:24px;margin:24px 0;text-align:center;">
            <p style="font-size:14px;color:#666;margin-bottom:16px;">Cliquez ci-dessous pour accéder aux 5 templates Notion :</p>
            <a href="${NOTION_LINK}" style="background:#0D0D0D;color:#fff;padding:14px 28px;border-radius:100px;text-decoration:none;font-weight:600;font-size:15px;">
              Ouvrir mes templates Notion →
            </a>
          </div>
          <p style="font-size:13px;color:#888;">Dans Notion, cliquez sur "Dupliquer" en haut à droite pour copier le pack dans votre espace.</p>
          <p style="font-size:13px;color:#888;margin-top:16px;">Une question ? Répondez directement à cet email.</p>
          <hr style="border:none;border-top:1px solid #E0E0DC;margin:24px 0;">
          <p style="font-size:12px;color:#aaa;">Business Pack Pro · Paiement de 29€ confirmé</p>
        </div>
      `
    });

    console.log(`✅ Email envoyé à ${email}`);
  }

  res.json({ received: true });
};
