"use client";

import { createClient } from "@/libs/supabase/client";
import useUserInfoStore from "@/store/user/info";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    router.replace("/login");
    console.log(error);
  };

  const { user } = useUserInfoStore();

  return (
    <div className="flex flex-col rounded-lg bg-white p-[1rem] w-[20rem]">
      <div className="flex gap-[1rem]">
        <IoPersonCircle className="w-[10rem] h-[10rem]" color="#D3D3D3" />
        <div className="flex flex-col justify-around">
          <Link href={"/profile"}>
            <ProfileButton>
              {user?.user_metadata.user_name} {"님"}
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
