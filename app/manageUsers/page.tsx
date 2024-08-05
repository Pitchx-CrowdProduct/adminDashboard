'use client'
import { getUsers } from '@/lib/db';
import { Switch } from "../../components/ui/switch"
import {
    TableHead,
    TableRow,
    TableHeader,
    TableCell,
    TableBody,
    Table
} from '@/components/ui/table';

export default async function IndexPage({ searchParams }: { searchParams: { q: string; offset: string }; }) {
    const search = searchParams.q ?? '';
    const offset = searchParams.offset ?? 0;
    const { users, newOffset } = await getUsers(search, Number(offset));

    const updateUserStatus = async (id:string, status:string) => {
        try {
            const res = await fetch('/api/updateUserStatus', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id, status })
            });
            if (!res.ok) {
                throw new Error('Failed to update status');
            }
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <main className="flex flex-1 flex-col p-4 md:p-6">
            <div className="flex items-center mb-8">
                <h1 className="font-semibold text-lg md:text-2xl">Manage Users</h1>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="hidden md:table-cell">UserName</TableHead>
                        <TableHead className="hidden md:table-cell">Email</TableHead>
                        <TableHead className="hidden md:table-cell">Status</TableHead>
                        <TableHead className="hidden md:table-cell">Change Status</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users?.map((user) => (
                        <TableRow>
                            <TableCell className="hidden md:table-cell">{user.username}</TableCell>
                            <TableCell >{user.email}</TableCell>
                            <TableCell >{user.status}</TableCell>
                            <TableCell >
                                <Switch
                                    id="status-change"
                                    checked={user.status === "Active"}
                                    onCheckedChange={(checked) => {
                                        const newStatus = checked ? "Active" : "Deactive";
                                        updateUserStatus(user.id, newStatus);
                                    }}
                                    className="scale-125"
                                />
                            </TableCell>
                        </TableRow>
                    ))}

                </TableBody>
            </Table>
            {/* <UsersTable users={users} prevoffset={Number(offset)} offset={newOffset} /> */}
        </main>
    );
}
