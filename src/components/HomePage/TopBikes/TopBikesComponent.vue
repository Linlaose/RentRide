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
          pin: true,
          pinSpacing: false,
        });
      });
    },
  },
  mounted() {
    this.scroller();
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);
    window.addEventListener('scroll', this.getScrollHeight);
  },
};
</script>

<template src="./template.html"></template>
