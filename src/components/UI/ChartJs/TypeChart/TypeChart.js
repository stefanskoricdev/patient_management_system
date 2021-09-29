import styles from "./TypeChart.module.scss";
import { Bar } from "react-chartjs-2";

const TypeChart = ({ individual, group }) => {
  const individualsCount = individual.length;
  const groupsCount = group.length;
  const data = {
    labels: ["Individual", "Groups"],
    datasets: [
      {
        label: "",
        data: [individualsCount, groupsCount],
        backgroundColor: ["rgba(95, 121, 169, 1)", "rgba(101, 195, 157, 1)"],
        borderWidth: 1,
        borderRadius: 10,
        categoryPercentage: 1,
        barPercentage: 0.5,
      },
    ],
  };
  const options = {
    scales: {
      x: {
        ticks: {
          color: "rgb(243, 243, 243)",
        },
      },
      y: {
        ticks: {
          color: "rgb(243, 243, 243)",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  return (
    <div className={styles.TypeChartWrapper}>
      <h1>Patients Visit By Type</h1>
      <main>
        <Bar data={data} options={options} />
      </main>
    </div>
  );
};

export default TypeChart;
