'use client';
import { SignOutButton } from '@clerk/nextjs';
import { useToast } from '../ui/use-toast';
import { useRouter } from 'next/navigation';
function SignOutLink() {
  const { toast } = useToast();
  const router = useRouter();
  return (
    <SignOutButton
      signOutCallback={() => {
        router.push('/');
        toast({ description: 'You have been signed out.' });
      }}
    >
      <button className='w-full text-left'>Logout</button>
    </SignOutButton>
  );
}
export default SignOutLink;
