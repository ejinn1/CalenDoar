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
  text-s w-full rounded-lg text-gray font-semibold cursor-pointer
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
    const getUserInfo = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      setIsLoading(false);
      setName(user.user_metadata.user_name);
    };

    getUserInfo();
  }, []);

  return (
    <div className="flex flex-col rounded-lg bg-white px-[1rem] w-full py-[1.5rem] dark:bg-darkgray">
      <div className="flex gap-[2rem]">
        <IoPersonCircle className="w-[4rem] h-[4rem]" color="#D3D3D3" />
        <div className="flex flex-col justify-around">
          <Link href={"/profile"}>
            <ProfileButton>
              {isLoading ? "홍길동" : name} {"님"}
              <IoIosArrowForward
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
                size={12}
              />
            </ProfileButton>
          </Link>
          <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
        </div>
      </div>
    </div>
  );
}
