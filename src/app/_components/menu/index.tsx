import { createClient } from "@/libs/supabase/client";

export default function Menu() {
  const supabase = createClient();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log(error);
    }
  };

  return (
    <div className="absolute top-[4rem] right-0 w-[10rem] h-max p-[1rem] rounded-lg bg-white dark:bg-darkgray shadow-md">
      <ul>
        <li>옵션 추가</li>
        <li>옵션 수정</li>
        <li onClick={handleLogout}>로그아웃</li>
      </ul>
    </div>
  );
}
