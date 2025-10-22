import { Link, useParams } from "react-router-dom";
import { useCompetitionBySlug } from "../../_hooks/useCompetitionBySlugQuery";
import { useCompetitionResults } from "../../_hooks/useCompetitionResult";
import { useCompetitionVideos } from "../../_hooks/useCompetitionVideo";
import { CompetitionResult } from "../../components/competition-result/CompetitionResult";
import { YouTubeEmbed } from "../../components/Video";

export function CompetitionPage() {
  const { slug } = useParams();

  const {
    data: competition,
    isLoading: loadingComp,
    error: errorComp,
  } = useCompetitionBySlug(slug);

  const compId = competition?.id;

  const {
    data: results,
    isLoading: loadingRes,
    error: errorRes,
  } = useCompetitionResults(compId);

  const { data: video, isLoading: loadingVid } = useCompetitionVideos(compId);

  if (loadingComp) return <div className="container">Chargement...</div>;
  if (errorComp)
    return <div className="container">Erreur: {errorComp?.message}</div>;
  if (!competition)
    return <div className="container">Compétition introuvable</div>;

  return (
    <div className="container">
      <div className="header">
        <h1>{competition.name}</h1>
        <p className="muted">
          {new Date(competition.date).toLocaleDateString()} —{" "}
          {competition.location ?? "-"} — {competition.distance_type ?? "-"}
        </p>
        <p>
          <Link to="/competitions">← Retour</Link>
        </p>
      </div>

      {loadingRes && <div>Chargement des résultats...</div>}
      {errorRes && <div>Erreur: {errorRes?.message}</div>}
      {!loadingRes && compId && (
        <CompetitionResult results={results ?? []} competitionId={compId} />
      )}

      {loadingVid && <div>Chargement de la vidéo...</div>}
      {!!video && (
        <div key={video.id}>
          <YouTubeEmbed url={video.youtube_url} />
        </div>
      )}
    </div>
  );
}
