/* eslint-disable */
// eslint-disable-next-line
// 点击外部地区关闭下拉菜单
import { ref, onMounted, onUnmounted, Ref } from 'vue'


const userClickOutside = (elementRef: Ref<null | HTMLElement>) => {
    const isClickOutside = ref(false)
    const handle = (e: MouseEvent) => {
        if (elementRef.value) {
            // 点击的地方如果是下拉菜单的选项不做什么 如果是其他地方 则直接关闭菜单
            // 如果contains中的节点是后代节点或者是本身 返回true
            if (elementRef.value.contains(e.target as HTMLElement)) {
                isClickOutside.value = false;
            } else {
                isClickOutside.value = true
            }
        }
    }
    // 在挂载时绑定事件
    onMounted(() => {
        document.addEventListener("click", handle);
    });
    // 销毁时解除
    onUnmounted(() => {
        document.removeEventListener("click", handle);
    });
    return isClickOutside
}

export default userClickOutside
