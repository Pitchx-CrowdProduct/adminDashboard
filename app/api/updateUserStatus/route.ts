// pages/api/updateUserStatus.ts
import { NextApiRequest, NextApiResponse } from 'next';
import users  from '../../../models/user';

export default async function PATCH(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PATCH') {
    const { id, status } = req.body;

    try {
      const updatedUser = await users.findByIdAndUpdate(id, { status }, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: 'Error updating user status', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
