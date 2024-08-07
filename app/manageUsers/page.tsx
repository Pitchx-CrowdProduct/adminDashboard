import { getUsers } from '@/lib/db';
import {
    TableHead,
    TableRow,
    TableHeader,
    TableCell,
    TableBody,
    Table
} from '@/components/ui/table';
import UserStatusSwitch from '@/components/UserStatusSwitch';

export default async function IndexPage({ searchParams }: { searchParams: { q: string; offset: string }; }) {
    const search = searchParams.q ?? '';
    const offset = searchParams.offset ?? 0;
    const { users, newOffset } = await getUsers(search, Number(offset));

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
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users?.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell className="hidden md:table-cell">{user.username}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.status}</TableCell>
                            <TableCell>
                                <UserStatusSwitch userId={user.id} initialStatus={user.status} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </main>
    );
}