import{_}from"./page-title-bg-196c08fc.js";import{r as h,o as i,c,d as a,a as p,w as u,b as k,_ as g,z as f,A as l}from"./index-8278f97b.js";const x={class:"relative"},m=a("img",{src:_},null,-1),B={class:"position-center container absolute"},T={class:"flex items-center gap-3 text-base lg:text-xl"},$={class:"flex items-center gap-3"},V=a("i",{class:"fa-solid fa-circle text-6px text-orange-pink"},null,-1),b={class:"text-orange-pink"},E={key:0},w={key:1},D={key:0,class:"hidden text-orange-pink lg:mt-8 lg:block lg:text-66px"},I={key:1,class:"hidden text-orange-pink lg:mt-8 lg:block lg:text-66px"};function R(t,n,e,s,r,o){const d=h("router-link");return i(),c("section",x,[m,a("nav",B,[a("ol",T,[a("li",null,[p(d,{to:"/"},{default:u(()=>[k("首頁")]),_:1})]),a("li",$,[V,a("div",b,[t.$route.params.id?(i(),c("p",E,"確認訂單 [租車]")):(i(),c("p",w,"我要租車"))])])]),t.$route.params.id?(i(),c("h2",D," 確認訂單 [租車] ")):(i(),c("h2",I," 我要租車 "))])])}const A={},y=g(A,[["render",R]]),C=f("rentStore",{state:()=>({VITE_URL:"https://rent-ride-server-linlaose.vercel.app",VITE_PATH:"motorcycles",originalBikes:[],bikes:[],tempBike:{},orderBike:{},options:{grade:"",displacement:"",date:"",type:"",make:""},rentDate:null,returnDate:null}),getters:{getOption:({options:t})=>t,searchBikes({originalBikes:t,options:n}){return t.filter(e=>Object.entries(n).every(([s,r])=>{if(s==="date"&&r!=="")return e.rent_date!==null&&e.return_date!==null?e.rent_date>r[1]||e.return_date<r[0]:e.rent_date===null&&e.return_date===null;if(s==="displacement"&&r!==""){const o=JSON.parse(r);return o.length<=1?e[s]>=o[0]&&e[s]!==o[1]:e[s]<=o[o.length-1]&&e[s]>=o[0]}return r===""||e[s]===r}))},hotBikes({bikes:t}){return t.sort((n,e)=>n.rank&&e.rank?n.rank-e.rank:n.rank?-1:e.rank?1:0)}},actions:{getBikes(){const t=`${this.VITE_URL}/${this.VITE_PATH}`;l.get(t).then(n=>{const{data:e}=n;this.originalBikes=e,this.bikes=e}).catch(n=>{console.log(n)})},getBike(t){const n=`${this.VITE_URL}/${this.VITE_PATH}/${t}`;l.get(n).then(e=>{const{data:s}=e;this.orderBike=s}).catch(e=>{console.log(e)})},search(){this.bikes=this.searchBikes},checkBike(t){this.tempBike=t,document.body.style.overflow="hidden"},takeTime(t,n){this.rentDate=new Date(t).getTime(),this.returnDate=new Date(n).getTime()}}});export{y as B,C as R};
