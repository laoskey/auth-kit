import { LoginButtoon } from "@/components/auth/LoginButtoon";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className='flex flex-col h-full min-h-screen items-center justify-center bg-gradient-to-tr from-sky-400 to-blue-400'>
      <div className=' space-y-6 text-center'>
        <h1 className='relative flex items-baseline justify-center gap-2 text-white text-6xl font-semibold drop-shadow-md'>
          <Image
            src={"/svgs/locked-svgrepo-com.svg"}
            alt=''
            width={50}
            height={50}
          />
          Auth
        </h1>
        <p className=' text-white text-lg'>
          A simple authenticatin service
        </p>
        <div className=''>
          <LoginButtoon
            mode='modal'
            asChild
          >
            <Button
              variant={"secondary"}
              size={"lg"}
            >
              Sign in
            </Button>
          </LoginButtoon>
        </div>
      </div>
    </div>
  );
  // return (
  //   <div className='relative'>
  //     <Button
  //       size={"xl"}
  //       variant={"custom"}
  //     >
  //       <Image
  //         src={"/svgs/dog-breed-svgrepo-com.svg"}
  //         alt='dog'
  //         height={45}
  //         width={45}
  //       />
  //     </Button>
  //   </div>
  // );
}
