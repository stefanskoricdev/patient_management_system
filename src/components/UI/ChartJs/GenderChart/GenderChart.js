import { Doughnut } from "react-chartjs-2";
import styles from "./GenderChart.module.scss";

const GenderChart = (props) => {
  const { isLoading, maleCount, femaleCount } = props;

  const data = {
    labels: [`Male(${maleCount})`, `Female(${femaleCount})`],
    datasets: [
      {
        data: [maleCount, femaleCount],
        backgroundColor: ["rgba(95, 121, 169, 1)", "rgba(243, 243, 243, 1)"],
        borderColor: ["rgba(243, 243, 243, 1)", "rgba(95, 121, 169, 1)"],
        borderWidth: 1,
        spacing: 2,
      },
    ],
  };
  return (
    <section className={styles.DoughnutWrapper}>
      <h1>Patient Visit By Gender</h1>
      <div>
        <Doughnut
          options={isLoading ? { animation: false } : null}
          data={data}
        />
      </div>
    </section>
  );
};

export default GenderChart;
