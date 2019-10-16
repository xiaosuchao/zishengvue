<template>
  <div id="app">
    <router-view />
    <!-- <buttomnav></buttomnav> -->
  </div>
</template>

<script>

</script>

<style lang="less">
html,body,#app{ height: 100%;}
body {
  font-size: 16px;
  background-color: #f8f8f8;
  -webkit-font-smoothing: antialiased;
  font-family: microsoft yahei;
}
h1,h2,h3,h4,h5,h6{padding:0; margin: 0;}
.nodata{text-align: center; padding-top: 30%}
.nodata img{ display: block; margin: 0 auto; width: 30%;}
.nodata .txt{ padding-right: 26px; color: #999; font-size: 14px; padding-top: 12px;}

.goods{
  .van-tabs__wrap{ padding: 0 40px; background: #fff;}
}

.ulglist{
  .van-card{
    font-size: 14px;
    .van-card__desc{ margin: 6px 0px 6px;}
  }
}
.home {
  background: rgb(243, 240, 240);
  .search {
  }
  &-swipe {
    img {
      width: 100%;
      display: block;
      height: 152px;
    }
  }
  //   分类区
  .category {
    .van-col{ margin-bottom: 6px;}
    a {
      display: block;
      width: 100%;
      height: 60px;
      color: black;
      text-align: center;
      line-height: 60px;
      background: white;
      border-radius: 6px;
      margin-bottom: 2px;
      img {
        width: 30px; margin-right: 4px;
        vertical-align: middle;
      }
    }
  }

  .slogan{
    background:#be0400; color: #fff;  padding: 4px 6px; font-size: 15px;
    img{ width: 26px; vertical-align: middle; }
  }
  .homeimgtit{
    img{ width: 50%; margin: 10px auto 8px; display: block; }
  }

  .ulhomeimgtxt{
    padding: 0px 8px;
    li{
      overflow: hidden; background: #fff; padding: 8px; margin-bottom: 8px;
      a{ display: block; color: #000;}
      .prodimg{ float: left; width: 100px;height: 100px;;}
      .rtcon{
        font-size: 15px; padding-left: 106px;
        .tit{ margin-bottom: 12px;}
        .price{ color: #f00; margin-bottom: 2px; font-size: 13px;}
        .usescroe{font-size: 13px; color: #888;}
        .oprice{ color: #999;  font-size: 12px;}
      }
    }
  }

  // 热门推荐
  .imgnav {
    padding: 0 4px;
    a {
      display: block;
      width: 100%;
      height: 150px;
      text-align: center;
      img {
        margin-left: 2px;
        width: 95%;
        height: 100px;
      }
      span {
        display: block;
        color: #666;
        font-size: 12px;
        height: 40px;
    background: white;
        width: 97%;
      }
    }
  }
  //   猜你喜欢
  .remen {
    font-size: 18px;
    padding: 16px 0 10px 10px;
  }
  .van-search{ padding: 8px 2px 8px 12px;}
  .van-search__action{
    color:white;
  }
  .ulhome2col{
    display: flex;flex-wrap:wrap; justify-content:space-between; margin: 0 8px;
    li{
      width: 49%; background: #fff; margin-bottom: 10px; font-size: 14px; padding: 10px 8px 8px; box-sizing: border-box;
      a{
        display: block; width: 100%; color: #000;
        img{ max-width: 100%; display: block; margin-bottom: 6px;}
        .tit{ margin-bottom: 5px;}
        .price{color: #f00; font-size: 13px; margin-bottom: 3px;}
        .oprice{ font-size: 13px; color: #666;}
      }
    }
  }

  .ulguess {

    li {
      width: 100%;
      background: white;
      margin-bottom: 12px;
      img {
        width: 100%;
        height: 200px;
      }

      .one {
        color: red;
      }
      .two {
        font-size: 13px;
        color: #666;
        margin-left: 15px;
      }
      .three {

      }
      .tit{
        color:black; padding: 10px;
      }
      .params{ padding:0px 10px 10px ; color: #000;}
    }
  }
}
</style>
