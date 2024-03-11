import { createClient } from "@/utils/supabase/server";

export default async function Notes() {
  const supabase = createClient();
  const { data: test } = await supabase.from("test").select();

  return <pre>{JSON.stringify(test, null, 2)}</pre>;
}
