<template>
  <div class="search-form">
    <!-- 头部tab切换 -->
    <el-row type="flex" class="search-tab">
      <span
        v-for="(item, index) in tabs"
        :key="index"
        :class="{active: index === currentTab}"
        @click="handleSearchTab(index)"
      >
        <i :class="item.icon" />{{ item.name }}
      </span>
    </el-row>

    <!-- 该表单没有model和rules -->
    <el-form ref="form" class="search-form-content" label-width="80px">
      <el-form-item label="出发城市">
        <!-- 文档地址：https://element.eleme.cn/#/zh-CN/component/input#yuan-cheng-sou-suo -->

        <!-- fetch-suggestions: 获取搜索建议，并且显示在输入框的下拉框中 -->
        <!-- select：在下拉框中选中时候时候触发的事件 -->

        <el-autocomplete
          v-model="form.departCity"
          :fetch-suggestions="queryDepartSearch"
          placeholder="请搜索出发城市"
          class="el-autocomplete"
          @blur="handleDepartBlur"
          @select="handleDepartSelect"
        />
      </el-form-item>

      <el-form-item label="到达城市">
        <el-autocomplete
          v-model="form.destCity"
          :fetch-suggestions="queryDestSearch"
          placeholder="请搜索到达城市"
          class="el-autocomplete"
          @blur="handlDestBlur"
          @select="handleDestSelect"
        />
      </el-form-item>
      <el-form-item label="出发时间">
        <!-- change 用户确认选择日期时触发 -->
        <el-date-picker
          v-model="form.departDate"
          type="date"
          placeholder="请选择日期"
          style="width: 100%;"
          @change="handleDate"
        />
      </el-form-item>
      <el-form-item label="">
        <el-button
          style="width:100%;"
          type="primary"
          icon="el-icon-search"
          @click="handleSubmit"
        >
          搜索
        </el-button>
      </el-form-item>
      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  data () {
    return {
      form: {
        departCity: '', // 出发城市
        departCode: '', // 出发城市代码
        destCity: '', // 到达城市
        destCode: '', // 到达城市代码
        departDate: '' // 日期字符串
      },
      departData: [], // 存储后台返回的出发城市数组
      destData: [], // 存储后台返回的到达城市数组
      tabs: [
        { icon: 'iconfont icondancheng', name: '单程' },
        { icon: 'iconfont iconshuangxiang', name: '往返' }
      ],
      currentTab: 0
    }
  },
  mounted () {

  },
  methods: {
    // tab切换时触发
    handleSearchTab (index) {
      if (index === 1) {
        this.$alert('目前暂时不支持往返', '提示')
      }
    },

    // 出发城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDepartSearch (value, cb) {
      if (!value) {
        const kong = []
        cb(kong)
        return
      }
      // 根据用户的输入请求建议城市
      this.$axios({
        url: '/airs/city',
        params: {
          // 输入框的关键字
          name: value
        }
      }).then((res) => {
        // 数组
        const { data } = res.data
        // 给数组每个对象添加value属性
        const newData = []
        data.forEach((v) => {
          v.value = v.name.replace('市', '')
          // 把带有value属性的对象添加到新数组
          newData.push(v)
        })
        // 把转换后的数组赋值给data
        this.departData = newData
        // 显示到下拉列表
        cb(newData)
      })
    },

    // 目标城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDestSearch (value, cb) {
      if (!value) {
        const kong = []
        cb(kong)
        return
      }
      // 根据用户的输入请求建议城市
      this.$axios({
        url: '/airs/city',
        params: {
          // 输入框的关键字
          name: value
        }
      }).then((res) => {
        // 数组
        const { data } = res.data
        // 给数组每个对象添加value属性
        const newData = []
        data.forEach((v) => {
          v.value = v.name.replace('市', '')
          // 把带有value属性的对象添加到新数组
          newData.push(v)
        })
        // 把转换后的数组赋值给data
        this.destData = newData
        // 显示到下拉列表
        cb(newData)
      })
    },

    // 出发城市下拉选择时触发
    handleDepartSelect (item) {
    //   console.log(item)
      // 把选中的值给form
      this.form.departCity = item.value
      this.form.departCode = item.sort
    },

    // 目标城市下拉选择时触发
    handleDestSelect (item) {
      this.form.destCity = item.value
      this.form.destCode = item.sort
    },

    // 确认选择日期时触发
    handleDate (value) {
      // 转换
      this.form.departDate = moment(value).format(`YYYY-MM-DD`)
    },

    // 触发和目标城市切换时触发
    handleReverse () {
      const { departCity, departCode, destCity, destCode } = this.form
      // 交叉赋值
      this.form.departCity = destCity
      this.form.departCode = destCode
      this.form.destCity = departCity
      this.form.destCode = departCode
    },

    // 提交表单是触发
    handleSubmit () {
    //   console.log(this.form)
    // 解构
      const { departCity, destCity, departDate } = this.form

      // 判断输入不能为空
      if (!departCity) {
        this.$alert('出发城市不能为空', '提示')
      }
      if (!destCity) {
        this.$alert('到达城市不能为空', '提示')
      }
      if (!departDate) {
        this.$alert('出发日期不能为空', '提示')
      }

      // 跳转到机票列表页面
      this.$router.push({
        path: '/air/flights',
        query: this.form
      })
    },
    // 出发城市输入框失去焦点时候触发
    handleDepartBlur () {
      this.form.departCity = this.departData[0] ? this.departData[0].value : ''
      this.form.departCode = this.departData[0] ? this.departData[0].sort : ''
    },
    // 到达城市输入框失去焦点时候触发
    handlDestBlur () {
      this.form.destCity = this.destData[0] ? this.destData[0].value : ''
      this.form.destCode = this.destData[0] ? this.destData[0].sort : ''
    }
  }
}
</script>

<style scoped lang="less">
.search-form{
    border:1px #ddd solid;
    border-top:none;
    width:360px;
    height:350px;
    box-sizing: border-box;
}
.search-tab{
  span{
    display: block;
    flex:1;
    text-align: center;
    height:48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top:3px #eee solid;
    background:#eee;
  }
  .active{
    border-top-color: orange;
    background:#fff;
  }
  i{
    margin-right:5px;
    font-size: 18px;
    &:first-child{
      font-size:16px;
    }
  }
}
.search-form-content{
  padding:15px 50px 15px 15px;
  position: relative;
  .el-autocomplete{
    width: 100%;
  }
}
.reverse{
  position:absolute;
  top: 35px;
  right:15px;
  &:after,&:before{
      display: block;
      content: "";
      position: absolute;
      left:-35px;
      width:25px;
      height:1px;
      background:#ccc;
  }
  &:after{
      top:0;
    }
    &:before{
      top:60px;
    }
  span{
    display: block;
    position:absolute;
    top: 20px;
    right:0;
    font-size:12px;
    background: #999;
    color:#fff;
    width:20px;
    height:20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;
    &:after,&:before{
      display: block;
      content: "";
      position: absolute;
      left:10px;
      width:1px;
      height:20px;
      background:#ccc;
    }
    &:after{
      top:-20px;
    }
    &:before{
      top:20px;
    }
  }
}
</style>
