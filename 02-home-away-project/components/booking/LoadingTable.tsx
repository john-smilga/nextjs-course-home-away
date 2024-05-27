import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@radix-ui/react-dropdown-menu';

function LoadingTable({ rows }: { rows?: number }) {
  const tableRows = Array.from({ length: rows || 5 }, (_, i) => {
    return (
      <div className='mb-4' key={i}>
        <Skeleton className='w-full h-8 rounded' />
        <Separator />
      </div>
    );
  });
  return <>{tableRows}</>;
}
export default LoadingTable;
