import type { Result } from "../../_hooks/useAthleteResultQuery";
import { formatTime } from "../../utils/time";
import styles from "./AthleteResultDetail.module.css";

type AthleteResultDetailProps = {
  result: Result;
};

export const AthleteResultDetail = ({ result }: AthleteResultDetailProps) => {
  return (
    <div className={styles.container}>
      <div className={`card ${styles.infoCard}`}>
        <h2 className={styles.athleteName}>{result.athlete.display_name}</h2>
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <span className="muted">Dossard:</span>{" "}
            <strong>{result.bib_number ?? "-"}</strong>
          </div>
          <div className={styles.infoItem}>
            <span className="muted">Catégorie:</span>{" "}
            <strong>{result.category ?? "-"}</strong>
          </div>
          <div className={styles.infoItem}>
            <span className="muted">Position Trails Harder:</span>{" "}
            <strong>{result.position_category ?? "-"}</strong>
          </div>
          <div className={styles.infoItem}>
            <span className="muted">Position Globale:</span>{" "}
            <strong>{result.position_overall ?? "-"}</strong>
          </div>
        </div>
      </div>

      <div className={`card ${styles.timesCard}`}>
        <h3 className={styles.timesTitle}>Temps de course</h3>
        <div className={styles.timesGrid}>
          <div className={styles.timeRow}>
            <span className={styles.discipline}>🏊 Natation</span>
            <strong>{formatTime(result.swim_seconds)}</strong>
          </div>
          <div className={`${styles.timeRow} ${styles.transition}`}>
            <span className="muted">T1</span>
            <span>{formatTime(result.t1_seconds)}</span>
          </div>
          <div className={styles.timeRow}>
            <span className={styles.discipline}>🚴 Vélo</span>
            <strong>{formatTime(result.bike_seconds)}</strong>
          </div>
          <div className={`${styles.timeRow} ${styles.transition}`}>
            <span className="muted">T2</span>
            <span>{formatTime(result.t2_seconds)}</span>
          </div>
          <div className={styles.timeRow}>
            <span className={styles.discipline}>🏃 Course à pied</span>
            <strong>{formatTime(result.run_seconds)}</strong>
          </div>
          <div className={styles.totalRow}>
            <span>
              <strong>Temps Total</strong>
            </span>
            <strong className={styles.totalTime}>
              {formatTime(result.total_seconds)}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
};
