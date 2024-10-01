import { requestAcces } from "@/lib/email";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [displaySuccessMessage, setDisplaySuccessMessage] = useState(false);
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  const requestInputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await requestAcces({ from: email });
    if (result === "Success") {
      setDisplaySuccessMessage(true);
      setEmail("");
      setRequestSubmitted(true);
      // Empty the input
      if (requestInputRef.current) {
        requestInputRef.current.value = "";
      }

      setTimeout(() => {
        setDisplaySuccessMessage(false);
      }, 3000);
    } else {
      console.error("An error occured");
    }
  };

  return (
    <div className="w-full h-dvh flex flex-col items-center justify-center gap-4 relative">
      {/* MADE BY COLIN */}
      <motion.p
        className="absolute bottom-5 text-sm"
        initial={{ opacity: 0, filter: "blur(5px)" }}
        animate={{
          opacity: 1,
          filter: "blur(0px)",
          transition: { duration: 1.2, ease: "easeOut", delay: 0.7 },
        }}
      >
        Made by{" "}
        <a
          className="font-semibold underline decoration-thickness-[2px]"
          href="https://www.x.com/colindmg"
          target="_blank"
        >
          @colindmg
        </a>
      </motion.p>

      {/* SUCCESS MESSAGE */}
      <AnimatePresence>
        {displaySuccessMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, filter: "blur(5px)" }}
            animate={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 1.2, ease: "easeInOut" },
            }}
            exit={{
              opacity: 0,
              y: -20,
              filter: "blur(5px)",
              transition: { duration: 1.2, ease: "easeInOut" },
            }}
            className="absolute top-5 flex items-center justify-center text-center max-w-[80%] p-4 rounded-md bg-[#F1F1F1] z-50"
          >
            <p className="text-[#9C9A9A] text-sm">
              Request sent successfully. You will be notified by e-mail when you
              have access to the app.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TITLE */}
      <motion.h1
        initial={{ opacity: 0, filter: "blur(5px)" }}
        animate={{
          opacity: 1,
          filter: "blur(0px)",
          transition: { duration: 1.2, ease: "easeOut" },
        }}
        className="text-3xl"
      >
        <span className="font-extrabold">Re</span>cords.
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, filter: "blur(5px)" }}
        animate={{
          opacity: 1,
          filter: "blur(0px)",
          transition: { duration: 1.2, ease: "easeOut", delay: 0.1 },
        }}
        className="text-[#9C9A9A] animate-pulse"
      >
        Visualize & share your monthly top tracks.
      </motion.p>

      {/* ACCESS REQUEST & LOGIN */}
      <div className="flex flex-col">
        <motion.p
          initial={{ opacity: 0, filter: "blur(5px)" }}
          animate={{
            opacity: 1,
            filter: "blur(0px)",
            transition: { duration: 1.2, ease: "easeOut", delay: 0.2 },
          }}
          className="text-[#9C9A9A]/50 text-[10px] mb-1"
        >
          FIRST
        </motion.p>

        {/* EMAIL FORM */}
        <form onSubmit={handleSubmit} className="flex flex-col">
          <motion.input
            ref={requestInputRef}
            initial={{ opacity: 0, filter: "blur(5px)" }}
            animate={{
              opacity: 1,
              filter: "blur(0px)",
              transition: { duration: 1.2, ease: "easeOut", delay: 0.3 },
            }}
            type="email"
            placeholder="Spotify Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full py-3 px-4 text-sm border border-[#9C9A9A]/20 outline-none focus:outline-none border-1 bg-transparent rounded-md font-medium mb-1 placeholder:text-[#9C9A9A]/50 "
            // DISABLED CLASS
            // disabled
            // className="w-full py-3 px-4 text-sm border border-[#9C9A9A]/20 outline-none focus:outline-none border-1 rounded-md font-medium mb-1 placeholder:text-[#9C9A9A]/50 bg-neutral-400/10 cursor-not-allowed"
          />

          <motion.button
            initial={{ opacity: 0, filter: "blur(5px)" }}
            disabled={requestSubmitted}
            // disable
            animate={{
              opacity: 1,
              filter: "blur(0px)",
              transition: { duration: 1.2, ease: "easeOut", delay: 0.4 },
            }}
            type="submit"
            className="flex items-center justify-center gap-1 py-3 px-4 text-sm bg-[#F1F1F1] rounded-md font-medium mt-1 shadow-sm hover:shadow-md transition-shadow duration-500 ease-in-out relative before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white/.5)_50%,transparent_75%,transparent_100%)] dark:before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:[transition:background-position_0s_ease] hover:before:bg-[position:-100%_0,0_0] hover:before:duration-[1500ms]"
            style={{ cursor: requestSubmitted ? "not-allowed" : "pointer" }}
          >
            Request<span className="font-semibold">Access</span>
            {/* No access left, sorry */}
          </motion.button>
        </form>

        <motion.p
          initial={{ opacity: 0, filter: "blur(5px)" }}
          animate={{
            opacity: 1,
            filter: "blur(0px)",
            transition: { duration: 1.2, ease: "easeOut", delay: 0.5 },
          }}
          className="text-[#9C9A9A]/50 text-[10px] mt-4 mb-1"
        >
          ...THEN
        </motion.p>
        <motion.div
          initial={{ opacity: 0, filter: "blur(5px)" }}
          animate={{
            opacity: 1,
            filter: "blur(0px)",
            transition: { duration: 1.2, ease: "easeOut", delay: 0.6 },
          }}
        >
          <Link
            href="/api/login"
            className="flex items-center gap-2 py-3 px-4 text-sm bg-[#F1F1F1] rounded-md font-medium shadow-sm hover:shadow-md transition-shadow duration-500 ease-in-out relative before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white/.5)_50%,transparent_75%,transparent_100%)] dark:before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:[transition:background-position_0s_ease] hover:before:bg-[position:-100%_0,0_0] hover:before:duration-[1500ms]"
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
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
