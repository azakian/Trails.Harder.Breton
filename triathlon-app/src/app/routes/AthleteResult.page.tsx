import { Link, useParams } from "react-router-dom";
import { useAthleteResultQuery } from "../../_hooks/useAthleteResultQuery";
import { useCompetitionBySlug } from "../../_hooks/useCompetitionBySlugQuery";
import { AthleteResultDetail } from "../../components/athlete-result-detail/AthleteResultDetail";

export const AthleteResultPage = () => {
  const { slug, athleteId } = useParams();
  const {
    data: competition,
    isLoading: loadingComp,
    error: errorComp,
  } = useCompetitionBySlug(slug);

  const compId = competition?.id;

  const {
    data: result,
    isLoading: loadingResult,
    error: errorResult,
  } = useAthleteResultQuery(compId, athleteId);

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
          <Link to={`/competitions/${slug}`}>← Retour</Link>
        </p>
      </div>

      {loadingResult && <div>Chargement du résultat...</div>}
      {errorResult && <div>Erreur: {errorResult?.message}</div>}

      {result && <AthleteResultDetail result={result} />}
    </div>
  );
};
