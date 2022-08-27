import grapesjs from "grapesjs";
import loadComponents from "./components";

export default grapesjs.plugins.add("charts", (editor, opts = {}) => {
  let default_blocks = {
    lineChart: true,
  };
  let default_labels = {
    lineChart: "Line Chart",
  };
  let default_types = {
    lineChart: "lineChart",
  };

  let options = {
    ...{
      blocks: default_blocks,
      labels: default_labels,
      types: default_types,
      labelChartCategory: "Charts",
    },
    ...opts,
  };
  loadComponents(editor, options);
});
