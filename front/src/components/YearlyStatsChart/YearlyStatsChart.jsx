import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const YearlyStatsChart = ({ data }) => {
  const chartRef = useRef();

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["2020", "2021", "2022", "2023", "2024"],
        datasets: [
          {
            label: "note",
            data: data,
            tension: 0.1,
            borderColor: "rgba(131, 54, 155, 0.664)",
            backgroundColor: "rgba(131, 54, 155, 0.212)",
            pointBackgroundColor: "rgb(255, 99, 132)", // Changer la couleur des points
          },
        ],
      },
      options: {
        scales: {
          y: {
            display: false,
            grace: "200%",
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
        elements: {
          point: {
            radius: 5, // Définir la taille des points
            hoverRadius: 10, // Définir la taille des points au survol
            hitRadius: 30, // Définir la zone de détection des points
          },
          line: {
            fill: true,
          },
        },
        layout: {
          padding: {
            left: 0, // Décaler le premier label x vers la droite de 10px
            right: 0, // Décaler le dernier label x vers la gauche de 10px
          },
        },
      },
    });

    return () => {
      chart.destroy();
    };
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default YearlyStatsChart;
