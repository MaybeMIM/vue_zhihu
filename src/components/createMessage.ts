// 将message组件改造为一个函数用来调用

/* eslint-disable */
// eslint-disable-next-line
// createApp太重了 用h来构造 接收参数与app相同 用render函数渲染节点
import { createApp, h, render } from 'vue'
import Message from "./Message.vue";
export type MessageType = "success" | "error" | "default";

const createMessage = (message: string, type: MessageType, timeout?: number) => {
    const messageVnode = h(Message, {
        message,
        type
    })
    // 新建一个节点 方便后续挂载message
    const mountNode = document.createElement('div')
    document.body.appendChild(mountNode)
    // 将组件实例挂载到节点上面
    render(messageVnode, mountNode)
    // messageInstance.mount(mountNode)

    // 其他情况下 不会自动消失 要用程序来消除
    const destroy = () => {
        render(null, mountNode)
        document.body.removeChild(mountNode)
    }

    // 存在才去执行
    if (timeout) {
        // 设置定时器 到点后节点卸载组件 删除节点
        setTimeout(() => {
            destroy()
            // render(null, mountNode)
            // // messageInstance.unmount()
            // document.body.removeChild(mountNode)
        }, timeout);
    }
    // 返回destroy方法 在外面的实例上可以包裹这个方法
    return { destroy }
}

export default createMessage