import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "./queryKeys";

export type Competition = {
  id: string;
  name: string;
  slug: string;
  date: string;
  location: string | null;
  distance_type: string | null;
};

export const useCompetitions = () => {
  return useQuery<Competition[]>({
    queryKey: [QUERY_KEYS.COMPETITION_KEY],
    queryFn: async () => {
      return [
        {
          id: "1",
          name: "La baule Audencia",
          date: new Date().toISOString(),
          slug: "la-baule-audencia",
          location: "La Baule",
          distance_type: "Triathlon",
        },
      ] satisfies Competition[];
    },
  });
};

// const getCompetition = async () => {
//   const { data, error } = await supabase
//     .from("competitions")
//     .select("id, name, slug, date, location, distance_type")
//     .eq("is_published", true)
//     .order("date", { ascending: false });
//   if (error) throw error;
//   return data ?? [];
// };
