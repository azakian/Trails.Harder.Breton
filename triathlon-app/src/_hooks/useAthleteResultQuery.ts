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
  athlete: Athlete;
};

export const useAthleteResultQuery = (
  competitionId?: string,
  athleteId?: string
) => {
  return useQuery<Result | null>({
    queryKey: [QUERY_KEYS.COMPETITION_KEY, competitionId, athleteId, "results"],
    queryFn: async () => {
      return {
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
      };
    },
    enabled: !!competitionId && !!athleteId,
  });
};
