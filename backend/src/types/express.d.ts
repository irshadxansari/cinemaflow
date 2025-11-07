import "express";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        name: string;
        email: string;
        role: 'user' | 'admin';
        createdAt: Date
        updatedAt: Date
      }
    }
  }
}