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
import { SelectMail } from '@/lib/db';
// import { deleteUser } from './actions';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';

export function MailTable({
  mails,
  offset
}: {
  mails: SelectMail[];
  offset: number | null;
}) {
  const router = useRouter();

  function onClick() {
    router.replace(`/?offset=${offset}`);
  }

  return (
    <>
      <form className="border shadow-sm rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead className="hidden md:table-cell">DateTime</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mails.map((mail) => (
              <MailRow key={mail.id} mail={mail} />
            ))}
          </TableBody>
        </Table>
      </form>
      {offset !== null && (
        <Button
          className="mt-4 w-40"
          variant="secondary"
          onClick={() => onClick()}
        >
          Next Page
        </Button>
      )}
    </>
  );
}

function MailRow({ mail }: { mail: SelectMail }) {
  const mailId = mail.id;
//   const deleteUserWithId = deleteUser.bind(null, mailId);

  return (
    <TableRow>
      <TableCell className="hidden md:table-cell">{mail.email}</TableCell>
      <TableCell suppressHydrationWarning>{mail.updatedAt.toLocaleString()}</TableCell>
      <TableCell>
        <Button
          className="w-full"
          size="sm"
          variant="outline"
        //   formAction={deleteUserWithId}
          disabled
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
}
