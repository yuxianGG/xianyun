<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <FlightsFilters :data="cacheFlightsData" @setDataList="setDataList" />
        <div />

        <!-- 航班头部布局 -->
        <FlightsListHead />

        <!-- 航班信息 -->
        <FlightsItem v-for="(item,index) in dataList" :key="index" :data="item" />
        <el-pagination
          :current-page="pageIndex"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
        <div />
      </div>
      <!-- 侧边栏 -->
      <FlightsAside />
    </el-row>
  </section>
</template>

<script>
import FlightsListHead from '@/components/air/flightsListHead.vue'

import FlightsItem from '@/components/air/flightsItem.vue'

import FlightsFilters from '@/components/air/flightsFilters.vue'
import FlightsAside from '@/components/air/FlightsAside.vue'
export default {
  components: {
    FlightsListHead,
    FlightsItem,
    FlightsFilters,
    FlightsAside
  },
  data () {
    return {
      // 机票列表返回的总数据
      // flightsData: {},
      // 当前显示的列表数组
      dataList: [],
      pageIndex: 1,
      pageSize: 5,
      total: 0,
      // 航班总数据
      flightsData: {
        flights: [],
        info: {},
        options: {}
      },
      // 代表是大的数据，初始值和上面的flightsData是一样的，
      // 这个变量一旦赋值之后不能再被修改
      cacheFlightsData: {
        info: {},
        options: {}
      }
    }
  },
  watch: {
    // watch可以监听this下的所有属性
    $route () {
      // 请求航班列表数据
      this.getData()
    }
  },
  mounted () {
    // 请求航班列表数据
    this.getData()
  },
  methods: {
    getData () {
      // 请求航班列表数据
      this.$axios({
        url: 'airs',
        params: this.$route.query
      }).then((res) => {
      // 赋值给总数据
        this.flightsData = res.data
        // 赋值给缓存总数据
        this.cacheFlightsData = { ...res.data }
        // 分页的总数
        this.total = this.flightsData.flights.length
        // 第一页的值
        this.dataList = this.flightsData.flights.slice(0, this.pageSize)
      })
    },
    setDataList (arr) {
      // 修改总的航班列表
      this.flightsData.flights = arr
      // 重新返回第一页
      this.pageIndex = 1
      // 按照数学公式切换dataList的值
      this.dataList = this.flightsData.flights.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      )
      // 修改总条数
      this.total = arr.length
    },
    // 每页条数切换时候触发,val是条码数
    handleSizeChange (val) {
      this.pageSize = val
      this.dataList = this.flightsData.flights.slice(0, val)
    },
    // 页码切换时候触发,val是点击的页码
    handleCurrentChange (val) {
      // 当前页
      this.pageIndex = val
      this.dataList = this.flightsData.flights.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      )
    }
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
