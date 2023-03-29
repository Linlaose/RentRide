<script>
import { RouterLink } from 'vue-router';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default {
  components: {
    RouterLink,
  },
  data() {
    return {
      VITE_URL: import.meta.env.VITE_URL,
      preTop1: {},
      preTop2: {},
      preTop3: {},
    };
  },
  computed: {
    /* 
    避免 `Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead.` 警告
    所以 computed 產出畫面需要的渲染資料
    */
    top1() {
      return { ...this.preTop1 };
    },
    top2() {
      return { ...this.preTop2 };
    },
    top3() {
      return { ...this.preTop3 };
    },
  },
  methods: {
    scroller() {
      const {
        top2,
        top3,
        top1Intro,
        top2Intro,
        top3Intro,
        top1Brand,
        top2Brand,
        top3Brand,
        top1Specs,
        top2Specs,
        top3Specs,
        box,
      } = this.$refs;

      const mm = gsap.matchMedia();
      const tl = gsap.timeline();

      mm.add('(min-width: 1024px)', () => {
        tl.from(top1Intro, {
          opacity: 0,
          duration: 10,
        })
          .from(top1Brand, {
            opacity: 0,
            duration: 10,
          })
          .fromTo(
            top1Specs,
            {
              xPercent: -30,
              opacity: 0,
            },
            {
              xPercent: 0,
              opacity: 1,
              duration: 20,
            }
          )
          .fromTo(
            top2,
            {
              yPercent: -100,
              xPercent: 100,
            },
            {
              yPercent: -100,
              xPercent: 0,
              duration: 10,
            }
          )
          .from(top2Intro, {
            opacity: 0,
            duration: 10,
          })
          .from(top2Brand, {
            opacity: 0,
            duration: 10,
          })
          .fromTo(
            top2Specs,
            {
              xPercent: -30,
              opacity: 0,
            },
            {
              xPercent: 0,
              opacity: 1,
              duration: 20,
            }
          )
          .fromTo(
            top3,
            {
              yPercent: -200,
              xPercent: -100,
            },
            {
              yPercent: -200,
              xPercent: 0,
              duration: 10,
            }
          )
          .from(top3Intro, {
            opacity: 0,
            duration: 10,
          })
          .from(top3Brand, {
            opacity: 0,
            duration: 10,
          })
          .fromTo(
            top3Specs,
            {
              xPercent: 30,
              opacity: 0,
            },
            {
              xPercent: 0,
              opacity: 1,
              duration: 20,
            }
          );

        ScrollTrigger.create({
          animation: tl,
          trigger: box,
          start: 'top top',
          end: 'bottom 100%',
          scrub: 3,
          pin: true,
          pinSpacing: false,
        });
      });
    },
    getTopBikes() {
      const VITE_PATH = 'topBikes';
      const url = `${this.VITE_URL}/${VITE_PATH}`;

      this.$http
        .get(url)
        .then((res) => {
          const { data } = res;
          const [top1, top2, top3] = data;

          this.callAll(top1.motorcycleId, top2.motorcycleId, top3.motorcycleId);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    callAll(top1Id, top2Id, top3Id) {
      const VITE_PATH = 'motorcycles';

      const getTop1 = this.$http.get(`${this.VITE_URL}/${VITE_PATH}/${top1Id}`);
      const getTop2 = this.$http.get(`${this.VITE_URL}/${VITE_PATH}/${top2Id}`);
      const getTop3 = this.$http.get(`${this.VITE_URL}/${VITE_PATH}/${top3Id}`);

      Promise.all([getTop1, getTop2, getTop3])
        .then((res) => {
          // 取得三個回傳值的 data 屬性當作陣列
          const data = res.map((item) => item.data);
          // 將 data 的 item 解構賦值為新的物件變數
          const [top1Data, top2Data, top3Data] = data;

          /* 
          把變數的特定屬性存入已定義的空物件中，這些物件不能直接作為渲染，
          畫面會顯示不出資料，且有可能不跳錯誤，
          唯一一次看到警告的訊息是，
          `Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead.`
          */
          this.preTop1 = {
            motorcycleId: top1Data.id,
            model: top1Data.model,
            horsepower: Number(
              Number(top1Data.horsepower.split('p')[0]).toFixed()
            ),
            torque:
              Number(Number(top1Data.torque.split('k')[0]).toFixed(1)) * 10,
            displacement: Number(top1Data.displacement),
          };
          this.preTop2 = {
            motorcycleId: top2Data.id,
            model: top2Data.model,
            horsepower: Number(
              Number(top2Data.horsepower.split('p')[0]).toFixed()
            ),
            torque:
              Number(Number(top2Data.torque.split('k')[0]).toFixed(1)) * 10,
            displacement: Number(top2Data.displacement),
          };
          this.preTop3 = {
            motorcycleId: top3Data.id,
            model: top3Data.model,
            horsepower: Number(
              Number(top3Data.horsepower.split('p')[0]).toFixed()
            ),
            torque:
              Number(Number(top3Data.torque.split('k')[0]).toFixed(1)) * 10,
            displacement: Number(top3Data.displacement),
          };
        })
        .catch((err) => {
          alert(err);
        });
    },
  },
  mounted() {
    this.scroller();
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1500);
    window.addEventListener('scroll', this.getScrollHeight);
    this.getTopBikes();
  },
};
</script>

<template src="./template.html"></template>
