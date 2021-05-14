/**
 * @FileDescription:
 * @Author: Rwenjie
 * @Date: 2021/5/2
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/5/2
 **/

var menus = [
    {
        action: "ab-testing",
        title: "个人信息",
        path:"/profile/info",
        items: [{ title: "修改密码", path: "/pwd" }]
    },
    {
        action: "apps",
        title: "商品管理",
        path:"/profile/item",
        items: [
            { title: "分类管理", path: "/category" },
            { title: "商品列表", path: "/list" },
            { title: "我的商品列表", path: "/list2" },
            { title: "规格参数", path: "/specification" }
        ]
    },
    {
        action: "people",
        title: "会员管理",
        path:"/user",
        items: [
            { title: "会员统计", path: "/statistics" },
            { title: "会员管理", path: "/list" }
        ]
    },
    {
        action: "attach_money",
        title: "销售管理",
        path:"/trade",
        items: [
            { title: "交易统计", path: "/statistics" },
            { title: "订单管理", path: "/order" },
            { title: "物流管理", path: "/logistics" },
            { title: "促销管理", path: "/promotion" }
        ]
    },
    {
        action: "settings",
        title: "权限管理",
        path:"/authority",
        items: [
            { title: "权限管理", path: "/list" },
            { title: "角色管理", path: "/role" },
            { title: "人员管理", path: "/member" }
        ]
    }
]

export default menus;

