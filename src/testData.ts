
/* eslint-disable */
// eslint-disable-next-line
// 测试接口
export interface ResponseType<P = {}> {
    code: number,
    msg: string,
    // data 可能有很多类型 默认希望是个对象
    data: P
}
// -----------------优化-------------------

export interface UserProps {
    isLogin: boolean;
    nickName?: string;
    _id?: number;
    columnId?: number
}
export interface ImageProps {
    _id?: string,
    url?: string,
    createdAt?: string
}

export interface PostProps {
    _id: number;
    title: string;
    content: string;
    image?: ImageProps | string;
    createAt: string;
    column: number;
    author?: string | UserProps
}
export interface ColumnProps {
    _id: number;
    title: string;
    avatar?: ImageProps;
    description: string;
}
// 测试数据

export const testData: ColumnProps[] = [
    {
        _id: 1,
        title: 'test1的专栏',
        description: '这是的test1专栏，有一段非常有意思的简介，可以更新一下欧, 这是的test1专栏，有一段非常有意思的简介，可以更新一下欧',
        avatar: {
            createdAt: "2023-08-20 22:21:10",
            _id: "5f3e41a8b7d9c60b68cdd1ec",
            url: "http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5f3e41a8b7d9c60b68cdd1ec.jpg"
        }
    },
    {
        _id: 2,
        title: 'test2的专栏',
        description: '这是的test2专栏，有一段非常有意思的简介，可以更新一下欧',
        avatar: {
            createdAt: "2023-08-20 22:21:10",
            _id: "5f3e41a8b7d9c60b68cdd1ec",
            url: "http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5f3e41a8b7d9c60b68cdd1ec.jpg"
        }
    },
    {
        _id: 3,
        title: 'test3的专栏',
        description: '这是的test3专栏，有一段非常有意思的简介，可以更新一下欧 这是的test1专栏，有一段非常有意思的简介，可以更新一下欧',
        avatar: {
            createdAt: "2023-08-20 22:21:10",
            _id: "5f3e41a8b7d9c60b68cdd1ec",
            url: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
        }
    },
    {
        _id: 4,
        title: 'test4的专栏',
        description: '这是的test4专栏，有一段非常有意思的简介，可以更新一下欧',

    }
];
export const testPosts: PostProps[] = [
    // _id是第几个文章的id column是专栏的id
    {
        _id: 11,
        title: '这是我的第一篇文章',
        content: '"this is a new post you Very often we will need to map routes with the given pattern to the same component. For example we may have a User component which should be rendered for all users but with dif..."',
        image: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee1980819f4ae08ac78d458.png?x-oss-process=image/resize,m_fill,m_pad,w_200,h_110',
        createAt: '2023-06-11 10:34:22',
        column: 1,
        author: {
            isLogin: true,
            _id: 1,
            nickName: 'Maybe'
        }
    },
    {
        _id: 12,
        title: '这是我的第二篇文章',
        content: '"this is a new post you Very often we will need to map routes with the given pattern to the same component. For example we may have a User component which should be rendered for all users but with dif..."',
        image: '',
        createAt: '2023-06-11 10:34:22',
        column: 1
    },
    {
        _id: 13,
        title: '这是我的第三篇文章',
        content: '"this is a new post you Very often we will need to map routes with the given pattern to the same component. For example we may have a User component which should be rendered for all users but with dif..."',
        image: 'https://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5edcc2329f2b4e28352b75eb.jpg?x-oss-process=image/resize,m_fill,m_pad,w_200,h_110',
        createAt: '2023-06-11 10:34:22',
        column: 1
    },
    {
        _id: 21,
        title: "这是我的第一篇文章",
        content: "this is a new post you very often",
        image: require("@/assets/logo.png"),
        createAt: "2023-8-22 21:30:11",
        column: 2,
        author: {
            isLogin: true,
            _id: 1,
            nickName: 'Maybe'
        }
    },
    {
        _id: 22,
        title: "这是我的第二篇文章",
        content: "this is a new post you very often",
        image: require("@/assets/logo.png"),
        createAt: "2023-8-22 21:30:11",
        column: 2,
    },

    {
        _id: 31,
        title: "这是我的第yi篇文章",
        content: "this is a new post you very often",
        image: require("@/assets/column.jpg"),
        createAt: "2023-8-22 21:30:11",
        column: 3,
    },
    {
        _id: 32,
        title: "这是我的第er篇文章",
        content: "this is a new post you very often",
        image: require("@/assets/column.jpg"),
        createAt: "2023-8-22 21:30:11",
        column: 3,
    },
    {
        _id: 33,
        title: "这是我的第san篇文章",
        content: "this is a new post you very often",
        image: require("@/assets/column.jpg"),
        createAt: "2023-8-22 21:30:11",
        column: 3,
    },
];