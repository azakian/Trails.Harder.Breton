import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";

export type Video = {
  id: string;
  youtube_url: string;
  title: string | null;
  channel_name: string | null;
};

export const useCompetitionVideos = (competitionId?: string) => {
  return useQuery<Video | null>({
    queryKey: ["competition", competitionId, "videos"],
    queryFn: async () => {
      return {
        id: "1",
        youtube_url: "https://www.youtube.com/watch?v=9rITRXUWmfQ&t=1294s",
        title: "Sample Video",
        channel_name: "Sample Channel",
      };
    },
    enabled: !!competitionId,
  });
};

const getCompetitionVideo = async (competitionId: string) => {
  const { data, error } = await supabase
    .from("videos")
    .select("id, youtube_url, title, channel_name")
    .eq("competition_id", competitionId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
};
