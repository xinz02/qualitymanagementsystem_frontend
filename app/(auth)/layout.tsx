import Image from "next/image";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="card rounded-none lg:card-side bg-base-100 shadow-md mx-20 my-10 lg:h-[550px]">
        <figure className="lg:w-1/2 h-full flex items-center justify-center">
          <Image
            src="/loginPic.jpg"
            width={550}
            height={550}
            alt="FC picture"
            className="object-contain w-full h-full"
          />
        </figure>
        <div className="card-body lg:w-1/2 h-full flex flex-col justify-center content-evenly">
          {children}
        </div>
      </div>
    );
  }