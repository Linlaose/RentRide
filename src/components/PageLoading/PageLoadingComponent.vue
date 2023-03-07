<script>
export default {
  data() {
    return {
      loadTime: 0,
      interval: null,
      loadingPercent: 0,
    };
  },
  methods: {
    getLoadingTime() {
      // const { timing } = window.performance;
      // const estimatedTime = Math.abs(
      //   timing.loadEventEnd - timing.navigationStart
      // );
      // this.loadTime = (parseInt(estimatedTime / 1000, 10) % 60) * 100;
      // window.performance.timing 已經要被淘汰，所以用 PerformanceNavigationTiming

      const { loadEventEnd } = performance.getEntriesByType('navigation')[0];
      const estimatedTime = Number(loadEventEnd.toFixed());

      this.loadTime = (estimatedTime % 60) * 100;
      this.doProgress();
    },
    doProgress() {
      const step = this.loadTime / 100;
      this.interval = setInterval(() => {
        this.loadingPercent += 2;
      }, step);
    },
  },
  mounted() {
    this.getLoadingTime();
  },
  watch: {
    loadingPercent(newVal) {
      if (newVal >= 100) {
        clearInterval(this.interval);
      }
    },
  },
};
</script>

<template src="./template.html"></template>
