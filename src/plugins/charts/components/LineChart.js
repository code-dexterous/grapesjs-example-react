const Chart = require("chart.js");
export const LineChartBlock = (bm, category, label, type) => {
  bm.add(type, {
    label,
    category,
    content: `<canvas id="lineChart" data-gjs-type="lineChart"></canvas>`,
  });
};
export default (dc, label, type, config) => {
  const defaultType = dc.getType("default");
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;
  dc.addType(type, {
    model: {
      defaults: {
        script: function () {
          const initLib = function () {
            const labels = [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
            ];
            const data = {
              labels: labels,
              datasets: [
                {
                  label: "My First dataset",
                  backgroundColor: "rgb(255, 99, 132)",
                  borderColor: "rgb(255, 99, 132)",
                  data: [0, 10, 5, 2, 20, 30, 45],
                },
              ],
            };

            const config = {
              type: "line",
              data: data,
              options: {},
            };

            const ctx = document.getElementById("lineChart").getContext("2d");
            const myChart = new Chart(ctx, config);
          };
          if (typeof Chart == "undefined") {
            const script = document.createElement("script");
            script.onload = initLib;
            script.src = "https://cdn.jsdelivr.net/npm/chart.js";
            document.body.appendChild(script);
          } else {
            console.log("InitLib");
            initLib();
          }
        },
      },
    },
    isComponent: (el) => {
      if (el.getAttribute && el.getAttribute("data-gjs-type") == type) {
        return { type };
      }
    },
    view: defaultView.extend({
      init({ model }) {},
    }),
  });
};
