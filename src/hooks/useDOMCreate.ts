// 重复的使用dom创建节点并用teleport传送到html中的操作 抽象出一个函数文件

/* eslint-disable */
// eslint-disable-next-line
import { onUnmounted } from 'vue'

function useDOMCreate(nodeId: string) {
    // 创建节点
    const node = document.createElement("div");
    node.id = nodeId;
    document.body.appendChild(node);
    // 组件卸载前移除节点
    onUnmounted(() => {
        document.body.removeChild(node)
    })
}

export default useDOMCreate