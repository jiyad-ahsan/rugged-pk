"use client";

import { useState, useEffect } from "react";
import UserManager from "@/components/admin/UserManager";

export default function AdminUsersPage() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    fetch("/api/admin/users/list")
      .then((r) => r.json())
      .then(setUsers)
      .catch(() => setUsers([]));
  }, []);

  if (!users) return <p className="text-sm text-sand-500">Loading...</p>;

  return <UserManager initialUsers={users} />;
}
