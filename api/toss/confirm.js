// api/toss/confirm.js
import axios from 'axios';

export default async function handler(req, res) {
  // CORS 헤더 설정
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { paymentKey, orderId, amount } = req.body;

  // 필수 파라미터 검증
  if (!paymentKey || !orderId || !amount) {
    return res.status(400).json({ 
      error: 'Missing required parameters',
      message: 'paymentKey, orderId, amount are required' 
    });
  }

  // 시크릿 키 확인
  const secretKey = process.env.TOSS_SECRET_KEY || 'test_sk_DnyRpQWGrNLXvqMEw6Ge3Kwv1M9E';
  
  try {
    console.log('Confirming payment:', { paymentKey, orderId, amount });
    
    const response = await axios.post(
      'https://api.tosspayments.com/v1/payments/confirm',
      { 
        paymentKey, 
        orderId, 
        amount: parseInt(amount) 
      },
      {
        headers: {
          'Authorization': `Basic ${Buffer.from(secretKey + ':').toString('base64')}`,
          'Content-Type': 'application/json',
        },
        timeout: 10000, // 10초 타임아웃
      }
    );

    console.log('Payment confirmed successfully:', response.data);
    res.status(200).json(response.data);
    
  } catch (error) {
    console.error('Payment confirmation failed:', error.response?.data || error.message);
    
    const errorData = error.response?.data || { 
      error: 'Payment confirmation failed',
      message: error.message 
    };
    
    res.status(error.response?.status || 500).json(errorData);
  }
}