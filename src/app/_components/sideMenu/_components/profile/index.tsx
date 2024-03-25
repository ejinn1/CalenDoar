"use client";

import { createClient } from "@/libs/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoPersonCircle } from "react-icons/io5";
import tw from "tailwind-styled-components";

const ProfileButton = tw.div`
  group
  text-m font-semibold flex items-center cursor-pointer
`;

const LogoutButton = tw.div`
  flex items-center gap-2
  w-full rounded-lg text-r text-gray text-gray font-semibold cursor-pointer
  transition-text duration-300 ease-in-out
  hover:text-lightgray
`;

export default function Profile() {
  const supabase = createClient();
  const router = useRouter();
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    router.replace("/login");
    console.log(error);
  };

  useEffect(() => {
    const getUserSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) return;

      setIsLoading(false);
      setName(session.user.user_metadata.user_name);
    };

    getUserSession();
  }, []);

  return (
    <div className="flex flex-col rounded-lg bg-white p-[1rem] w-[20rem]">
      <div className="flex gap-[1rem]">
        <IoPersonCircle className="w-[8rem] h-[8rem]" color="#D3D3D3" />
        <div className="flex flex-col justify-around">
          <Link href={"/profile"}>
            <ProfileButton>
              {isLoading ? "홍길동" : name} {"님"}
              <IoIosArrowForward
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
                size={16}
              />
            </ProfileButton>
          </Link>
          <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
        </div>
      </div>
    </div>
  );
}
