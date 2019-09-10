<template>
  <div class="main">
    <div class="air-column">
      <h2>乘机人</h2>
      <el-form class="member-info">
        <div
          v-for="(item,index) in users"
          :key="index"
          class="member-info-item"
        >
          <el-form-item label="乘机人类型">
            <el-input v-model="item.username" placeholder="姓名" class="input-with-select">
              <el-select
                slot="prepend"
                value="1"
                placeholder="请选择"
              >
                <el-option label="成人" value="1" />
              </el-select>
            </el-input>
          </el-form-item>

          <el-form-item label="证件类型">
            <el-input
              v-model="item.id"
              placeholder="证件号码"
              class="input-with-select"
            >
              <el-select
                slot="prepend"
                value="1"
                placeholder="请选择"
              >
                <el-option label="身份证" value="1" :checked="true" />
              </el-select>
            </el-input>
          </el-form-item>
          <!-- 移除乘机人按钮 -->
          <span class="delete-user" @click="handleDeleteUser(index)">-</span>
        </div>
      </el-form>

      <el-button class="add-member" type="primary" @click="handleAddUsers">
        添加乘机人
      </el-button>
    </div>

    <div class="air-column">
      <h2>保险</h2>
      <div>
        <div
          v-for="(item, index) in infoData.insurances"
          :key="index"
          class="insurance-item"
        >
          <el-checkbox
            :label="`${item.type}：￥${item.price}/份×1  最高赔付${item.compensation}`"
            border
            @change="handleChange(item.id)"
          />
        </div>
      </div>
    </div>

    <div class="air-column">
      <h2>联系人</h2>
      <div class="contact">
        <el-form label-width="60px">
          <el-form-item label="姓名">
            <el-input />
          </el-form-item>

          <el-form-item label="手机">
            <el-input placeholder="请输入内容">
              <template slot="append">
                <el-button @click="handleSendCaptcha">
                  发送验证码
                </el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="验证码">
            <el-input />
          </el-form-item>
        </el-form>
        <el-button type="warning" class="submit" @click="handleSubmit">
          提交订单
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 用户数据
      users: [{
        username: '',
        id: ''
      }],
      //   机票数据
      infoData: {},
      // 保险数据id的集合
      insurances: []
    }
  },
  mounted () {
    const { id, seatxid } = this.$route.query

    // 请求机票数据
    this.$axios({
      url: '/airs/' + id,
      params: {
        seat_xid: seatxid
      }
    }).then((res) => {
    //   console.log(res)
      this.infoData = res.data
    })
  },
  methods: {
    // 添加乘机人
    handleAddUsers () {
      this.users = [
        ...this.users,
        {
          username: '',
          id: ''
        }
      ]
    },

    // 移除乘机人
    handleDeleteUser (index) {
      this.users.splice(index, 1)
    },

    // 选中保险时触发
    handleChange (id) {
      // 先判断数组中是否已经包含该id
      const index = this.insurances.indexOf(id)
      // 包含了应该删除
      if (index > -1) {
        this.insurances.splice(index, 1)
      } else {
        // 添加id到数组
        this.insurances.push(id)
      }
    //   console.log(this.insurances)
    },

    // 发送手机验证码
    handleSendCaptcha () {

    },

    // 提交订单
    handleSubmit () {

    }
  }
}
</script>

<style scoped lang="less">
    .air-column{
        border-bottom:1px #ddd dashed;
        padding-bottom: 20px;
        margin-bottom: 20px;
    }

    .air-column h2{
        margin-bottom: 20px;
        font-size: 22px;
        font-weight: normal;
    }

    /deep/ .el-select .el-input {
        width: 130px;
    }

    .input-with-select{
        width:590px;
    }

    .input-with-select /deep/  .el-input-group__prepend {
        background-color: #fff;
    }
    .member-info /deep/ .el-form-item{
        margin-bottom:0;
    }

    .member-info-item{
        border-bottom:1px #eee dashed;
        padding-bottom: 20px;
        position: relative;

        &:first-child{
            .delete-user{
                display: none;
            }
        }
    }

    .add-member{
        margin-top:20px;
    }

    .delete-user{
        display: block;
        background:#ddd;
        width:16px;
        height:16px;
        font-size:14px;
        text-align: center;
        line-height: 16px;
        color:#fff;
        cursor: pointer;
        border-radius: 50px;
        position:absolute;
        right:-30px;
        top:50%;
    }

    .insurance{
        > div{
            margin-top:10px;
        }
    }

    .insurance-item{
        margin-bottom: 20px;
    }

    .contact{
        /deep/ .el-input{
            width:50%;
        }
    }

    .submit{
        margin: 50px auto;
        display: block;
        width:250px;
        height:50px;
    }
</style>
