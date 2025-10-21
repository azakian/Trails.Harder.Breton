import { Link, useParams } from "react-router-dom";
import { useCompetitionBySlug } from "../../_hooks/useCompetitionBySlugQuery";
import { useCompetitionResults } from "../../_hooks/useCompetitionResult";
import { useCompetitionVideos } from "../../_hooks/useCompetitionVideo";
import { YouTubeEmbed } from "../../components/Video";
import { formatSeconds } from "../../utils/time";

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

  const {
    data: video,
    isLoading: loadingVid,
    error: errorVid,
  } = useCompetitionVideos(compId);

  if (loadingComp) return <div className="container">Chargement...</div>;
  if (errorComp)
    return (
      <div className="container">Erreur: {(errorComp as any).message}</div>
    );
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

      <section className="card">
        <h2>Résultats</h2>
        {loadingRes && <div>Chargement des résultats...</div>}
        {errorRes && <div>Erreur: {(errorRes as any).message}</div>}
        {!loadingRes && (
          <table className="table">
            <thead>
              <tr>
                <th>Pos</th>
                <th>Athlète</th>
                <th>Total</th>
                <th>Nat</th>
                <th>T1</th>
                <th>Vélo</th>
                <th>T2</th>
                <th>Course</th>
              </tr>
            </thead>
            <tbody>
              {results?.map((r) => (
                <tr key={r.id}>
                  <td>{r.position_overall ?? "-"}</td>
                  <td>{r.athlete?.display_name ?? "-"}</td>
                  <td>{formatSeconds(r.total_seconds)}</td>
                  <td>{formatSeconds(r.swim_seconds)}</td>
                  <td>{formatSeconds(r.t1_seconds)}</td>
                  <td>{formatSeconds(r.bike_seconds)}</td>
                  <td>{formatSeconds(r.t2_seconds)}</td>
                  <td>{formatSeconds(r.run_seconds)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {!!video && (
        <section className="card" style={{ marginTop: 16 }}>
          <h2>Vlogs YouTube</h2>
          {loadingVid && <div>Chargement des vidéos...</div>}
          {errorVid && <div>Erreur: {(errorVid as any).message}</div>}
          <div
            className="grid"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            }}
          >
            {
              <div key={video.id}>
                <YouTubeEmbed url={video.youtube_url} />
                <div style={{ marginTop: 6 }}>
                  {video.title ?? video.youtube_url}
                </div>
                {video.channel_name && (
                  <div className="muted" style={{ fontSize: 12 }}>
                    {video.channel_name}
                  </div>
                )}
              </div>
            }
          </div>
        </section>
      )}
    </div>
  );
}
