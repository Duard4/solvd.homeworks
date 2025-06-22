import { JSX } from 'react';

interface PageHeaderProps {
  title: string;
  semititle: string;
}

export default function PageHeading({ title, semititle }: PageHeaderProps): JSX.Element {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{title}</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{semititle}</p>
    </div>
  );
}
