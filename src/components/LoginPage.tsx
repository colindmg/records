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
        className="flex items-center gap-3 py-3 px-4 text-sm bg-[#F1F1F1] rounded-md font-medium mt-1"
      >
        <Image
          src={"/img/spotify-solid.svg"}
          width={20}
          height={20}
          alt="Spotify logo"
        />
        <p>
          Login with <span className="font-semibold">Spotify</span>
        </p>
      </Link>
    </div>
  );
};

export default LoginPage;
