import{N as c,B as b}from"./BannerComponent-a14748d3.js";import{o as e,c as s,d as o,b as p,t as a,F as r,f as i,y as N,z as x,_ as d,r as l,a as m}from"./index-93539cb4.js";import"./page-title-bg-196c08fc.js";const A={class:"container my-10 lg:mb-20 lg:mt-0"},B={class:"font-sans-tc block text-sm text-[#808080] lg:mt-6"},k={class:"inline-block"},y={class:"mt-6 text-2xl"},V=["src"],w={class:"font-sans-tc mt-4 text-justify text-base lg:mt-8"},C=["src"];function S(t,_,u,g,h,f){return e(),s("section",A,[o("span",B,[p(a(t.article.created_at)+" ",1),(e(!0),s(r,null,i(t.article.tags,n=>(e(),s("span",k,"["+a(n)+"]",1))),256))]),o("p",y,a(t.article.description),1),o("img",{class:"mt-4 lg:mt-8",src:t.article.imgUrl,alt:""},null,8,V),o("p",w,a(t.article.content),1),(e(!0),s(r,null,i(t.article.images,n=>(e(),s("img",{class:"mt-4 lg:mt-8",src:n,alt:""},null,8,C))),256))])}const F={computed:{...N(c,["article"])},methods:{...x(c,["getArticle"])},mounted(){this.getArticle(this.$route.params.id)}},j=d(F,[["render",S]]);function v(t,_,u,g,h,f){const n=l("banner-component"),$=l("article-component");return e(),s(r,null,[m(n),p(),m($)],64)}const z={components:{BannerComponent:b,ArticleComponent:j},data(){return{route:this.$route.params.id}}},T=d(z,[["render",v]]);export{T as default};
