
/* eslint-disable */
// eslint-disable-next-line
import { ColumnProps } from './testData'

export function generateFitUrl(column: ColumnProps, width: number, height: number) {
    if (column.avatar) {
        // column.avatar.fiturl = column.avatar.url
    } else {
        column.avatar = {
            url: require('@/assets/column.jpg')
        }
    }
}

interface CheckCondition {
    // 格式可以是jpg png
    format?: string[]
    size?: number
}
type ErrorType = 'size' | 'format' | null

export function beforeUploadCheck(file: File, condition: CheckCondition) {
    const { format, size } = condition
    // 判断是否合法 调用数组方法 判断是否包含所定的类型 没有就直接返回true
    const isValidFormat = format ? format.includes(file.type) : true
    // 转换 kb 转换 兆 小于size就合法 没有size就直接返回true
    const isValidSize = size ? (file.size / 1024 / 1024 < size) : true
    // 希望返回的格式 不仅有是个布尔值 还有错误的类型
    let error: ErrorType = null
    if (!isValidFormat) {
        error = 'format'
    }
    if (!isValidSize) {
        error = 'size'
    }
    return {
        passed: isValidFormat && isValidSize,
        error
    }
}

// 用于优化store的存储数据结构
interface TestProps {
    _id: string,
    name: string
}

// 两个数据类型的转换
export const arrToObj = <T extends { _id?: string }>(arr: Array<T>) => {
    return arr.reduce((prev, current) => {
        if (current._id) {
            prev[current._id] = current
        }
        return prev
    }, {} as { [key: string]: T })
}

export const objToArr = <T>(obj: { [key: string]: T }) => {
    return Object.keys(obj).map(key => obj[key])
}
