<!--
 * @FileDescription: TODO
 * @Author: Rwenjie
 * @Date: 2021/6/6
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/6/6
 -->

<template>
    <div id="express">
        <div v-if="trailInfor.data.length==0">
            <p class="emptyTips">暂无物流信息~</p>
        </div>
        <div v-else>
            <el-timeline>
                <el-timeline-item
                        v-for="(activity, index) in trailInfor.data"
                        :key="index"
                        :timestamp="activity.time" placement="top">
                    {{activity.context}}
                </el-timeline-item>
            </el-timeline>
        </div>

    </div>
</template>

<script>
    import {expressDetail} from "../../../network/express";

    export default {
        name: "Express",
        props: {
            order:{
                type: Object,
                default() {
                    return null
                }
            }
        },
        components: {
        },
        data() {
            return {
                expressId: "",
                trailInfor: {
                    trailUrl: "",
                    arrivalTime: "",
                    totalTime: "",
                    message: "",
                    nu: "",
                    isCheck: "",
                    com: "",
                    status: "",
                    data: []
                },
            }
        },
        methods: {
            //查询物流信息
            doExpress() {
                console.log("查询快递");
                console.log(this.order);
                expressDetail({
                    orderId: this.order.id
                }).then(res => {
                    console.log(res);
                    this.trailInfor.data.push(...res.data.list);
                    this.trailInfor.trailUrl = res.data.trailUrl;
                    this.trailInfor.com = res.data.com;
                    this.trailInfor.totalTime = res.data.TotalTime;
                    this.trailInfor.nu = res.data.nu;
                    console.log(res.data);
                    console.log(this.trailInfor.data);
                })
            },
        },
        mounted() {
            this.doExpress();
        },
        watch: {
            order: {
                deep: true,
                handler() {
                    this.doExpress();
                }
            }
        }
    }
</script>

<style scoped>

    .emptyTips{
        width: 200px;
        text-align: left;
        display: block;
        margin: 30px auto;
        color:@thirdColor;
        font-size: 20px;
    }
</style>