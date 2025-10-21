import type { Result } from "../../_hooks/useCompetitionResult";
import styles from "./CompetitionResult.module.css";

type CompetitionResultProps = {
  results: Result[];
};

export const CompetitionResult = ({ results }: CompetitionResultProps) => {
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
          <tr key={result.id}>
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
