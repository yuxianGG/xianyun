// 是用于处理axios的请求拦截插件
import { Message } from 'element-ui'

export default ({ $axios }) => {
  // 错误拦截, onError用于错误拦截
  $axios.onError((res) => {
    // 解构出错误信息和代码
    const { message, statusCode } = res.response.data

    if (statusCode === 400) {
      Message.error(message)
    }
  })
}
