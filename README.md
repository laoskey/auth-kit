This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Introduction

Auth Kit is a Next.js-based authentication kit that provides user authentication and role-based access control. It integrates with popular authentication providers like Google and GitHub, and uses Prisma for database management.

## TODO:

1. deploy the app on the vercel
2. add the domain on the Resend.com to send email for every user's email

## Getting Started

### Prerequisites

- Node.js (version 20 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd auth-kit
```

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev

```

```bash prisma
# or
npx prisma migrate reset
#or
npx prisma generate
# or
npx prisma db push
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

##Keywords
role bases access

#### Usage

### Role - Based Access Control

Use the RoleGate component to restrict access to certain content based on the user's role:

```jsx
import { RoleGate } from "@/components/auth/RoleGate";
import { UserRole } from "@prisma/client";

const AdminPage = () => {
  return (
    <RoleGate allowedRole={UserRole.ADMIN}>
      <div>Admin - only content</div>
    </RoleGate>
  );
};

export default AdminPage;
```
