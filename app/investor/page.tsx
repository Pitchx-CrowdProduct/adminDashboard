import { fetchAllUsers } from '@/lib/db';
import { MailTable } from '../mail-table';
import { Search } from '../search';
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


export default async function earlyAccessPage({
    searchParams
}: {
    searchParams: { q: string; offset: string };
}) {

    const search = searchParams.q ?? '';
    const offset = searchParams.offset ?? 0;
    const { investors } = await fetchAllUsers();

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            <div className="flex items-center">
                <h1 className="font-semibold text-lg md:text-2xl">Investor's pitch decks</h1>
            </div>
            {/* <div className="w-full mb-4">
        <Search value={searchParams.q} />
      </div> */}
            {/* <MailTable mails={mails} offset={newOffset} /> */}
            <Accordion type='single' collapsible>
                {investors.map((investor) => (
                    <AccordionItem key={investor.auth0Id} value={investor.auth0Id}>
                        <AccordionTrigger>{investor.email}</AccordionTrigger>
                        <AccordionContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="hidden md:table-cell">name</TableHead>
                                        <TableHead className="hidden md:table-cell">category</TableHead>
                                        <TableHead className="hidden md:table-cell">locatedAt</TableHead>
                                        <TableHead className="hidden md:table-cell">file</TableHead>
                                        <TableHead className="hidden md:table-cell">uploadDateTime</TableHead>
                                        <TableHead></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {investor.files.map((file) => (
                                        <TableRow>
                                            <TableCell className="hidden md:table-cell">{file.name ? file.name : file.fileName ? file.fileName?.split('-')[1].split('.')[0] : "N/A"}</TableCell>
                                            <TableCell >{file.category ? file.category : "N/A"}</TableCell>
                                            <TableCell >{file.locatedAt ? file.locatedAt : "N/A"}</TableCell>
                                            <TableCell >
                                                <a href={file.s3Url}
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

        </main>
    );
}

