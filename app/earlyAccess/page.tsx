import { getMails } from '@/lib/db';
import { MailTable } from '../mail-table';
import { Search } from '../search';

export default async function earlyAccessPage({
  searchParams
}: {
  searchParams: { q: string; offset: string };
}) {

  const search = searchParams.q ?? '';
  const offset = searchParams.offset ?? 0;
  const { mails, newOffset } = await getMails(search, Number(offset));

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">Early Access Users</h1>
      </div>
      {/* <div className="w-full mb-4">
        <Search value={searchParams.q} />
      </div> */}
      <MailTable mails={mails} offset={newOffset} />
    </main>
  );
}
