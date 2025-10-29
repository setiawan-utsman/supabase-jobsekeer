import { supabase } from "@/lib/supabaseClient";

export async function createJob(jobData: any) {
  const { data, error } = await supabase
    .from("jobs")
    .insert([jobData])
    .select();
  if (error) throw error;
  return data;
}

// export async function getJobs(search?: string) {
//    let query = supabase.from("jobs").select("*");
//   if (search) {
//     query = query.ilike("title", `%${search}%`); // pencarian case-insensitive
//   }
//   const { data, error } = await query.order("id", { ascending: true });
//   if (error) throw error;
//   return data;
// }

export async function getJobs({
  search = "",
  page = 1,
  limit = 10,
}: {
  search?: string;
  page?: number;
  limit?: number;
}) {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase.from("jobs").select("*", { count: "exact" });

  // Search by title or description
  if (search) {
    query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
  }

  // Pagination
  query = query.range(from, to).order("id", { ascending: false });

  const { data, count, error } = await query;

  if (error) throw error;

  return {
    data,
    count,
    totalPages: Math.ceil((count ?? 0) / limit),
    currentPage: page,
  };
}

export async function getJobById(id: any) {
  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
}

export async function updateJob(id: string, updateData: any) {
  const { data, error } = await supabase
    .from("jobs")
    .update(updateData)
    .eq("id", id)
    .select();
  if (error) throw error;
  return data;
}

export async function deleteJob(id: string) {
  const { error } = await supabase.from("jobs").delete().eq("id", id);
  if (error) throw error;
  return true;
}
