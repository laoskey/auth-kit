import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Card, CardFooter, CardHeader } from "../ui/card";
import { BackButton } from "./BackButton";
import { CardWrapper } from "./CardWrapper";
import { Header } from "./Header";

export const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel='Opps! Something went wrong!'
      //   showSocial
      backButtonHref='/login'
      backButtonLabel='Back to login'
    >
      <div className=' w-full flex justify-center items-center'>
        <ExclamationTriangleIcon className='text-destructive w-6 h-6' />
      </div>
    </CardWrapper>
  );
  return (
    <Card>
      <CardHeader>
        <Header label='Opps ! Something wenr wrong ' />
      </CardHeader>
      <CardFooter>
        <BackButton
          label='back to login'
          href='/login'
        />
      </CardFooter>
    </Card>
  );
};
