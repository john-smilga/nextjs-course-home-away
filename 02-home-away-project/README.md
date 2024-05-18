### Next App

```sh
npx create-next-app@latest home-away
```

```sh
npm run dev
```

### Remove Boilerplate

- in globals.css remove all code after directives
- page.tsx

```tsx
function HomePage() {
  return <h1 className='text-3xl'>HomePage</h1>;
}
export default HomePage;
```

- layout.tsx

```tsx
export const metadata: Metadata = {
  title: 'HomeAway',
  description: 'Feel at home, away from home.',
};
```

- get a hold of the README.MD

### Create Pages

- bookings
- checkout
- favorites
- profile
- properties
- rentals
- reviews

- new file - pageName/page.tsx

```tsx
function BookingsPage() {
  return <h1 className='text-3xl'>BookingsPage</h1>;
}
export default BookingsPage;
```

### Shadcn/ui

[Docs](https://ui.shadcn.com/)

[Next Install](https://ui.shadcn.com/docs/installation/next)

```sh
npx shadcn-ui@latest init

```

- New York
- Zinc

```sh
npx shadcn-ui@latest add button
```

```tsx
import { Button } from '@/components/ui/button';

function HomePage() {
  return (
    <div>
      <h1 className='text-3xl'>HomePage</h1>
      <Button variant='outline' size='lg' className='capitalize m-8'>
        Click me
      </Button>
    </div>
  );
}
export default HomePage;
```

```sh
npx shadcn-ui@latest add breadcrumb calendar card checkbox dropdown-menu input label popover scroll-area select separator table textarea toast skeleton
```

- components
  - ui
  - card
  - form
  - home
  - navbar
  - properties

### Navbar - Setup

- create

- navbar
  - DarkMode.tsx
  - LinksDropdown.tsx
  - Logo.tsx
  - Navbar.tsx
  - NavSearch.tsx
  - SignOutLink.tsx
  - UserIcon.tsx

### Tailwind Custom Class

globals.css

```css
@layer components {
  .container {
    @apply mx-auto max-w-6xl xl:max-w-7xl px-8;
  }
}
```

### Navbar - Structure

```tsx
import NavSearch from './NavSearch';
import LinksDropdown from './LinksDropdown';
import DarkMode from './DarkMode';
function Navbar() {
  return (
    <nav className='border-b'>
      <div className='container flex flex-col sm:flex-row  sm:justify-between sm:items-center flex-wrap gap-4 py-8'>
        <Logo />
        <NavSearch />
        <div className='flex gap-4 items-center '>
          <DarkMode />
          <LinksDropdown />
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
```

```tsx
import Navbar from '@/components/navbar/Navbar';

return (
  <html lang='en' suppressHydrationWarning>
    <body className={inter.className}>
      <Navbar />
      <main className='container py-10'>{children}</main>
    </body>
  </html>
);
```

### Logo

```sh
npm install react-icons
```

[Lucide Icons](https://react-icons.github.io/react-icons/)

```tsx
import Link from 'next/link';
import { LuTent } from 'react-icons/lu';
import { Button } from '../ui/button';

function Logo() {
  return (
    <Button size='icon' asChild>
      <Link href='/'>
        <LuTent className='w-6 h-6' />
      </Link>
    </Button>
  );
}
```

### NavSearch

```tsx
import { Input } from '../ui/input';

function NavSearch() {
  return (
    <Input
      type='search'
      placeholder='find a property...'
      className='max-w-xs dark:bg-muted '
    />
  );
}
export default NavSearch;
```

### Theme

[Theming Options](https://ui.shadcn.com/docs/theming)
[Themes](https://ui.shadcn.com/themes)

- replace css variables in in globals.css

### Providers

- create app/providers.tsx

```tsx
'use client';

function Providers({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
export default Providers;
```

layout.tsx

```tsx
import Providers from './providers';

return (
  <html lang='en' suppressHydrationWarning>
    <body className={inter.className}>
      <Providers>
        <Navbar />
        <main className='container py-10'>{children}</main>
      </Providers>
    </body>
  </html>
);
```

### DarkMode

[Next.js Dark Mode](https://ui.shadcn.com/docs/dark-mode/next)

```sh
npm install next-themes
```

- create app/theme-provider.tsx

```tsx
'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```

providers.tsx

```tsx
'use client';
import { ThemeProvider } from './theme-provider';

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='system'
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
export default Providers;
```

### DarkMode

- make sure you export as default !!!

```tsx
'use client';

import * as React from 'react';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon'>
          <SunIcon className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
          <MoonIcon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
          <span className='sr-only'>Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={() => setTheme('light')}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

### UserIcon

```tsx
import { LuUser2 } from 'react-icons/lu';

function UserIcon() {
  return <LuUser2 className='w-6 h-6 bg-primary rounded-full text-white' />;
}
export default UserIcon;
```

### Links Data

- create utils/links.ts

```ts
type NavLink = {
  href: string;
  label: string;
};

export const links: NavLink[] = [
  { href: '/', label: 'home' },
  { href: '/favorites ', label: 'favorites' },
  { href: '/bookings ', label: 'bookings' },
  { href: '/reviews ', label: 'reviews' },
  { href: '/rentals/create ', label: 'create rental' },
  { href: '/rentals', label: 'my rentals' },
  { href: '/profile ', label: 'profile' },
];
```

### LinksDropdown

```tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { LuAlignLeft } from 'react-icons/lu';
import Link from 'next/link';
import { Button } from '../ui/button';
import UserIcon from './UserIcon';
import { links } from '@/utils/links';
import SignOutLink from './SignOutLink';

function LinksDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' className='flex gap-4 max-w-[100px]'>
          <LuAlignLeft className='w-6 h-6' />
          <UserIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-52' align='start' sideOffset={10}>
        {links.map((link) => {
          return (
            <DropdownMenuItem key={link.href}>
              <Link href={link.href} className='capitalize w-full'>
                {link.label}
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default LinksDropdown;
```

### Clerk

[Clerk Docs](https://clerk.com/)
[Clerk + Next.js Setup](https://clerk.com/docs/quickstarts/nextjs)

- create new application

```sh
npm install @clerk/nextjs
```

- create .env.local

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
```

In Next.js, environment variables that start with NEXT*PUBLIC* are exposed to the browser. This means they can be accessed in your front-end code.

For example, NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY can be used in both server-side and client-side code.

On the other hand, CLERK_SECRET_KEY is a server-side environment variable. It's not exposed to the browser, making it suitable for storing sensitive data like API secrets.

layout.tsx

```tsx
import { ClerkProvider } from '@clerk/nextjs';

return (
  <ClerkProvider>
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <main className='container py-10'>{children}</main>
        </Providers>
      </body>
    </html>
  </ClerkProvider>
);
```

- create middleware.ts

```ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  '/bookings(.*)',
  '/checkout(.*)',
  '/favorites(.*)',
  '/profile(.*)',
  '/rentals(.*)',
  '/reviews(.*)',
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
```

- restart dev server

### SignUp/SignIn and Customize Avatar (optional)

- customization
  - avatars

### Toast Component

[Toast](https://ui.shadcn.com/docs/components/toast)

providers.tsx

```tsx
'use client';
import { ThemeProvider } from './theme-provider';
import { Toaster } from '@/components/ui/toaster';

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster />
      <ThemeProvider
        attribute='class'
        defaultTheme='system'
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </>
  );
}
export default Providers;
```

### SignOutLink

- redirectUrl

```tsx
'use client';

import { SignOutButton } from '@clerk/nextjs';
import { useToast } from '../ui/use-toast';

function SignOutLink() {
  const { toast } = useToast();
  const handleLogout = () => {
    toast({ description: 'You have been signed out.' });
  };
  return (
    <SignOutButton redirectUrl='/'>
      <button className='w-full text-left' onClick={handleLogout}>
        Logout
      </button>
    </SignOutButton>
  );
}
export default SignOutLink;
```

### LinksDropdown - Complete

```tsx
return (
  <DropdownMenuContent>
    <SignedOut>...</SignedOut>
    <SignedIn>....</SignedIn>
  </DropdownMenuContent>
);
```

```tsx
return (
  <DropdownMenuContent className='w-52' align='start' sideOffset={10}>
    <SignedOut>
      <DropdownMenuItem>
        <SignInButton mode='modal'>
          <button className='w-full text-left'>Login</button>
        </SignInButton>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <SignUpButton mode='modal'>
          <button className='w-full text-left'>Register</button>
        </SignUpButton>
      </DropdownMenuItem>
    </SignedOut>
    <SignedIn>
      {links.map((link) => {
        return (
          <DropdownMenuItem key={link.href}>
            <Link href={link.href} className='capitalize w-full'>
              {link.label}
            </Link>
          </DropdownMenuItem>
        );
      })}
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <SignOutLink />
      </DropdownMenuItem>
    </SignedIn>
  </DropdownMenuContent>
);
```

### Direct User

.env.local

```bash
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/profile/create
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/profile/create
```

### Create Profile

- profile
  - create

```tsx
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
const createProfileAction = async (formData: FormData) => {
  'use server';
  const firstName = formData.get('firstName') as string;
  console.log(firstName);
};

function CreateProfile() {
  return (
    <section>
      <h1 className='text-2xl font-semibold mb-8 capitalize'>new user</h1>
      <div className='border p-8 rounded-md max-w-lg'>
        <form action={createProfileAction}>
          <div className='mb-2'>
            <Label htmlFor='firstName'>First Name</Label>
            <Input id='firstName' name='firstName' type='text' />
          </div>
          <Button type='submit' size='lg'>
            Create Profile
          </Button>
        </form>
      </div>
    </section>
  );
}
export default CreateProfile;
```

### FormInput

- components/form/FormInput.tsx

```tsx
import { Label } from '../ui/label';
import { Input } from '../ui/input';

type FormInputProps = {
  name: string;
  type: string;
  label?: string;
  defaultValue?: string;
  placeholder?: string;
};

function FormInput({
  label,
  name,
  type,
  defaultValue,
  placeholder,
}: FormInputProps) {
  return (
    <div className='mb-2'>
      <Label htmlFor={name} className='capitalize'>
        {label || name}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required
      />
    </div>
  );
}

export default FormInput;
```

### Default Submit Button

- components/form/Buttons.tsx

```tsx
'use client';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';

type SubmitButtonProps = {
  className?: string;
  text?: string;
};

export function SubmitButton({
  className = '',
  text = 'submit',
}: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button
      type='submit'
      disabled={pending}
      className={`capitalize ${className}`}
      size='lg'
    >
      {pending ? (
        <>
          <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
          Please wait...
        </>
      ) : (
        text
      )}
    </Button>
  );
}
```

### FormContainer

- create components/form/FormContainer.tsx

```tsx
'use client';

import { useFormState } from 'react-dom';
import { useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { actionFunction } from '@/utils/types';

const initialState = {
  message: '',
};

function FormContainer({
  action,
  children,
}: {
  action: actionFunction;
  children: React.ReactNode;
}) {
  const [state, formAction] = useFormState(action, initialState);
  const { toast } = useToast();
  useEffect(() => {
    if (state.message) {
      toast({ description: state.message });
    }
  }, [state]);
  return <form action={formAction}>{children}</form>;
}
export default FormContainer;
```

- create utils/types.ts

```ts
export type actionFunction = (
  prevState: any,
  formData: FormData
) => Promise<{ message: string }>;
```

### Create Profile - Refactor

```tsx
import FormInput from '@/components/form/FormInput';
import { SubmitButton } from '@/components/form/Buttons';
import FormContainer from '@/components/form/FormContainer';

const createProfileAction = async (prevState: any, formData: FormData) => {
  'use server';
  const firstName = formData.get('firstName') as string;
  if (firstName !== 'shakeAndBake') return { message: 'there was an error...' };
  return { message: 'Profile Created' };
};

function CreateProfile() {
  return (
    <section>
      <h1 className='text-2xl font-semibold mb-8 capitalize'>new user</h1>
      <div className='border p-8 rounded-md max-w-lg'>
        <FormContainer action={createProfileAction}>
          <div className='grid gap-4 mt-4 '>
            <FormInput type='text' name='firstName' label='First Name' />
            <FormInput type='text' name='lastName' label='Last Name' />
            <FormInput type='text' name='username' label='Username' />
          </div>
          <SubmitButton text='Create Profile' className='mt-8' />
        </FormContainer>
      </div>
    </section>
  );
}
export default CreateProfile;
```

### Zod

Zod is a JavaScript library for building schemas and validating data, providing type safety and error handling.

```sh
npm install zod
```

- create utils/schemas.ts

```ts
import * as z from 'zod';
import { ZodSchema } from 'zod';

export const profileSchema = z.object({
  // firstName: z.string().max(5, { message: 'max length is 5' }),
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
});
```

- create utils/actions.ts
- import in profile/create page.tsx

```ts
'use server';

import { profileSchema } from './schemas';

export const createProfileAction = async (
  prevState: any,
  formData: FormData
) => {
  try {
    const rawData = Object.fromEntries(formData);
    const validatedFields = profileSchema.parse(rawData);
    console.log(validatedFields);
    return { message: 'Profile Created' };
  } catch (error) {
    console.log(error);
    return { message: 'there was an error...' };
  }
};
```

### Supabase

- create account and organization
- create project
- setup password in .env (optional)
- add .env to .gitignore !!!
- it will take few minutes

### Prisma

- install prisma vs-code extension

Prisma ORM is a database toolkit that simplifies database access in web applications. It allows developers to interact with databases using a type-safe and auto-generated API, making database operations easier and more secure.

- Prisma server: A standalone infrastructure component sitting on top of your database.
- Prisma client: An auto-generated library that connects to the Prisma server and lets you read, write and stream data in your database. It is used for data access in your applications.

```sh
npm install prisma --save-dev
npm install @prisma/client
```

```sh
npx prisma init
```

### Setup Instance

In development, the command next dev clears Node.js cache on run. This in turn initializes a new PrismaClient instance each time due to hot reloading that creates a connection to the database. This can quickly exhaust the database connections as each PrismaClient instance holds its own connection pool.

(Prisma Instance)[https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices#solution]

- create utils/db.ts

```ts
import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
```

### Connect Supabase with Prisma

[Useful Info](https://supabase.com/partners/integrations/prisma)

- add to .env

```bash
DATABASE_URL=""
DIRECT_URL=""
```

- DATABASE_URL : Transaction + Password + "?pgbouncer=true&connection_limit=1"
- DIRECT_URL : Session + Password

### Profile Model

```prisma
model Profile {
  id           String     @id @default(uuid())
  clerkId      String     @unique
  firstName    String
  lastName     String
  username     String
  email        String
  profileImage String
  createdAt    DateTime   @default(now())
  updatedAt    DateTime   @updatedAt

}
```

### CreateProfile Action - Complete

[Clerk User Metadata](https://clerk.com/docs/users/metadata)

```ts
import db from './db';
import { auth, clerkClient, currentUser } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const createProfileAction = async (
  prevState: any,
  formData: FormData
) => {
  try {
    const user = await currentUser();
    if (!user) throw new Error('Please login to create a profile');

    const rawData = Object.fromEntries(formData);
    const validatedFields = profileSchema.parse(rawData);

    await db.profile.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        profileImage: user.imageUrl ?? '',
        ...validatedFields,
      },
    });
    await clerkClient.users.updateUserMetadata(user.id, {
      privateMetadata: {
        hasProfile: true,
      },
    });
  } catch (error) {
    return {
      message: error instanceof Error ? error.message : 'An error occurred',
    };
  }
  redirect('/');
};
```

### FetchProfileImage

actions.ts

```ts
export const fetchProfileImage = async () => {
  const user = await currentUser();
  if (!user) return null;

  const profile = await db.profile.findUnique({
    where: {
      clerkId: user.id,
    },
    select: {
      profileImage: true,
    },
  });
  return profile?.profileImage;
};
```

- components/navbar/UserIcon.tsx

```tsx
import { LuUser2 } from 'react-icons/lu';
import { fetchProfileImage } from '@/utils/actions';

async function UserIcon() {
  const profileImage = await fetchProfileImage();

  if (profileImage)
    return (
      <img src={profileImage} className='w-6 h-6 rounded-full object-cover' />
    );
  return <LuUser2 className='w-6 h-6 bg-primary rounded-full text-white' />;
}
export default UserIcon;
```

### Modify Create Profile

```tsx
import { currentUser } from '@clerk/nextjs/server';

import { redirect } from 'next/navigation';
async function CreateProfile() {
  const user = await currentUser();
  if (user?.privateMetadata?.hasProfile) redirect('/');
  ....
}
```

### Update Profile

actions.ts

```ts
const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) {
    throw new Error('You must be logged in to access this route');
  }
  if (!user.privateMetadata.hasProfile) redirect('/profile/create');
  return user;
};
```

```ts
export const fetchProfile = async () => {
  const user = await getAuthUser();

  const profile = await db.profile.findUnique({
    where: {
      clerkId: user.id,
    },
  });
  if (!profile) return redirect('/profile/create');
  return profile;
};
```

```ts
export const updateProfileAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  return { message: 'update profile action' };
};
```

app/profile/page.tsx

```tsx
import FormContainer from '@/components/form/FormContainer';
import { updateProfileAction, fetchProfile } from '@/utils/actions';
import FormInput from '@/components/form/FormInput';
import { SubmitButton } from '@/components/form/Buttons';

async function ProfilePage() {
  const profile = await fetchProfile();

  return (
    <section>
      <h1 className='text-2xl font-semibold mb-8 capitalize'>user profile</h1>
      <div className='border p-8 rounded-md'>
        {/* image input container */}

        <FormContainer action={updateProfileAction}>
          <div className='grid gap-4 md:grid-cols-2 mt-4 '>
            <FormInput
              type='text'
              name='firstName'
              label='First Name'
              defaultValue={profile.firstName}
            />
            <FormInput
              type='text'
              name='lastName'
              label='Last Name'
              defaultValue={profile.lastName}
            />
            <FormInput
              type='text'
              name='username'
              label='Username'
              defaultValue={profile.username}
            />
          </div>
          <SubmitButton text='Update Profile' className='mt-8' />
        </FormContainer>
      </div>
    </section>
  );
}
export default ProfilePage;
```

actions.ts

```ts
export const updateProfileAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();
  try {
    const rawData = Object.fromEntries(formData);

    const validatedFields = profileSchema.parse(rawData);

    await db.profile.update({
      where: {
        clerkId: user.id,
      },
      data: validatedFields,
    });
    revalidatePath('/profile');
    return { message: 'Profile updated successfully' };
  } catch (error) {
    return {
      message: error instanceof Error ? error.message : 'An error occurred',
    };
  }
};
```

### Alternative Error Handling

actions.ts

```ts
const renderError = (error: unknown): { message: string } => {
  console.log(error);
  return {
    message: error instanceof Error ? error.message : 'An error occurred',
  };
};
```

```ts
export const updateProfileAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();
  try {
    const rawData = Object.fromEntries(formData);

    const validatedFields = profileSchema.safeParse(rawData);
    if (!validatedFields.success) {
      const errors = validatedFields.error.errors.map((error) => error.message);
      throw new Error(errors.join(','));
    }

    await db.profile.update({
      where: {
        clerkId: user.id,
      },
      data: validatedFields.data,
    });
    revalidatePath('/profile');
    return { message: 'Profile updated successfully' };
  } catch (error) {
    return renderError(error);
  }
};
```

### ValidateWithZodSchema

schemas.ts

```ts
export function validateWithZodSchema<T>(
  schema: ZodSchema<T>,
  data: unknown
): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors = result.error.errors.map((error) => error.message);

    throw new Error(errors.join(', '));
  }
  return result.data;
}
```

actions.ts

```ts
// createProfileAction

const validatedFields = validateWithZodSchema(profileSchema, rawData);

// updateProfileAction
const validatedFields = validateWithZodSchema(profileSchema, rawData);

await db.profile.update({
  where: {
    clerkId: user.id,
  },
  data: validatedFields,
});
```

### ImageInput

components/form/ImageInput.tsx

```tsx
import { Label } from '../ui/label';
import { Input } from '../ui/input';

function ImageInput() {
  const name = 'image';
  return (
    <div className='mb-2'>
      <Label htmlFor={name} className='capitalize'>
        Image
      </Label>
      <Input
        id={name}
        name={name}
        type='file'
        required
        accept='image/*'
        className='max-w-xs'
      />
    </div>
  );
}
export default ImageInput;
```

### SubmitButton

```tsx
type btnSize = 'default' | 'lg' | 'sm';

type SubmitButtonProps = {
  className?: string;
  text?: string;
  size?: btnSize;
};

export function SubmitButton({
  className = '',
  text = 'submit',
  size = 'lg',
}: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button
      type='submit'
      disabled={pending}
      className={`capitalize ${className}`}
      size={size}
    >
      {pending ? (
        <>
          <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
          Please wait...
        </>
      ) : (
        text
      )}
    </Button>
  );
}
```

### ImageInputContainer

components/form/ImageInputContainer.tsx

```tsx
'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Button } from '../ui/button';
import FormContainer from './FormContainer';
import ImageInput from './ImageInput';
import { SubmitButton } from './Buttons';
import { type actionFunction } from '@/utils/types';
import { LuUser2 } from 'react-icons/lu';

type ImageInputContainerProps = {
  image: string;
  name: string;
  action: actionFunction;
  text: string;
  children?: React.ReactNode;
};

function ImageInputContainer(props: ImageInputContainerProps) {
  const { image, name, action, text } = props;
  const [isUpdateFormVisible, setUpdateFormVisible] = useState(false);

  const userIcon = (
    <LuUser2 className='w-24 h-24 bg-primary rounded-md text-white mb-4' />
  );
  return (
    <div>
      {image ? (
        <Image
          src={image}
          width={100}
          height={100}
          className='rounded-md object-cover mb-4 w-24 h-24'
          alt={name}
        />
      ) : (
        userIcon
      )}

      <Button
        variant='outline'
        size='sm'
        onClick={() => setUpdateFormVisible((prev) => !prev)}
      >
        {text}
      </Button>
      {isUpdateFormVisible && (
        <div className='max-w-lg mt-4'>
          <FormContainer action={action}>
            {props.children}
            <ImageInput />
            <SubmitButton size='sm' />
          </FormContainer>
        </div>
      )}
    </div>
  );
}
export default ImageInputContainer;
```

### updateProfileImageAction

actions.ts

```ts
export const updateProfileImageAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  return { message: 'Profile image updated successfully' };
};
```

### Profile Page

```tsx
import {
  updateProfileAction,
  fetchProfile,
  updateProfileImageAction,
} from '@/utils/actions';

import ImageInputContainer from '@/components/form/ImageInputContainer';

/* image input container */

<ImageInputContainer
  image={profile.profileImage}
  name={profile.username}
  action={updateProfileImageAction}
  text='Update Profile Image'
/>;
```

### Remote Patterns

```mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
      },
    ],
  },
};

export default nextConfig;
```

### imageSchema

schemas.ts

```ts
export const imageSchema = z.object({
  image: validateFile(),
});

function validateFile() {
  const maxUploadSize = 1024 * 1024;
  const acceptedFileTypes = ['image/'];
  return z
    .instanceof(File)
    .refine((file) => {
      return !file || file.size <= maxUploadSize;
    }, `File size must be less than 1 MB`)
    .refine((file) => {
      return (
        !file || acceptedFileTypes.some((type) => file.type.startsWith(type))
      );
    }, 'File must be an image');
}
```

The .refine() method in Zod is used to add custom validation to a Zod schema. It takes two arguments:

A function that takes a value and returns a boolean. This function is the validation rule. If it returns true, the validation passes. If it returns false, the validation fails.
A string that is the error message to be returned when the validation fails.

### updateProfileImageAction

```ts
export const updateProfileImageAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();
  try {
    const image = formData.get('image') as File;
    const validatedFields = validateWithZodSchema(imageSchema, { image });

    return { message: 'Profile image updated successfully' };
  } catch (error) {
    return renderError(error);
  }
};
```

### Create Bucket, Setup Policy and API Keys

```env
SUPABASE_URL=
SUPABASE_KEY=
```

### Setup Supabase

```sh
npm install @supabase/supabase-js
```

utils/supabase.ts

```ts
import { createClient } from '@supabase/supabase-js';

const bucket = 'home-away-draft';

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string
);

export const uploadImage = async (image: File) => {
  const timestamp = Date.now();
  // const newName = `/users/${timestamp}-${image.name}`;
  const newName = `${timestamp}-${image.name}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(newName, image, {
      cacheControl: '3600',
    });
  if (!data) throw new Error('Image upload failed');
  return supabase.storage.from(bucket).getPublicUrl(newName).data.publicUrl;
};
```

### updateProfileImageAction

```ts
export const updateProfileImageAction = async (
  prevState: any,
  formData: FormData
) => {
  const user = await getAuthUser();
  try {
    const image = formData.get('image') as File;
    const validatedFields = validateWithZodSchema(imageSchema, { image });
    const fullPath = await uploadImage(validatedFields.image);

    await db.profile.update({
      where: {
        clerkId: user.id,
      },
      data: {
        profileImage: fullPath,
      },
    });
    revalidatePath('/profile');
    return { message: 'Profile image updated successfully' };
  } catch (error) {
    return renderError(error);
  }
};
```

### Remote Patterns

```mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
      },
      {
        protocol: 'https',
        hostname: 'jxdujzgweuaphpgoowhu.supabase.co',
      },
    ],
  },
};

export default nextConfig;
```

### Property Model

```prisma
model Profile {
  properties      Property[]
}

model Property {
  id          String     @id @default(uuid())
  name        String
  tagline     String
  category    String
  image       String
  country     String
  description String
  price       Int
  guests      Int
  bedrooms    Int
  beds        Int
  baths       Int
  amenities   String
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
  profile     Profile    @relation(fields: [profileId], references: [clerkId], onDelete: Cascade)
  profileId   String
}
```

### Property Schema

- yes, no image 😜

schemas.ts

```ts
export const propertySchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'name must be at least 2 characters.',
    })
    .max(100, {
      message: 'name must be less than 100 characters.',
    }),
  tagline: z
    .string()
    .min(2, {
      message: 'tagline must be at least 2 characters.',
    })
    .max(100, {
      message: 'tagline must be less than 100 characters.',
    }),
  price: z.coerce.number().int().min(0, {
    message: 'price must be a positive number.',
  }),
  category: z.string(),
  description: z.string().refine(
    (description) => {
      const wordCount = description.split(' ').length;
      return wordCount >= 10 && wordCount <= 1000;
    },
    {
      message: 'description must be between 10 and 1000 words.',
    }
  ),
  country: z.string(),
  guests: z.coerce.number().int().min(0, {
    message: 'guest amount must be a positive number.',
  }),
  bedrooms: z.coerce.number().int().min(0, {
    message: 'bedrooms amount must be a positive number.',
  }),
  beds: z.coerce.number().int().min(0, {
    message: 'beds amount must be a positive number.',
  }),
  baths: z.coerce.number().int().min(0, {
    message: 'bahts amount must be a positive number.',
  }),
  amenities: z.string(),
});
```

### createPropertyAction

actions.ts

```ts
export const createPropertyAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();
  try {
    const rawData = Object.fromEntries(formData);
    const validatedFields = validateWithZodSchema(propertySchema, rawData);
  } catch (error) {
    return renderError(error);
  }
  redirect('/');
};
```

### Create Rental Page

- app/rentals/create/page.tsx

```tsx
import FormInput from '@/components/form/FormInput';
import FormContainer from '@/components/form/FormContainer';
import { createPropertyAction } from '@/utils/actions';
import { SubmitButton } from '@/components/form/Buttons';

function CreateProperty() {
  return (
    <section>
      <h1 className='text-2xl font-semibold mb-8 capitalize'>
        create property
      </h1>
      <div className='border p-8 rounded-md'>
        <h3 className='text-lg mb-4 font-medium'>General Info</h3>
        <FormContainer action={createPropertyAction}>
          <div className='grid md:grid-cols-2 gap-8 mb-4'>
            <FormInput
              name='name'
              type='text'
              label='Name (20 limit)'
              defaultValue='Cabin in Latvia'
            />
            <FormInput
              name='tagline'
              type='text '
              label='Tagline (30 limit)'
              defaultValue='Dream Getaway Awaits You Here!'
            />
            {/* price */}
            {/* categories */}
          </div>
          {/* text area / description */}
          <SubmitButton text='create rental' className='mt-12' />
        </FormContainer>
      </div>
    </section>
  );
}
export default CreateProperty;
```

### Price Input

- components/form/PriceInput.tsx

```ts
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Prisma } from '@prisma/client';

const name = Prisma.PropertyScalarFieldEnum.price;
// const name = 'price';
type FormInputNumberProps = {
  defaultValue?: number;
};

function PriceInput({ defaultValue }: FormInputNumberProps) {
  return (
    <div className='mb-2'>
      <Label htmlFor='price' className='capitalize'>
        Price ($)
      </Label>
      <Input
        id={name}
        type='number'
        name={name}
        min={0}
        defaultValue={defaultValue || 100}
        required
      />
    </div>
  );
}
export default PriceInput;
```

```tsx
/* price */
<PriceInput />
```

### Categories Data

- utils/categories.ts

```ts
import { IconType } from 'react-icons';
import { MdCabin } from 'react-icons/md';

import { TbCaravan, TbTent, TbBuildingCottage } from 'react-icons/tb';

import { GiWoodCabin, GiMushroomHouse } from 'react-icons/gi';
import { PiWarehouse, PiLighthouse, PiVan } from 'react-icons/pi';

import { GoContainer } from 'react-icons/go';

type Category = {
  label: CategoryLabel;
  icon: IconType;
};

export type CategoryLabel =
  | 'cabin'
  | 'tent'
  | 'airstream'
  | 'cottage'
  | 'container'
  | 'caravan'
  | 'tiny'
  | 'magic'
  | 'warehouse'
  | 'lodge';

export const categories: Category[] = [
  {
    label: 'cabin',
    icon: MdCabin,
  },
  {
    label: 'airstream',
    icon: PiVan,
  },
  {
    label: 'tent',
    icon: TbTent,
  },
  {
    label: 'warehouse',
    icon: PiWarehouse,
  },
  {
    label: 'cottage',
    icon: TbBuildingCottage,
  },
  {
    label: 'magic',
    icon: GiMushroomHouse,
  },
  {
    label: 'container',
    icon: GoContainer,
  },
  {
    label: 'caravan',
    icon: TbCaravan,
  },

  {
    label: 'tiny',
    icon: PiLighthouse,
  },
  {
    label: 'lodge',
    icon: GiWoodCabin,
  },
];
```

### Categories Input

```tsx
import { Label } from '@/components/ui/label';
import { categories } from '@/utils/categories';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const name = 'category';
function CategoriesInput({ defaultValue }: { defaultValue?: string }) {
  return (
    <div className='mb-2'>
      <Label htmlFor={name} className='capitalize'>
        Categories
      </Label>
      <Select
        defaultValue={defaultValue || categories[0].label}
        name={name}
        required
      >
        <SelectTrigger id={name}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {categories.map((item) => {
            return (
              <SelectItem key={item.label} value={item.label}>
                <span className='flex items-center gap-2'>
                  <item.icon /> {item.label}
                </span>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}
export default CategoriesInput;
```

```tsx
/* categories */
<CategoriesInput />
```

### TextArea Input

- components/form/TextAreaInput.tsx

```tsx
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type TextAreaInputProps = {
  name: string;
  labelText?: string;
  defaultValue?: string;
};

function TextAreaInput({ name, labelText, defaultValue }: TextAreaInputProps) {
  return (
    <div className='mb-2'>
      <Label htmlFor={name} className='capitalize'>
        {labelText || name}
      </Label>
      <Textarea
        id={name}
        name={name}
        defaultValue={defaultValue || tempDefaultDescription}
        rows={5}
        required
        className='leading-loose'
      />
    </div>
  );
}

const tempDefaultDescription =
  'Glamping Tuscan Style in an Aframe Cabin Tent, nestled in a beautiful olive orchard. AC, heat, Queen Bed, TV, Wi-Fi and an amazing view. Close to Weeki Wachee River State Park, mermaids, manatees, Chassahwitzka River and on the SC Bike Path. Kayaks available for rivers. Bathhouse, fire pit, Kitchenette, fresh eggs. Relax & enjoy fresh country air. No pets please. Ducks, hens and roosters roam the grounds. We have a Pot Cake Rescue from Bimini, Retriever and Pom dog. The space is inspiring and relaxing. Enjoy the beauty of the orchard. Spring trees are in blossom and harvested in Fall. We have a farm store where we sell our farm to table products';
export default TextAreaInput;
```

```tsx
/* text area / description */
<TextAreaInput name='description' labelText='Description (10 - 1000 Words)' />
```

### Countries Input

```sh
npm i world-countries
```

- utils/countries.ts

```ts
import countries from 'world-countries';

export const formattedCountries = countries.map((item) => ({
  code: item.cca2,
  name: item.name.common,
  flag: item.flag,
  location: item.latlng,
  region: item.region,
}));
export const findCountryByCode = (code: string) =>
  formattedCountries.find((item) => item.code === code);
```

- components/form/CountriesInput.tsx

```tsx
import { Label } from '@/components/ui/label';
import { formattedCountries } from '@/utils/countries';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const name = 'country';
function CountriesInput({ defaultValue }: { defaultValue?: string }) {
  return (
    <div className='mb-2'>
      <Label htmlFor={name} className='capitalize'>
        country
      </Label>
      <Select
        defaultValue={defaultValue || formattedCountries[0].code}
        name={name}
        required
      >
        <SelectTrigger id={name}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {formattedCountries.map((item) => {
            return (
              <SelectItem key={item.code} value={item.code}>
                <span className='flex items-center gap-2'>
                  {item.flag} {item.name}
                </span>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}
export default CountriesInput;
```

```tsx
<div className='grid sm:grid-cols-2 gap-8 mt-4'>
  <CountriesInput />
  <ImageInput />
</div>
```

### Accommodation / Counter Input

- components/form/CounterInput.tsx

```tsx
'use client';
import { Card, CardHeader } from '@/components/ui/card';
import { LuMinus, LuPlus } from 'react-icons/lu';

import { Button } from '../ui/button';
import { useState } from 'react';

function CounterInput({
  detail,
  defaultValue,
}: {
  detail: string;
  defaultValue?: number;
}) {
  const [count, setCount] = useState(defaultValue || 0);
  const increaseCount = () => {
    setCount((prevCount) => prevCount + 1);
  };
  const decreaseCount = () => {
    setCount((prevCount) => {
      if (prevCount > 0) {
        return prevCount - 1;
      }
      return prevCount;
    });
  };
  return (
    <Card className='mb-4'>
      <input type='hidden' name={detail} value={count} />
      <CardHeader className='flex flex-col gapy-5'>
        <div className='flex items-center justify-between flex-wrap'>
          <div className='flex flex-col'>
            <h2 className='font-medium capitalize'>{detail}</h2>
            <p className='text-muted-foreground text-sm'>
              Specify the number of {detail}
            </p>
          </div>
          <div className='flex items-center gap-4'>
            <Button
              variant='outline'
              size='icon'
              type='button'
              onClick={decreaseCount}
            >
              <LuMinus className='w-5 h-5 text-primary' />
            </Button>
            <span className='text-xl font-bold w-5 text-center'>{count}</span>
            <Button
              variant='outline'
              size='icon'
              type='button'
              onClick={increaseCount}
            >
              <LuPlus className='w-5 h-5 text-primary' />
            </Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}

export default CounterInput;
```

```tsx
return (
  <>
    <h3 className='text-lg mt-8 mb-4 font-medium'>Accommodation Details</h3>
    <CounterInput detail='guests' />
    <CounterInput detail='bedrooms' />
    <CounterInput detail='beds' />
    <CounterInput detail='baths' />
  </>
);
```

### Amenities

- utils/amenities.ts

```ts
import { IconType } from 'react-icons';
export type Amenity = {
  name: string;
  icon: IconType;
  selected: boolean;
};
import {
  FiCloud,
  FiTruck,
  FiZap,
  FiWind,
  FiSun,
  FiCoffee,
  FiFeather,
  FiAirplay,
  FiTrello,
  FiBox,
  FiAnchor,
  FiDroplet,
  FiMapPin,
  FiSunrise,
  FiSunset,
  FiMusic,
  FiHeadphones,
  FiRadio,
  FiFilm,
  FiTv,
} from 'react-icons/fi';

export const amenities: Amenity[] = [
  { name: 'unlimited cloud storage', icon: FiCloud, selected: false },
  { name: 'VIP parking for squirrels', icon: FiTruck, selected: false },
  { name: 'self-lighting fire pit', icon: FiZap, selected: false },
  {
    name: 'bbq grill with a masterchef diploma',
    icon: FiWind,
    selected: false,
  },
  { name: 'outdoor furniture (tree stumps)', icon: FiSun, selected: false },
  { name: 'private bathroom (bushes nearby)', icon: FiCoffee, selected: false },
  { name: 'hot shower (sun required)', icon: FiFeather, selected: false },
  { name: 'kitchenette (aka fire pit)', icon: FiAirplay, selected: false },
  { name: 'natural heating (bring a coat)', icon: FiTrello, selected: false },
  {
    name: 'air conditioning (breeze from the west)',
    icon: FiBox,
    selected: false,
  },
  { name: 'bed linens (leaves)', icon: FiAnchor, selected: false },
  { name: 'towels (more leaves)', icon: FiDroplet, selected: false },
  {
    name: 'picnic table (yet another tree stump)',
    icon: FiMapPin,
    selected: false,
  },
  { name: 'hammock (two trees and a rope)', icon: FiSunrise, selected: false },
  { name: 'solar power (daylight)', icon: FiSunset, selected: false },
  { name: 'water supply (river a mile away)', icon: FiMusic, selected: false },
  {
    name: 'cooking utensils (sticks and stones)',
    icon: FiHeadphones,
    selected: false,
  },
  { name: 'cool box (hole in the ground)', icon: FiRadio, selected: false },
  { name: 'lanterns (fireflies)', icon: FiFilm, selected: false },
  { name: 'first aid kit (hope and prayers)', icon: FiTv, selected: false },
];

export const conservativeAmenities: Amenity[] = [
  { name: 'cloud storage', icon: FiCloud, selected: false },
  { name: 'parking', icon: FiTruck, selected: false },
  { name: 'fire pit', icon: FiZap, selected: false },
  { name: 'bbq grill', icon: FiWind, selected: false },
  { name: 'outdoor furniture', icon: FiSun, selected: false },
  { name: 'private bathroom', icon: FiCoffee, selected: false },
  { name: 'hot shower', icon: FiFeather, selected: false },
  { name: 'kitchenette', icon: FiAirplay, selected: false },
  { name: 'heating', icon: FiTrello, selected: false },
  { name: 'air conditioning', icon: FiBox, selected: false },
  { name: 'bed linens', icon: FiAnchor, selected: false },
  { name: 'towels', icon: FiDroplet, selected: false },
  { name: 'picnic table', icon: FiMapPin, selected: false },
  { name: 'hammock', icon: FiSunrise, selected: false },
  { name: 'solar power', icon: FiSunset, selected: false },
  { name: 'water supply', icon: FiMusic, selected: false },
  { name: 'cooking utensils', icon: FiHeadphones, selected: false },
  { name: 'cool box', icon: FiRadio, selected: false },
  { name: 'lanterns', icon: FiFilm, selected: false },
  { name: 'first aid kit', icon: FiTv, selected: false },
];
```

- components/form/AmenitiesInput.tsx

```tsx
'use client';
import { useState } from 'react';
import { amenities, Amenity } from '@/utils/amenities';
import { Checkbox } from '@/components/ui/checkbox';

function AmenitiesInput({ defaultValue }: { defaultValue?: Amenity[] }) {
  const [selectedAmenities, setSelectedAmenities] = useState<Amenity[]>(
    defaultValue || amenities
  );

  const handleChange = (amenity: Amenity) => {
    setSelectedAmenities((prev) => {
      return prev.map((a) => {
        if (a.name === amenity.name) {
          return { ...a, selected: !a.selected };
        }
        return a;
      });
    });
  };

  return (
    <section>
      <input
        type='hidden'
        name='amenities'
        value={JSON.stringify(selectedAmenities)}
      />
      <div className='grid grid-cols-2 gap-4'>
        {selectedAmenities.map((amenity) => (
          <div key={amenity.name} className='flex items-center space-x-2'>
            <Checkbox
              id={amenity.name}
              checked={amenity.selected}
              onCheckedChange={() => handleChange(amenity)}
            />
            <label
              htmlFor={amenity.name}
              className='text-sm font-medium leading-none capitalize flex gap-x-2 items-center'
            >
              {amenity.name}
              <amenity.icon className='w-4 h-4' />
            </label>
          </div>
        ))}
      </div>
    </section>
  );
}
export default AmenitiesInput;
```

```tsx
return (
  <>
    <h3 className='text-lg mt-10 mb-6 font-medium'>Amenities</h3>
    <AmenitiesInput />
  </>
);
```

### createRentalAction

```tsx
export const createPropertyAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();
  try {
    const rawData = Object.fromEntries(formData);
    const file = formData.get('image') as File;

    const validatedFields = validateWithZodSchema(propertySchema, rawData);
    const validatedFile = validateWithZodSchema(imageSchema, { image: file });
    const fullPath = await uploadImage(validatedFile.image);

    await db.property.create({
      data: {
        ...validatedFields,
        image: fullPath,
        profileId: user.id,
      },
    });
  } catch (error) {
    return renderError(error);
  }
  redirect('/');
};
```

### fetchProperties

utils/types.ts

```ts
export type PropertyCardProps = {
  image: string;
  id: string;
  name: string;
  tagline: string;
  country: string;
  price: number;
};
```

actions.ts

```ts
export const fetchProperties = async ({
  search = '',
  category,
}: {
  search?: string;
  category?: string;
}) => {
  const properties = await db.property.findMany({
    where: {
      category,
      OR: [
        { name: { contains: search, mode: 'insensitive' } },
        { tagline: { contains: search, mode: 'insensitive' } },
      ],
    },
    select: {
      id: true,
      name: true,
      tagline: true,
      country: true,
      image: true,
      price: true,
    },
  });
  return properties;
};
```

### Home Page

- create in components/home
  - CategoriesList.tsx
  - EmptyList.tsx
  - PropertiesContainer.tsx
  - PropertiesList.tsx

```tsx
import CategoriesList from '@/components/home/CategoriesList';
import PropertiesContainer from '@/components/home/PropertiesContainer';

function HomePage() {
  return (
    <section>
      <CategoriesList />
      <PropertiesContainer />
    </section>
  );
}
export default HomePage;
```

### Search Params

```tsx
import CategoriesList from '@/components/home/CategoriesList';
import PropertiesContainer from '@/components/home/PropertiesContainer';

function HomePage({
  searchParams,
}: {
  searchParams: { category?: string; search?: string };
}) {
  // console.log(searchParams);

  return (
    <section>
      <CategoriesList
        category={searchParams?.category}
        search={searchParams?.search}
      />
      <PropertiesContainer
        category={searchParams?.category}
        search={searchParams?.search}
      />
    </section>
  );
}
export default HomePage;
```

### CategoriesList

```tsx
import { categories } from '@/utils/categories';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import Link from 'next/link';

function CategoriesList({
  category,
  search,
}: {
  category?: string;
  search?: string;
}) {
  const searchTerm = search ? `&search=${search}` : '';
  return (
    <section>
      <ScrollArea className='py-6'>
        <div className='flex gap-x-4'>
          {categories.map((item) => {
            const isActive = item.label === category;
            return (
              <Link
                key={item.label}
                href={`/?category=${item.label}${searchTerm}`}
              >
                <article
                  className={`p-3 flex flex-col items-center cursor-pointer duration-300  hover:text-primary w-[100px] ${
                    isActive ? 'text-primary' : ''
                  }`}
                >
                  <item.icon className='w-8 h-8 ' />
                  <p className='capitalize text-sm mt-1'>{item.label}</p>
                </article>
              </Link>
            );
          })}
        </div>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
    </section>
  );
}
export default CategoriesList;
```

### EmptyList

```tsx
import { Button } from '../ui/button';
import Link from 'next/link';

function EmptyList({
  heading = 'No items in the list.',
  message = 'Keep exploring our properties.',
  btnText = 'back home',
}: {
  heading?: string;
  message?: string;
  btnText?: string;
}) {
  return (
    <div className='mt-4'>
      <h2 className='text-xl font-bold '>{heading}</h2>
      <p className='text-lg'>{message}</p>
      <Button asChild className='mt-4 capitalize' size='lg'>
        <Link href='/'>{btnText}</Link>
      </Button>
    </div>
  );
}
export default EmptyList;
```

### PropertiesContainer

```tsx
import { fetchProperties } from '@/utils/actions';
import PropertiesList from './PropertiesList';
import EmptyList from './EmptyList';
import type { PropertyCardProps } from '@/utils/types';

async function PropertiesContainer({
  category,
  search,
}: {
  category?: string;
  search?: string;
}) {
  const properties: PropertyCardProps[] = await fetchProperties({
    category,
    search,
  });

  if (properties.length === 0) {
    return (
      <EmptyList
        heading='No results.'
        message='Try changing or removing some of your filters.'
        btnText='Clear Filters'
      />
    );
  }

  return <PropertiesList properties={properties} />;
}
export default PropertiesContainer;
```

### Card Components

- components/card
  - CountryFlagAndName.tsx
  - FavoriteToggleButton.tsx
  - FavoriteToggleForm.tsx
  - LoadingCards.tsx
  - PropertyCard.tsx
  - PropertyRating.tsx

### PropertiesList

```tsx
import PropertyCard from '../card/PropertyCard';
import type { PropertyCardProps } from '@/utils/types';

function PropertiesList({ properties }: { properties: PropertyCardProps[] }) {
  return (
    <section className='mt-4 gap-8 grid sm:grid-cols-2  lg:grid-cols-3  xl:grid-cols-4'>
      {properties.map((property) => {
        return <PropertyCard key={property.id} property={property} />;
      })}
    </section>
  );
}
export default PropertiesList;
```

### formatCurrency

- utils/format.ts

```ts
export const formatCurrency = (amount: number | null) => {
  const value = amount || 0;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};
```

### PropertyCard

```tsx
import Image from 'next/image';
import Link from 'next/link';
import CountryFlagAndName from './CountryFlagAndName';
import PropertyRating from './PropertyRating';
import FavoriteToggleButton from './FavoriteToggleButton';
import { PropertyCardProps } from '@/utils/types';
import { formatCurrency } from '@/utils/format';

function PropertyCard({ property }: { property: PropertyCardProps }) {
  const { name, image, price } = property;
  const { country, id: propertyId, tagline } = property;

  return (
    <article className='group relative'>
      <Link href={`/properties/${propertyId}`}>
        <div className='relative h-[300px] mb-2 overflow-hidden rounded-md'>
          <Image
            src={image}
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw'
            alt={name}
            className='rounded-md object-cover transform group-hover:scale-110 transition-transform duration-500'
          />
        </div>
        <div className='flex justify-between items-center'>
          <h3 className='text-sm font-semibold mt-1'>
            {name.substring(0, 30)}
          </h3>
          {/* property rating */}
        </div>
        <p className='text-sm mt-1 text-muted-foreground '>
          {tagline.substring(0, 40)}
        </p>
        <div className='flex justify-between items-center mt-1'>
          <p className='text-sm mt-1 '>
            <span className='font-semibold'>{formatCurrency(price)} </span>
            night
          </p>
          {/* country and flag */}
        </div>
      </Link>
      <div className='absolute top-5 right-5 z-5'>
        {/* favorite toggle button */}
      </div>
    </article>
  );
}
export default PropertyCard;
```

### Property Rating

```tsx
import { FaStar } from 'react-icons/fa';

async function PropertyRating({
  propertyId,
  inPage,
}: {
  propertyId: string;
  inPage: boolean;
}) {
  // temp
  const rating = 4.7;
  const count = 100;

  const className = `flex gap-1 items-center ${inPage ? 'text-md' : 'text-xs'}`;
  const countText = count > 1 ? 'reviews' : 'review';
  const countValue = `(${count}) ${inPage ? countText : ''}`;
  return (
    <span className={className}>
      <FaStar className='w-3 h-3' />
      {rating} {countValue}
    </span>
  );
}

export default PropertyRating;
```

```tsx
<PropertyRating inPage={false} propertyId={propertyId} />
```

### FavoriteToggleButton

```tsx
import { FaHeart } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
function FavoriteToggleButton({ propertyId }: { propertyId: string }) {
  return (
    <Button size='icon' variant='outline' className='p-2 cursor-pointer'>
      <FaHeart />
    </Button>
  );
}
export default FavoriteToggleButton;
```

```tsx
<div className='absolute top-5 right-5 z-5'>
  <FavoriteToggleButton propertyId={propertyId} />
</div>
```

### CountryFlagAndName

```tsx
import { findCountryByCode } from '@/utils/countries';

function CountryFlagAndName({ countryCode }: { countryCode: string }) {
  const validCountry = findCountryByCode(countryCode);
  const countryName =
    validCountry!.name.length > 20
      ? `${validCountry!.name.substring(0, 20)}...`
      : validCountry!.name;
  return (
    <span className='flex justify-between items-center gap-2 text-sm '>
      {validCountry?.flag} {countryName}
    </span>
  );
}
export default CountryFlagAndName;
```

```tsx
<CountryFlagAndName countryCode={country} />
```

### Suspense

- app/loading.tsx - always an option

components/card/LoadingCards.tsx

```tsx
import { Skeleton } from '@/components/ui/skeleton';

function LoadingCards() {
  return (
    <section className='mt-4 gap-8 grid sm:grid-cols-2  lg:grid-cols-3  xl:grid-cols-4'>
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </section>
  );
}
export default LoadingCards;

export function SkeletonCard() {
  return (
    <div>
      <Skeleton className='h-[300px] rounded-md' />
      <Skeleton className='h-4 mt-2 w-3/4' />
      <Skeleton className='h-4 mt-2 w-1/2' />
    </div>
  );
}
```

app/page.tsx

- navigate to a different page, refresh and then navigate back to home page
- make sure you fetch in component not page

```tsx
import CategoriesList from '@/components/home/CategoriesList';
import PropertiesContainer from '@/components/home/PropertiesContainer';
import LoadingCards from '@/components/card/LoadingCards';
import { Suspense } from 'react';
function HomePage({
  searchParams,
}: {
  searchParams: { category?: string; search?: string };
}) {
  return (
    <section>
      <CategoriesList
        category={searchParams?.category}
        search={searchParams?.search}
      />
      <Suspense fallback={<LoadingCards />}>
        <PropertiesContainer
          category={searchParams?.category}
          search={searchParams?.search}
        />
      </Suspense>
    </section>
  );
}
export default HomePage;
```

### SearchInput

```sh
npm i use-debounce
```

components/navbar/NavSearch.tsx

```tsx
'use client';
import { Input } from '../ui/input';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { useState, useEffect } from 'react';

function NavSearch() {
  const searchParams = useSearchParams();

  const pathname = usePathname();
  const { replace } = useRouter();
  const [search, setSearch] = useState(
    searchParams.get('search')?.toString() || ''
  );
  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set('search', value);
    } else {
      params.delete('search');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);
  useEffect(() => {
    if (!searchParams.get('search')) {
      setSearch('');
    }
  }, [searchParams.get('search')]);
  return (
    <Input
      type='search'
      placeholder='find a property...'
      className='max-w-xs dark:bg-muted '
      onChange={(e) => {
        setSearch(e.target.value);
        handleSearch(e.target.value);
      }}
      value={search}
    />
  );
}
export default NavSearch;
```

### Favorites Model

```prisma

model Profile {
favorites    Favorite[]
}

model Property {
favorites    Favorite[]
}

model Favorite {
  id        String   @id @default(uuid())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  profile   Profile  @relation(fields: [profileId], references: [clerkId], onDelete: Cascade)
  profileId String

  property   Property  @relation(fields: [propertyId], references: [id], onDelete: Cascade)
  propertyId String

}
```

```sh
npx prisma db push
```

### CardSignInButton

components/form/Buttons.tsx

```tsx
import { SignInButton } from '@clerk/nextjs';
import { FaRegHeart, FaHeart } from 'react-icons/fa';

export const CardSignInButton = () => {
  return (
    <SignInButton mode='modal'>
      <Button
        type='button'
        size='icon'
        variant='outline'
        className='p-2 cursor-pointer'
        asChild
      >
        <FaRegHeart />
      </Button>
    </SignInButton>
  );
};
```

components/card/FavoriteToggleButton.tsx

```tsx
import { FaHeart } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { auth } from '@clerk/nextjs/server';
import { CardSignInButton } from '../form/Buttons';
function FavoriteToggleButton({ propertyId }: { propertyId: string }) {
  const { userId } = auth();
  if (!userId) return <CardSignInButton />;
  return (
    <Button size='icon' variant='outline' className='p-2 cursor-pointer'>
      <FaHeart />
    </Button>
  );
}
export default FavoriteToggleButton;
```

### fetchFavorite

actions.ts

```ts
export const fetchFavoriteId = async ({
  propertyId,
}: {
  propertyId: string;
}) => {
  const user = await getAuthUser();
  const favorite = await db.favorite.findFirst({
    where: {
      propertyId,
      profileId: user.id,
    },
    select: {
      id: true,
    },
  });
  return favorite?.id || null;
};
export const toggleFavoriteAction = async () => {
  return { message: 'toggle favorite' };
};
```

### FavoriteToggleButton - Complete

```tsx
import { auth } from '@clerk/nextjs/server';
import { CardSignInButton } from '../form/Buttons';
import { fetchFavoriteId } from '@/utils/actions';
import FavoriteToggleForm from './FavoriteToggleForm';
async function FavoriteToggleButton({ propertyId }: { propertyId: string }) {
  const { userId } = auth();
  if (!userId) return <CardSignInButton />;
  const favoriteId = await fetchFavoriteId({ propertyId });

  return <FavoriteToggleForm favoriteId={favoriteId} propertyId={propertyId} />;
}
export default FavoriteToggleButton;
```

### CardSubmitButton

components/form/Buttons.tsx

```tsx
export const CardSubmitButton = ({ isFavorite }: { isFavorite: boolean }) => {
  const { pending } = useFormStatus();
  return (
    <Button
      type='submit'
      size='icon'
      variant='outline'
      className=' p-2 cursor-pointer'
    >
      {pending ? (
        <ReloadIcon className=' animate-spin' />
      ) : isFavorite ? (
        <FaHeart />
      ) : (
        <FaRegHeart />
      )}
    </Button>
  );
};
```

### FavoriteToggleForm

```tsx
'use client';

import { usePathname } from 'next/navigation';
import FormContainer from '../form/FormContainer';
import { toggleFavoriteAction } from '@/utils/actions';
import { CardSubmitButton } from '../form/Buttons';

type FavoriteToggleFormProps = {
  propertyId: string;
  favoriteId: string | null;
};

function FavoriteToggleForm({
  propertyId,
  favoriteId,
}: FavoriteToggleFormProps) {
  const pathname = usePathname();
  const toggleAction = toggleFavoriteAction.bind(null, {
    propertyId,
    favoriteId,
    pathname,
  });
  return (
    <FormContainer action={toggleAction}>
      <CardSubmitButton isFavorite={favoriteId ? true : false} />
    </FormContainer>
  );
}
export default FavoriteToggleForm;
```

### toggleFavoriteAction

actions.ts

```ts
export const toggleFavoriteAction = async (prevState: {
  propertyId: string;
  favoriteId: string | null;
  pathname: string;
}) => {
  const user = await getAuthUser();
  const { propertyId, favoriteId, pathname } = prevState;
  try {
    if (favoriteId) {
      await db.favorite.delete({
        where: {
          id: favoriteId,
        },
      });
    } else {
      await db.favorite.create({
        data: {
          propertyId,
          profileId: user.id,
        },
      });
    }
    revalidatePath(pathname);
    return { message: favoriteId ? 'Removed from Faves' : 'Added to Faves' };
  } catch (error) {
    return renderError(error);
  }
};
```

### fetchFavorites

actions.ts

```ts
export const fetchFavorites = async () => {
  const user = await getAuthUser();
  const favorites = await db.favorite.findMany({
    where: {
      profileId: user.id,
    },
    select: {
      property: {
        select: {
          id: true,
          name: true,
          tagline: true,
          price: true,
          country: true,
          image: true,
        },
      },
    },
  });
  return favorites.map((favorite) => favorite.property);
};
```

### Favorites Page

- favorites/loading.tsx

```tsx
'use client';
import LoadingCards from '@/components/card/LoadingCards';

function loading() {
  return <LoadingCards />;
}
export default loading;
```

- favorites/page.tsx

```tsx
import EmptyList from '@/components/home/EmptyList';
import PropertiesList from '@/components/home/PropertiesList';
import { fetchFavorites } from '@/utils/actions';

async function FavoritesPage() {
  const favorites = await fetchFavorites();

  if (favorites.length === 0) {
    return <EmptyList />;
  }

  return <PropertiesList properties={favorites} />;
}
export default FavoritesPage;
```

### fetchPropertyDetails

```ts
export const fetchPropertyDetails = (id: string) => {
  return db.property.findUnique({
    where: {
      id,
    },
    include: {
      profile: true,
    },
  });
};
```

- properties/[id]/loading.tsx

```ts
'use client';

import { Skeleton } from '@/components/ui/skeleton';
function loading() {
  return <Skeleton className='h-[300px] md:h-[500px] w-full rounded' />;
}

export default loading;
```

- properties/[id]/page.tsx

```tsx
import { fetchPropertyDetails } from '@/utils/actions';
import { redirect } from 'next/navigation';

async function PropertyDetailsPage({ params }: { params: { id: string } }) {
  const property = await fetchPropertyDetails(params.id);
  if (!property) redirect('/');
  const { baths, bedrooms, beds, guests } = property;
  const details = { baths, bedrooms, beds, guests };
  return <div>PropertyDetailsPage</div>;
}
export default PropertyDetailsPage;
```

### BreadCrumbs

- components/properties/BreadCrumbs.tsx

```tsx
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

function BreadCrumbs({ name }: { name: string }) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href='/'>Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{name}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
export default BreadCrumbs;
```

- properties/[id]/page.tsx

```tsx
return (
  <section>
    <BreadCrumbs name={property.name} />
    <header className='flex justify-between items-center mt-4'>
      <h1 className='text-4xl font-bold '>{property.tagline}</h1>
      <div className='flex items-center gap-x-4'>
        {/* share button */}
        <FavoriteToggleButton propertyId={property.id} />
      </div>
    </header>
  </section>
);
```

### ShareButton

[React Share](https://www.npmjs.com/package/react-share)

```sh
npm i react-share
```

- components/properties/ShareButton.tsx

```tsx
'use client';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '../ui/button';
import { LuShare2 } from 'react-icons/lu';

import {
  TwitterShareButton,
  EmailShareButton,
  LinkedinShareButton,
  TwitterIcon,
  EmailIcon,
  LinkedinIcon,
} from 'react-share';

function ShareButton({
  propertyId,
  name,
}: {
  propertyId: string;
  name: string;
}) {
  const url = process.env.NEXT_PUBLIC_WEBSITE_URL;
  const shareLink = `${url}/properties/${propertyId}`;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' size='icon' className='p-2'>
          <LuShare2 />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side='top'
        align='end'
        sideOffset={10}
        className='flex items-center gap-x-2 justify-center w-full'
      >
        <TwitterShareButton url={shareLink} title={name}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <LinkedinShareButton url={shareLink} title={name}>
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
        <EmailShareButton url={shareLink} subject={name}>
          <EmailIcon size={32} round />
        </EmailShareButton>
      </PopoverContent>
    </Popover>
  );
}
export default ShareButton;
```

- properties/[id]/page.tsx

```tsx
return (
  <div className='flex items-center gap-x-4'>
    <ShareButton name={property.name} propertyId={property.id} />
    <FavoriteToggleButton propertyId={property.id} />
  </div>
);
```

### ImageContainer

- components/properties/ImageContainer.tsx

```tsx
import Image from 'next/image';

function ImageContainer({
  mainImage,
  name,
}: {
  mainImage: string;
  name: string;
}) {
  return (
    <section className='h-[300px] md:h-[500px] relative mt-8'>
      <Image
        src={mainImage}
        fill
        sizes='100vw'
        alt={name}
        className='object-cover  rounded-md'
        priority
      />
    </section>
  );
}
export default ImageContainer;
```

- properties/[id]/page.tsx

```tsx
<ImageContainer mainImage={property.image} name={property.name} />
```

### Col Layout

- properties/[id]/page.tsx

```tsx
return (
  <section className='lg:grid lg:grid-cols-12 gap-x-12 mt-12'>
    <div className='lg:col-span-8'>
      <div className='flex gap-x-4 items-center'>
        <h1 className='text-xl font-bold'>{property.name}</h1>
        <PropertyRating inPage propertyId={property.id} />
      </div>
    </div>
    <div className='lg:col-span-4 flex flex-col items-center'>
      {/* calendar */}
    </div>
  </section>
);
```

### Calendar - Initial Setup

- components/properties/booking/BookingCalendar.tsx

```tsx
'use client';
import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { DateRange } from 'react-day-picker';

export default function App() {
  const currentDate = new Date();
  const defaultSelected: DateRange = {
    from: undefined,
    to: undefined,
  };
  const [range, setRange] = useState<DateRange | undefined>(defaultSelected);

  return (
    <Calendar
      id='test'
      mode='range'
      defaultMonth={currentDate}
      selected={range}
      onSelect={setRange}
    />
  );
}
```

- properties/[id]/page.tsx

```tsx
<div className='lg:col-span-4 flex flex-col items-center'>
  {/* calendar */}
  <BookingCalendar />
</div>
```

### PropertyDetails

- utils/format.ts

```ts
export function formatQuantity(quantity: number, noun: string): string {
  return quantity === 1 ? `${quantity} ${noun}` : `${quantity} ${noun}s`;
}
```

- components/properties/PropertyDetails.tsx

```tsx
import { formatQuantity } from '@/utils/format';

type PropertyDetailsProps = {
  details: {
    bedrooms: number;
    baths: number;
    guests: number;
    beds: number;
  };
};

function PropertyDetails({
  details: { bedrooms, baths, guests, beds },
}: PropertyDetailsProps) {
  return (
    <p className='text-md font-light '>
      <span>{formatQuantity(bedrooms, 'bedroom')} &middot; </span>
      <span>{formatQuantity(baths, 'bath')} &middot; </span>
      <span>{formatQuantity(guests, 'guest')} &middot; </span>
      <span>{formatQuantity(beds, 'bed')}</span>
    </p>
  );
}
export default PropertyDetails;
```

- properties/[id]/page.tsx

```tsx
<PropertyDetails details={details} />
```

### UserInfo

- components/properties/UserInfo.tsx

```tsx
import Image from 'next/image';

type UserInfoProps = {
  profile: {
    profileImage: string;
    firstName: string;
  };
};

function UserInfo({ profile: { profileImage, firstName } }: UserInfoProps) {
  return (
    <article className='grid grid-cols-[auto,1fr] gap-4 mt-4'>
      <Image
        src={profileImage}
        alt={firstName}
        width={50}
        height={50}
        className='rounded-md w-12 h-12 object-cover'
      />
      <div>
        <p>
          Hosted by
          <span className='font-bold'> {firstName}</span>
        </p>
        <p className='text-muted-foreground font-light'>
          Superhost &middot; 2 years hosting
        </p>
      </div>
    </article>
  );
}
export default UserInfo;
```

- properties/[id]/page.tsx

```tsx
const firstName = property.profile.firstName;
const profileImage = property.profile.profileImage;

<UserInfo profile={{ firstName, profileImage }} />;
```

### Description

- components/properties/Title.tsx

```tsx
function Title({ text }: { text: string }) {
  return <h3 className='text-lg font-bold  mb-2'>{text}</h3>;
}
export default Title;
```

- components/properties/Description.tsx

```tsx
'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Title from './Title';
const Description = ({ description }: { description: string }) => {
  const [isFullDescriptionShown, setIsFullDescriptionShown] = useState(false);
  const words = description.split(' ');
  const isLongDescription = words.length > 100;

  const toggleDescription = () => {
    setIsFullDescriptionShown(!isFullDescriptionShown);
  };

  const displayedDescription =
    isLongDescription && !isFullDescriptionShown
      ? words.slice(0, 100).join(' ') + '...'
      : description;

  return (
    <article className='mt-4'>
      <Title text='Description' />
      <p className='text-muted-foreground font-light leading-loose'>
        {displayedDescription}
      </p>
      {isLongDescription && (
        <Button variant='link' className='pl-0' onClick={toggleDescription}>
          {isFullDescriptionShown ? 'Show less' : 'Show more'}
        </Button>
      )}
    </article>
  );
};

export default Description;
```

- properties/[id]/page.tsx

```tsx
<Separator className='mt-4' />
<Description description={property.description} />
```

### Amenities

- components/properties/Amenities.tsx

```tsx
import { Amenity } from '@/utils/amenities';
import { LuFolderCheck } from 'react-icons/lu';
import Title from './Title';

function Amenities({ amenities }: { amenities: string }) {
  const amenitiesList: Amenity[] = JSON.parse(amenities as string);
  const noAmenities = amenitiesList.every((amenity) => !amenity.selected);

  if (noAmenities) {
    return null;
  }
  return (
    <div className='mt-4'>
      <Title text='What this place offers' />
      <div className='grid md:grid-cols-2 gap-x-4'>
        {amenitiesList.map((amenity) => {
          if (!amenity.selected) {
            return null;
          }
          return (
            <div key={amenity.name} className='flex items-center gap-x-4 mb-2 '>
              <LuFolderCheck className='h-6 w-6 text-primary' />
              <span className='font-light text-sm capitalize'>
                {amenity.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Amenities;
```

- properties/[id]/page.tsx

```tsx
<Amenities amenities={property.amenities} />
```

### PropertyMap

[React Leaflet](https://react-leaflet.js.org/)

Leaflet makes direct calls to the DOM when it is loaded, therefore React Leaflet is not compatible with server-side rendering.

```sh
npm install react react-dom leaflet react-leaflet
```

```sh
npm install -D @types/leaflet
```

- components/properties/PropertyMap.tsx

```tsx
'use client';
import { MapContainer, TileLayer, Marker, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { icon } from 'leaflet';
const iconUrl =
  'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png';
const markerIcon = icon({
  iconUrl: iconUrl,
  iconSize: [20, 30],
});

import { findCountryByCode } from '@/utils/countries';
import CountryFlagAndName from '../card/CountryFlagAndName';
import Title from './Title';

function PropertyMap({ countryCode }: { countryCode: string }) {
  const defaultLocation = [51.505, -0.09] as [number, number];
  const location = findCountryByCode(countryCode)?.location as [number, number];

  return (
    <div className='mt-4'>
      <div className='mb-4 '>
        <Title text='Where you will be staying' />
        <CountryFlagAndName countryCode={countryCode} />
      </div>
      <MapContainer
        scrollWheelZoom={false}
        zoomControl={false}
        className='h-[50vh] rounded-lg relative z-0'
        center={location || defaultLocation}
        zoom={7}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <ZoomControl position='bottomright' />
        <Marker
          position={location || defaultLocation}
          icon={markerIcon}
        ></Marker>
      </MapContainer>
    </div>
  );
}
export default PropertyMap;
```

- properties/[id]/page.tsx

```tsx
const DynamicMap = dynamic(
  () => import('@/components/properties/PropertyMap'),
  {
    ssr: false,
    loading: () => <Skeleton className='h-[400px] w-full' />,
  }
);
return <DynamicMap countryCode={property.country} />;
```

Lazy Loading: Components wrapped with dynamic are lazy loaded. This means that the component code is not loaded until it is needed. For example, if you have a component that is only visible when a user clicks a button, you could use dynamic to ensure that the code for that component is not loaded until the button is clicked.

Server Side Rendering (SSR) Control: By default, Next.js pre-renders every page. This means that it generates HTML for each page in advance, instead of doing it all on the client-side. However, with dynamic, you can control this behavior. You can choose to disable SSR for specific modules, which can be useful for modules that have client-side dependencies.

### Deploy

```json
"scripts": {
    "dev": "next dev",
    "build": "npx prisma generate && next build",
    "start": "next start",
    "lint": "next lint"
  },
```

- refactor NavSearch Component
