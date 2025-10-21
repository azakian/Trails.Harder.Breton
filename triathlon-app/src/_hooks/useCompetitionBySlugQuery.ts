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

export const useCompetitionBySlug = (slug?: string) => {
  return useQuery<Competition | null>({
    queryKey: [QUERY_KEYS.COMPETITION_KEY, slug],
    queryFn: async () => {
      return {
        id: "1",
        name: "La baule Audencia",
        date: new Date().toISOString(),
        slug: "la-baule-audencia",
        location: "La Baule",
        distance_type: "Triathlon",
      };
    },
  });
};

// const getCompetitionBySlug = async (slug: string) => {
//   const { data, error } = await supabase
//     .from("competitions")
//     .select("*")
//     .eq("slug", slug)
//     .eq("is_published", true)
//     .single();
//   if (error) throw error;
//   return data;
// };
