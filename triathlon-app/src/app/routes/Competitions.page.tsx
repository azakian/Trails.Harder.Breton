import { Link } from "react-router-dom";
import { useCompetitions } from "../../_hooks/useCompetitionQuery";

export function CompetitionsPage() {
  const { data: competitions, isLoading, error } = useCompetitions();

  return (
    <div className="container">
      <div className="header">
        <h1>Compétitions</h1>
        <p className="muted">Liste des compétitions publiées</p>
      </div>

      {isLoading && <div>Chargement des compétitions...</div>}
      {error && <div>Erreur: {(error as any).message}</div>}

      <div className="grid">
        {competitions?.map((competition) => (
          <div key={competition.id} className="card row">
            <div>
              <div style={{ fontWeight: 600 }}>{competition.name}</div>
              <div className="muted">
                {new Date(competition.date).toLocaleDateString()} —{" "}
                {competition.location ?? "-"} —{" "}
                {competition.distance_type ?? "-"}
              </div>
            </div>
            <Link to={`/competitions/${competition.slug}`} className="btn">
              Voir résultats
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
