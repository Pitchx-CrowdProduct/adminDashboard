'use client';

import {
    TableHead,
    TableRow,
    TableHeader,
    TableCell,
    TableBody,
    Table
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { SelectUser } from '../models/reviewDetails';
import { deleteUser } from './actions';
import { useRouter } from 'next/navigation';
// import moment from 'moment';

export function UsersTable({
    users,
    prevoffset,
    offset
}: {
    users: SelectUser[];
    prevoffset: number | null;
    offset: number | null;
}) {
    const router = useRouter();

    function onNextClick() {
        router.replace(`/?offset=${offset}`);
    }

    function onPrevClick() {
        if (prevoffset !== null) router.replace(`/?offset=${prevoffset - 20}`);
    }

    console.log(offset);

    // Use moment.js to display relative time
    // const relativeTime = moment(user.uploadDate).fromNow();

    return (
        <>
            <form className="border shadow-sm rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="hidden md:table-cell">Username</TableHead>
                            <TableHead className="hidden md:table-cell">Email</TableHead>
                            <TableHead className="max-w-[150px]">Filename</TableHead>
                            <TableHead className="hidden md:table-cell">FileURL</TableHead>
                            <TableHead className="hidden md:table-cell">UploadDateTime</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => (
                            <UserRow key={user.id} user={user} />
                        ))}
                    </TableBody>
                </Table>
            </form>
            <div className='flex flex-row justify-between'>
                {prevoffset !== 0 && (
                        <Button
                            className="mt-4 w-40"
                            variant="secondary"
                            onClick={() => onPrevClick()}
                        >
                            Previous Page
                        </Button>
                )}
                {offset !== null && (
                    <Button
                        className="mt-4 w-40"
                        variant="secondary"
                        onClick={() => onNextClick()}
                    >
                        Next Page
                    </Button>
                )}

            </div>

        </>
    );
}

function UserRow({ user }: { user: SelectUser }) {
    const userId = user.id;
    const deleteUserWithId = deleteUser.bind(null, userId);

    return (
        <TableRow>
            <TableCell className="font-medium w-40">{user.username}</TableCell>
            <TableCell className="hidden md:table-cell">{user.email}</TableCell>
            <TableCell className='max-w-48'>{user.filename.split('.')[0]}</TableCell>
            <TableCell>
                {/* Make fileurl clickable */}
                <a
                    href={user.fileurl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline cursor-pointer"
                    title={user.fileurl}
                >
                    {/* {user.fileurl} */}
                    {/* {user.fileurl.slice(0, 15)}...{user.fileurl.slice(-15)} */}
                    Click here to view file
                </a>
            </TableCell>
            {/* <TableCell >{moment(user.uploadDate).fromNow()}</TableCell> */}
            <TableCell suppressHydrationWarning>{user.uploadDate.toLocaleString()}</TableCell>
            {/* <TableCell>
        <Button
          className="w-full"
          size="sm"
          variant="outline"
          formAction={deleteUserWithId}
          disabled
        >
          Delete
        </Button>
      </TableCell> */}
        </TableRow>
    );
}
