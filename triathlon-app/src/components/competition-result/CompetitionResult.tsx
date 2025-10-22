import { useNavigate } from "react-router-dom";
import type { Result } from "../../_hooks/useCompetitionResult";
import styles from "./CompetitionResult.module.css";

type CompetitionResultProps = {
  results: Result[];
  competitionId: string;
};

export const CompetitionResult = ({
  results,
  competitionId,
}: CompetitionResultProps) => {
  const navigate = useNavigate();

  const handleRowClick = (athleteId: string) => {
    navigate(`/competitions/${competitionId}/${athleteId}`);
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th scope="col">Pos Trails harder</th>
          <th scope="col">Athlète</th>
          <th scope="col">Pos Globale</th>
        </tr>
      </thead>
      <tbody>
        {results?.map((result) => (
          <tr
            key={result.id}
            onClick={() =>
              result.athlete?.id && handleRowClick(result.athlete.id)
            }
            className={result.athlete?.id ? styles.clickable : ""}
          >
            <td data-label="Pos Trails harder">
              {result.position_category ?? "-"}
            </td>
            <td data-label="Athlète">{result.athlete?.display_name ?? "-"}</td>
            <td data-label="Pos Globale">{result.position_overall ?? "-"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
