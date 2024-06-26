// 'use client';

// import {
//   TableHead,
//   TableRow,
//   TableHeader,
//   TableCell,
//   TableBody,
//   Table
// } from '@/components/ui/table';
// import { Button } from '@/components/ui/button';
// import {
//     Accordion,
//     AccordionContent,
//     AccordionItem,
//     AccordionTrigger,
//   } from "@/components/ui/accordion"
  
// // import { SelectMail } from '@/lib/db';
// // import { deleteUser } from './actions';
// import { useRouter } from 'next/navigation';
// import { IUser } from 'models/investor';

// export function InvestorTable({
//   investors,
//   offset
// }: {
//   investors: IUser[];
//   offset: number | null;
// }) {
//   const router = useRouter();

//   function onClick() {
//     router.replace(`/?offset=${offset}`);
//   }

//   return (
//     <>
//       <form className="border shadow-sm rounded-lg">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead className="hidden md:table-cell">name</TableHead>
//               <TableHead className="hidden md:table-cell">category</TableHead>
//               <TableHead className="hidden md:table-cell">locatedAt</TableHead>
//               <TableHead className="hidden md:table-cell">file</TableHead>
//               <TableHead className="hidden md:table-cell">uploadDateTime</TableHead>
//               <TableHead></TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {investors.map((investor) => (
//               <MailRow key={investor.auth0Id} investor={investor} />
//             ))}
//           </TableBody>
//         </Table>
//       </form>
//       {offset !== null && (
//         <Button
//           className="mt-4 w-40"
//           variant="secondary"
//           onClick={() => onClick()}
//         >
//           Next Page
//         </Button>
//       )}
//     </>
//   );
// }

// function MailRow({ mail }: { mail: IUser[] }) {
//   // const mailId = mail.id;
// //   const deleteUserWithId = deleteUser.bind(null, mailId);

//   return (
//     <TableRow>
//       <TableCell className="hidden md:table-cell">{mail.email}</TableCell>
//       <TableCell suppressHydrationWarning>{mail.updatedAt.toLocaleString()}</TableCell>
//       <TableCell>
//         <Button
//           className="w-full"
//           size="sm"
//           variant="outline"
//         //   formAction={deleteUserWithId}
//           disabled
//         >
//           Delete
//         </Button>
//       </TableCell>
//     </TableRow>
//   );
// }
