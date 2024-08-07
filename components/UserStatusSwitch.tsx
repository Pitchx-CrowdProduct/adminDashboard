'use client'

import { useState } from 'react'
import { Switch } from "@/components/ui/switch"

interface UserStatusSwitchProps {
  userId: string
  initialStatus: string
}

export default function UserStatusSwitch({ userId, initialStatus }: UserStatusSwitchProps) {
  const [status, setStatus] = useState(initialStatus)

  const updateUserStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch('/api/updateUserStatus', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, status: newStatus })
      });
      if (!res.ok) {
        throw new Error('Failed to update status');
      }
      setStatus(newStatus)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Switch
      id={`status-change-${userId}`}
      checked={status === "Active"}
      onCheckedChange={(checked) => {
        const newStatus = checked ? "Active" : "Deactive";
        updateUserStatus(userId, newStatus);
      }}
      className="scale-125"
    />
  )
}