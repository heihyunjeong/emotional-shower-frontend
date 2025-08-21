// api/toss/confirm.js
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { paymentKey, orderId, amount } = req.body;

  try {
    const response = await axios.post(
      'https://api.tosspayments.com/v1/payments/confirm', // ⚠️ 공백 제거됨
      { paymentKey, orderId, amount },
      {
        headers: {
          'Authorization': `Basic ${Buffer.from(process.env.TOSS_SECRET_KEY + ':').toString('base64')}`,
          'Content-Type': 'application/json',
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json(error.response?.data || { error: 'Payment failed' });
  }
}