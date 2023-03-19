# Vue side project

2023/03/07

- preloader 在 safari 上，loading 時會停止旋轉

- 首頁 Selection 區塊
- 在手機版，單行且垂直滾動要可以換頁
- 在電腦版，Hover 秀出左右鍵，單台車點擊後 Modal 基本資訊
- 加上篩選，等級
- 刪掉原本的 Hover 效果和 PREV | NEXT

- preloader 可以嘗試將狀態以及方法放入 pinia 做管理，替代 :key 的方式，藉此增加效能

2023/03/11

- rentOrder 的頁面大致完成，後面做好會員功能，有會員資料之後再回來補渲染，而且資料庫還要加上假日加價

2023/03/17

- banner 看有沒有辦法以 $route.path 之類的方法選定不同路由顯示不同內容，這樣就可以合併一個 banner
