import { useCompetitions } from "../../_hooks/useCompetitionQuery";
import { CompetitionCard } from "../../components/competition-card/CompetitionCard";

export function CompetitionsPage() {
  const { data: competitions, isLoading, error } = useCompetitions();

  return (
    <div className="container">
      <div className="header">
        <h1>Compétitions</h1>
        <p className="muted">Liste des compétitions publiées</p>
      </div>

      {isLoading && <div>Chargement des compétitions...</div>}
      {error && <div>Erreur: {error?.message}</div>}

      <div className="grid">
        {competitions?.map((competition) => (
          <CompetitionCard key={competition.id} competition={competition} />
        ))}
      </div>
    </div>
  );
}
