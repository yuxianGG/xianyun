<template>
  <div style="padding:50px; margin-bottom:20px;">
    <div class="tabs">
      <span
        v-for="(item,index) in ['新闻','体育','娱乐']"
        :key="index"
        :class="{active:current===index}"
        @click="dianji(index)"
      >{{ item }}</span>
    </div>
    <div v-show="current === 0">
      <ul>
        <li>hhh</li>
        <li>hhh</li>
        <li>hhh</li>
      </ul>
    </div>
    <div v-show="current === 1">
      <ul>
        <li>kkk</li>
        <li>kkk</li>
        <li>kkk</li>
      </ul>
    </div>
    <div v-show="current === 2">
      <ul>
        <li>ccc</li>
        <li>ccc</li>
        <li>ccc</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 记录当前状态
      current: 0
    }
  },
  methods: {
    dianji (index) {
      // 修改current
      this.current = index
    }
  }
}
</script>

<style lang="less" scoped>
    .tabs{
        margin-bottom: 20px;
        span{
            cursor: pointer;
        }
    }
    .active{
        color: red
    }
</style>
