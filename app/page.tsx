import { getUsers } from '@/lib/db';
// import { UsersTable } from './users-table';
import { Search } from './search';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table
} from '@/components/ui/table';

export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string; offset: string };
}) {
  const search = searchParams.q ?? '';
  const offset = searchParams.offset ?? 0;
  const { users, newOffset } = await getUsers(search, Number(offset));

  return (
    <main className="flex flex-1 flex-col p-4 md:p-6">
      <div className="flex items-center mb-8">
        <h1 className="font-semibold text-lg md:text-2xl">Review Page Users</h1>
      </div>
      <div className="w-full mb-4">
        <Search value={searchParams.q} />
      </div>
      <Accordion type='single' collapsible>
        {users.map((user) => (
          <AccordionItem key={user.email} value={user.email}>
            <AccordionTrigger>
              <div className='w-full flex flex-row justify-between'>
               <div> {user.username}</div> 
               <div> {user.email}</div> 
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="hidden md:table-cell">name</TableHead>
                    <TableHead className="hidden md:table-cell">file</TableHead>
                    <TableHead className="hidden md:table-cell">uploadDateTime</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {user.files.map((file) => (
                    <TableRow>
                      <TableCell className="hidden md:table-cell">{file.filename}</TableCell>
                      <TableCell >
                        <a href={file.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer" className='text-blue-500 underline cursor-pointer'>Click here to view file</a>
                      </TableCell>
                      <TableCell suppressHydrationWarning>{file.uploadDate?.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}

                </TableBody>
              </Table>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
{/* <UsersTable users={users} prevoffset={Number(offset)} offset={newOffset} /> */}
    </main>
  );
}
