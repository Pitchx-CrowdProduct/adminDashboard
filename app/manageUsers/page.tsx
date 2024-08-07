'use client';

import { useState, useEffect } from 'react';
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';

interface User {
  id: string;
  username: string;
  email: string;
  status: 'Active' | 'DeActive';
  reviewFiles: any[];
  investorFiles: any[];
  paymentPlanId: string | null;
  uploadDate: Date;
}

export default function IndexPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [newUser, setNewUser] = useState<
    Omit<
      User,
      'id' | 'reviewFiles' | 'investorFiles' | 'paymentPlanId' | 'uploadDate'
    >
  >({
    username: '',
    email: '',
    status: 'DeActive'
  });
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (
    userEmail: string,
    newStatus: 'Active' | 'DeActive'
  ) => {
    try {
      const response = await fetch(`/api/users`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: userEmail, status: newStatus })
      });
      if (!response.ok) {
        throw new Error('Failed to update user status');
      }
      fetchUsers();
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      });
      if (!response.ok) {
        throw new Error('Failed to add user');
      }
      fetchUsers();
      setIsAddUserOpen(false);
      setNewUser({ username: '', email: '', status: 'DeActive' });
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="container mx-auto py-10">
      <h1
        className={`text-2xl font-bold mb-5 ${newUser.status === 'Active' ? 'text-green-500' : 'text-red-500'}`}
      >
        Manage Users
      </h1>

      <div className="mb-5">
        <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
          <DialogTrigger asChild>
            <Button>Add New User</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={newUser.username}
                  onChange={(e) =>
                    setNewUser({ ...newUser, username: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  value={newUser.status}
                  onChange={(e) =>
                    setNewUser({
                      ...newUser,
                      status: e.target.value as 'Active' | 'DeActive'
                    })
                  }
                  className={`w-full p-2 border rounded ${newUser.status === 'Active' ? 'bg-green-100' : 'bg-red-100'}`}
                >
                  <option value="Active">Active</option>
                  <option value="DeActive">DeActive</option>
                </select>
              </div>
              <Button type="submit">Add User</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>UserName</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell><div className={`text-sm p-2 text-center ${user.status === 'DeActive' ? 'text-red-500 border bg-red-200 rounded-md' : 'text-green-500 border bg-green-200 rounded-md'}`}>{user.status}</div></TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  onClick={() =>
                    handleStatusChange(
                      user.email,
                      user.status === 'Active' ? 'DeActive' : 'Active'
                      
                    )
                  }
                >
                  {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
