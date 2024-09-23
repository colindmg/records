import Image from "next/image";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl">
        <span className="font-extrabold">Re</span>cords.
      </h1>
      <p className="text-[#9C9A9A] animate-pulse">
        Visualize & share your monthly top tracks.
      </p>
      <Link
        href="/api/login"
        className="flex items-center gap-2 py-3 px-4 text-sm bg-[#F1F1F1] rounded-md font-medium mt-1 shadow-sm hover:shadow-md transition-shadow duration-500 ease-in-out relative before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white/.5)_50%,transparent_75%,transparent_100%)] dark:before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:[transition:background-position_0s_ease] hover:before:bg-[position:-100%_0,0_0] hover:before:duration-[1500ms]"
      >
        <Image
          src={"/img/spotify-solid.svg"}
          width={20}
          height={20}
          alt="Spotify logo"
          className="w-5 h-5"
        />
        <p>
          Login with <span className="font-semibold">Spotify</span>
        </p>
      </Link>
    </div>
  );
};

export default LoginPage;
