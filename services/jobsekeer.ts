import { supabase } from "@/lib/supabaseClient";

const TABLE_NAME = "jobseekers";

export const createJobseeker = async (data:any) => {
  const { error } = await supabase.from(TABLE_NAME).insert([data]);
  if (error) throw error;
  return true;
};

// export const getJobseekers = async (jobId?: any) => {
//   let query = supabase.from(TABLE_NAME).select("*");
//   if (jobId) query = query.eq("job_id", jobId);
//   const { data, error } = await query;
//   if (error) throw error;
//   return data;
// };

export const getJobseekers = async ({
  jobId,
  search,
  page = 1,
  limit = 10,
}: {
  jobId?: any;
  search?: string;
  page?: number;
  limit?: number;
}) => {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase.from(TABLE_NAME).select("*", { count: "exact" }).range(from, to);

  // filter berdasarkan jobId
  if (jobId) {
    query = query.eq("job_id", jobId);
  }

  // filter search (opsional)
  if (search && search.trim() !== "") {
    query = query.or(`full_name.ilike.%${search}%,email.ilike.%${search}%`);
  }

  const { data, error, count } = await query;

  if (error) throw error;

  return {
    data,
    count,
    totalPages: Math.ceil((count ?? 0) / limit),
    currentPage: page,
  };
};

export const getJobseekerById = async (id: string) => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
};

export const updateJobseeker = async (id: string, updates: any) => {
  const { error } = await supabase
    .from(TABLE_NAME)
    .update(updates)
    .eq("id", id);
  if (error) throw error;
  return true;
};

export const deleteJobseeker = async (id: string) => {
  const { error } = await supabase.from(TABLE_NAME).delete().eq("id", id);
  if (error) throw error;
  return true;
};
