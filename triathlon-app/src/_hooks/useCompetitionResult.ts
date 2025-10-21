import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "./queryKeys";

export type Athlete = {
  id: string;
  display_name: string;
  avatar_url?: string | null;
};

export type Result = {
  id: string;
  bib_number: string | null;
  category: string | null;
  position_overall: number | null;
  position_category: number | null;
  swim_seconds: number | null;
  t1_seconds: number | null;
  bike_seconds: number | null;
  t2_seconds: number | null;
  run_seconds: number | null;
  total_seconds: number | null;
  athlete: Athlete | null;
};

export const useCompetitionResults = (competitionId?: string) => {
  return useQuery<Result[]>({
    queryKey: [QUERY_KEYS.COMPETITION_KEY, competitionId, "results"],
    queryFn: async () => {
      return [
        {
          id: "1",
          bib_number: "101",
          category: "M30",
          position_overall: 54,
          position_category: 1,
          swim_seconds: 900,
          t1_seconds: 60,
          bike_seconds: 3600,
          t2_seconds: 45,
          run_seconds: 1800,
          total_seconds: 6405,
          athlete: { id: "a1", display_name: "John Doe" },
        },
        {
          id: "2",
          bib_number: "102",
          category: "M30",
          position_overall: 143,
          position_category: 2,
          swim_seconds: 920,
          t1_seconds: 70,
          bike_seconds: 3700,
          t2_seconds: 50,
          run_seconds: 1850,
          total_seconds: 6690,
          athlete: { id: "a2", display_name: "Jane Smith" },
        },
      ] satisfies Result[];
    },
    enabled: !!competitionId,
  });
};

// const getCompetitionResults = async (competitionId: string) => {
//   const { data, error } = await supabase
//     .from("results")
//     .select(
//       `
//           id, bib_number, category, position_overall, position_category,
//           swim_seconds, t1_seconds, bike_seconds, t2_seconds, run_seconds, total_seconds,
//           athlete:athletes(id, display_name, avatar_url)
//         `
//     )
//     .eq("competition_id", competitionId)
//     .order("position_overall", { ascending: true });
//   if (error) throw error;
//   return data ?? [];
// };
