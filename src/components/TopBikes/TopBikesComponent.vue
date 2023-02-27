<script>
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default {
  data() {
    return {
      horsePower: 0,
      torque: 0,
      displacement: 0,
      scrollTop: 0,
      innerWidth: window.innerWidth,
      top1: {
        name: 'RS660',
        horsePower: 100,
        torque: 67,
        displacement: 660,
      },
      top2: {
        name: 'Ninja400',
        horsePower: 45,
        torque: 28,
        displacement: 400,
      },
      top3: {
        name: 'YZF-R6',
        horsePower: 120,
        torque: 62,
        displacement: 600,
      },
      tempSpecs: {
        horsePower: 0,
        torque: 0,
        displacement: 0,
      },
    };
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
          // markers: true,
          pin: true,
          pinSpacing: false,
        });
      });
    },
    cumulateData(name) {
      if (name === 'RS660') {
        setTimeout(() => {
          if (this.tempSpecs.displacement < 660) {
            if (this.tempSpecs.horsePower < 100) {
              this.tempSpecs.horsePower += 1;
            }
            if (this.tempSpecs.torque < 67) {
              this.tempSpecs.torque += 1;
            }
            this.tempSpecs.displacement += 6;
            this.cumulateData(name);
          }
        }, 30);
      }
    },
    getScrollHeight() {
      this.scrollTop = document.documentElement.scrollTop;
    },
  },
  mounted() {
    this.scroller();
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);
    window.addEventListener('scroll', this.getScrollHeight);
  },
  watch: {
    scrollTop(newVal) {
      if (newVal > 2100 && this.innerWidth > 1024) {
        const { name } = this.top1;
        this.tempSpecs = { horsePower: 0, torque: 0, displacement: 0 };
        this.cumulateData(name);
        window.removeEventListener('scroll', this.getScrollHeight);
      }
    },
  },
};
</script>

<template src="./template.html"></template>
