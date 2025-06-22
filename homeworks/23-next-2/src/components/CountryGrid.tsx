import { JSX, ReactNode } from 'react';

interface CountryGridProps {
  children: ReactNode;
}

export default function CountryGrid({ children }: CountryGridProps): JSX.Element {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {children}
    </div>
  );
}
