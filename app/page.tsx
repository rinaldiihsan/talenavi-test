import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center max-w-sm">
        <h1 className="font-semibold font uppercase text-xl text-center">Hello mate, welcome to Talenavi TODO List</h1>
      </div>
      <Link href="/main-table" className="mt-4 px-4 py-2 bg-blue-500 hover:bg-cyan-500 text-white rounded">
        Go to main table
      </Link>
    </main>
  );
}
