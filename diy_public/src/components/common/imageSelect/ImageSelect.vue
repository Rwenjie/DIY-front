<!--
 * @FileDescription: TODO
 * @Author: Rwenjie
 * @Date: 2021/5/15
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/5/15
 -->

<template>
    <div id="image-select">
        <ul class="select-ul" style="" >
            <li class="select-li" style="" v-for="(item, id) in dataList" :key="id" @click="pitchOn(id, item.disabled)">
                <div class="select-div"
                     v-bind:class="item.disabled ? classB : id===selectId? classA : classC"
                     v-bind:style="{height: height +'px', 'line-height': height +'px'}">
                    <span style="width:auto; height:100%" v-if="isImg">
                        <img data-img="1" :src="item.src" width="auto" height="100%" alt="黑色">
                    </span>
                    <span v-bind:style="isImg? {padding: '8px'} : {padding: '13px'}"
                            style="text-align: center;
                            line-height: 50px;">
                        {{item.alt}}
                    </span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "ImageSelect",
        model: {
            prop: 'selected',
            event: 'pitch-on'
        },
        props: {
            selected: {
                type: Number,
                default() {
                    return null;
                }
            },
            dataList: {
                type: Array,
                default(){
                    return []
                }
            },
            width: {
                type: Number,
                default() {
                    return 100;
                }
            },
            height: {
                type: Number,
                default() {
                    return 100;
                }
            },
            isImg: {
                type: Boolean,
                default() {
                    return false;
                }
            },
            defaultIndex: {
                type: Number,
                default() {
                    return 1;
                }
            }
        },
        data() {
            return {
                selectId: -1,
                isOk: true,
                classA: "selected-div",
                classB: "disable-selected",
                classC: "select-div",
                classD: "select-li div:hover"
            }
        },
        methods: {
            pitchOn(id, disabled) {
                if (!disabled) {
                    this.selectId = id;
                }
            }
        },
        watch: {
            selectId: {
                deep: true,
                handler(){
                    this.$emit('pitch-on', this.selectId)
                }
            }
        },
        created() {
            setTimeout( () => {

            }, 2000);
            this.selectId = this.defaultIndex;

        }
    }
</script>

<style scoped>

    .select-ul {
        list-style: none;
        padding-left: 0 ;
        display: flex;
        flex-wrap: wrap
    }
    .select-li {
        display: inline;
        line-height: 40px;
        float:left;
        cursor: pointer;
        margin: 0 6px 6px;
        user-select: none;
    }

    .select-div {
        height: 50px;
        width: auto;
        border: #c3bfc0 solid 1px;
    }

    /*被选中后的样式*/
    .selected-div {
        border: red solid 2px;
    }
    .disable-selected {
        cursor:not-allowed;
        color: #c2c2c2;
    }
    .select-li-hover div:hover {
        border: red solid 2px;
    }
    .select-li div:focus {
        border: #000000 solid 2px;
    }



</style>