import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  token?: string;
  message?: string;
};

// This is a mock Google authentication endpoint
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  const { token } = req.body;

  // In a real application, you would verify the Google token
  // This is just a mock example
  if (token) {
    // In a real application, you would use a proper JWT
    const mockToken = 'mock-jwt-token-google';
    
    res.status(200).json({
      user: {
        id: '2',
        name: 'Google User',
        email: 'google@example.com',
        role: 'inspector',
      },
      token: mockToken,
    });
  } else {
    res.status(401).json({ message: 'Invalid Google token' });
  }
}