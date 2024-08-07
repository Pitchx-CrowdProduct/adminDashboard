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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";


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
        {users?.map((user) => (
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
                    <TableHead className="hidden md:table-cell">details</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {user.reviewFiles.map((file) => (
                    <TableRow>
                      <TableCell className="hidden md:table-cell">{file.filename}</TableCell>
                      <TableCell >
                        <a href={file.fileurl}
                          target="_blank"
                          rel="noopener noreferrer" className='text-blue-500 underline cursor-pointer'>Click here to view file</a>
                      </TableCell>
                      <TableCell suppressHydrationWarning>{file.uploadDate?.toLocaleString()}</TableCell>
                      <TableCell suppressHydrationWarning>
                        <Dialog>
                          <DialogTrigger asChild>
                            {/* <Button variant="outline">Edit Profile</Button> */}
                            <button
                              className="mt-2 p-2 w-44 bg-[#f1f6f9] rounded-md hover:bg-gray-200"
                            >
                              Click here to view details
                            </button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[1000px] max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>{file.filename}</DialogTitle>
                              <DialogDescription>
                                Below are the file details --
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <p className='font-bold text-xl'>Score: {file.fileDetails?.score}</p> 
                              <div>
                                <p className="font-semibold text-lg">Strengths:</p>
                                <ul className="list-decimal pl-5">
                                  {file.fileDetails.strengths.map((strength, index) => (
                                    <li key={index}>{strength}</li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <p className="font-semibold text-lg">Areas of Improvement:</p>
                                <ul className="list-decimal pl-5">
                                  {file.fileDetails.feedbacks.map((feedback, index) => (
                                    <li key={index}>{feedback}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>

                      </TableCell>
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
