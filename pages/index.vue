<template>
  <div class="container">
    <!-- 轮播图组件 -->
    <el-carousel>
      <el-carousel-item v-for="(item,index) in banners" :key="index">
        <div
          class="banner-image"
          :style="`background:url(${$axios.defaults.baseURL}${item.url}) center center no-repeat;
        background-siza:contain contain;`"
        />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data () {
    return {
      banners: [
        // 'http://157.122.54.189:9095/assets/images/th01.jfif',
        // 'http://157.122.54.189:9095/assets/images/th02.jfif',
        // 'http://157.122.54.189:9095/assets/images/th03.jfif'
      ]
    }
  },
  mounted () {
    // 请求轮播图数据
    this.$axios({
      url: '/scenics/banners'
    }).then((res) => {
      // console.log(res)
      // 获取轮播图数组
      const data = res.data.data
      this.banners = data
    })
  }
}
</script>

<style scoped lang="less">
.container{
    min-width:1000px;
    margin:0 auto;
    position:relative;
    //  如果再scoped中要修改第三方的组件，组件的class不会加上scoped的字符串，需要在前面加个/deep/
    /deep/ .el-carousel__container{
        height:700px;
    }
    .banner-image{
        width:100%;
        height:100%;
    }
}
</style>
