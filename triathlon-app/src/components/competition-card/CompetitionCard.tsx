import { Link } from "react-router-dom";
import type { Competition } from "../../_hooks/useCompetitionQuery";
import styles from "./CompetitionCard.module.css";

type CompetitionCardProps = {
  competition: Competition;
};

export const CompetitionCard = ({ competition }: CompetitionCardProps) => {
  return (
    <div className={`card row ${styles.card}`}>
      <div className={styles.cardContent}>
        <div className={styles.title}>{competition.name}</div>
        <div className={`muted ${styles.metadata}`}>
          {new Date(competition.date).toLocaleDateString()} —{" "}
          {competition.location ?? "-"} — {competition.distance_type ?? "-"}
        </div>
      </div>
      <Link
        to={`/competitions/${competition.slug}`}
        className={`btn ${styles.link}`}
      >
        Voir résultats
      </Link>
    </div>
  );
};
