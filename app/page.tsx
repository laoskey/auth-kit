import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className='relative'>
      <Button
        size={"xl"}
        variant={"custom"}
      >
        <Image
          src={"/svgs/dog-breed-svgrepo-com.svg"}
          alt='dog'
          height={45}
          width={45}
        />
      </Button>
    </div>
  );
}
