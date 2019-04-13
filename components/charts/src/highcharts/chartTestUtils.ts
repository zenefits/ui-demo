export const revealTooltipForVisualRegressionTesting = {
  chart: {
    events: {
      load() {
        this.tooltip.refresh(this.series[0].data[0]);
      },
    },
  },
};

export const revealSharedTooltipForVisualRegressionTesting = {
  chart: {
    events: {
      load() {
        const points = this.series.map((series: any) => series.data[0]);
        this.tooltip.refresh(points);
      },
    },
  },
};
