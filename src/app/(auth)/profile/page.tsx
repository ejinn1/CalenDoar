"use client";

import { createClient } from "@/libs/supabase/client";
import { useEffect, useState } from "react";
import { IoEyeOffOutline, IoEyeOutline, IoPersonCircle } from "react-icons/io5";
import ContentsBox from "../_components/contentsBox";

export default function Profile() {
  const [changePassword, setChangePassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [visiblePassword, setVisiblePassword] = useState(false);
  const supabase = createClient();
  const [name, setName] = useState("");

  const handleChangePassword = async () => {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      alert(error.message);
    } else {
      console.log(data);
    }
  };

  useEffect(() => {
    const getUserSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) return;

      setName(session.user.user_metadata.user_name);
    };

    getUserSession();
  }, []);

  return (
    <ContentsBox>
      <h1 className="text-l font-bold">프로필</h1>
      <div className="w-full h-full flex">
        <div className="w-1/2 flex flex-col items-center">
          <IoPersonCircle className="w-[20rem] h-[20rem]" color="#D3D3D3" />
          <div className="text-r font-bold">{name}</div>
        </div>
        <div className="w-1/2 gap-[2rem] flex flex-col">
          <div className="text-l font-semibold">유저 정보</div>
          <div className="relative text-l font-semibold cursor-pointer">
            <div
              onClick={() => setChangePassword((prev) => !prev)}
              className="flex items-center gap-[1rem] hover:opacity-50"
            >
              <div>비밀번호 변경</div>
            </div>
            {changePassword && (
              <div className="absolute -bottom-[6rem] left-0">
                <input
                  type={visiblePassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="새로운 비밀번호 (6자리 이상)"
                  className="relative p-[1.5rem] border-lightgray border-[0.1rem] rounded-md outline-none text-r pr-[5rem]"
                />
                {visiblePassword ? (
                  <IoEyeOffOutline
                    onClick={() => {
                      setVisiblePassword(false);
                    }}
                    className="absolute top-[1.5rem] right-[1rem]"
                    size={20}
                  />
                ) : (
                  <IoEyeOutline
                    onClick={() => setVisiblePassword(true)}
                    className="absolute top-[1.5rem] right-[1rem]"
                    size={20}
                  />
                )}
                {newPassword.length < 6 && newPassword.length > 0 && (
                  <div className="absolute p-2 text-r text-lightred">
                    비밀번호 잘 입력 해봐라
                  </div>
                )}
                {newPassword !== "" && newPassword.length >= 6 && (
                  <div
                    onClick={handleChangePassword}
                    className="absolute p-2 border-lightblue border-[0.1rem] mt-[1rem] rounded-md text-r
                    transition-all duration-300 ease-in-out
                    hover:bg-lightblue hover:text-white"
                  >
                    변경하기
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </ContentsBox>
  );
}
