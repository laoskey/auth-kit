import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";
import { FaGithub } from "react-icons/fa";

export function Social() {
  return (
    <div className='flex items-center w-full gap-x-2'>
      <Button
        size={"lg"}
        className='w-full'
        variant={"outline"}
        onClick={() => {}}
      >
        <FcGoogle />
      </Button>
      <Button
        size={"lg"}
        className='w-full'
        variant={"outline"}
        onClick={() => {}}
      >
        <FaGithub />
      </Button>
    </div>
  );
}
