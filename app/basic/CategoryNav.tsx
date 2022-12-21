'use client';
import { TabNavItem } from '@/ui/TabNavItem';
import { useSelectedLayoutSegments } from 'next/navigation';

export type PageProps = {
  params?: any;
  children?: React.ReactNode;
};

const CategoryNav = ({ categories }: { categories: Category[] }) => {
  const [selectedLayoutSegments] = useSelectedLayoutSegments();

  return (
    <div className="flex items-center space-x-4">
      <TabNavItem href="/basic" isActive={!selectedLayoutSegments}>
        Scene
      </TabNavItem>
      {categories.map((item) => (
        <TabNavItem
          key={item.slug}
          href={`/basic/${item.slug}`}
          isActive={item.slug === selectedLayoutSegments}
        >
          {item.name}
        </TabNavItem>
      ))}
    </div>
  );
};

export default CategoryNav;
