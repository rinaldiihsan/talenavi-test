import React from 'react';
import Navigation from '../../components/Navigation/Navigation';
import ActivityBar from './_components/ActivityBar';
import TableTodo from './_components/TableTodo';

export default function page() {
  return (
    <main className="flex flex-col items-center justify-center py-12">
      <Navigation />
      <TableTodo />
    </main>
  );
}
