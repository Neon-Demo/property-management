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

// This is a mock Microsoft authentication endpoint
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  const { token } = req.body;

  // In a real application, you would verify the Microsoft token
  // This is just a mock example
  if (token) {
    // In a real application, you would use a proper JWT
    const mockToken = 'mock-jwt-token-microsoft';
    
    res.status(200).json({
      user: {
        id: '3',
        name: 'Microsoft User',
        email: 'microsoft@example.com',
        role: 'inspector',
      },
      token: mockToken,
    });
  } else {
    res.status(401).json({ message: 'Invalid Microsoft token' });
  }
}