import LineChart, { LineChartBlock } from "./components/LineChart";
export default (editor, opts = {}) => {
  const dc = editor.DomComponents;
  const bm = editor.BlockManager;
  const { blocks, labels, types, labelChartCategory } = opts;

  if (blocks.lineChart) {
    LineChartBlock(bm, labelChartCategory, labels.lineChart, types.lineChart);
    LineChart(dc, labels.lineChart, types.lineChart, opts);
  }
};
