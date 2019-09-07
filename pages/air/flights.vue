<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <div />

        <!-- 航班头部布局 -->
        <FlightsListHead />

        <!-- 航班信息 -->
        <FlightsItem v-for="(item,index) in flightsData.flights" :key="index" :data="item" />
        <div />
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
      </div>
    </el-row>
  </section>
</template>

<script>
import FlightsListHead from '@/components/air/flightsListHead.vue'

import FlightsItem from '@/components/air/flightsItem.vue'
export default {
  components: {
    FlightsListHead,
    FlightsItem
  },
  data () {
    return {
      // 机票列表返回的总数据
      flightsData: {}
    }
  },
  mounted () {
    // 请求航班列表数据
    this.$axios({
      url: 'airs',
      params: this.$route.query
    }).then((res) => {
      // 赋值给总数据
      this.flightsData = res.data
    })
  }
}
</script>

<style scoped lang="less">
    .contianer{
        width:1000px;
        margin:20px auto;
    }
    .flights-content{
        width:745px;
        font-size:14px;
    }
    .aside{
        width:240px;
    }
</style>
