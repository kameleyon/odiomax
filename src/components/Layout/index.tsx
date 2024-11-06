import { ReactNode } from 'react';
import Navbar from './Navbar';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white dark:bg-dark transition-colors duration-300">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}