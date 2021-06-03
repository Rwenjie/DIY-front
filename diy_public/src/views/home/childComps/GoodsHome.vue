<!--
 * @FileDescription: TODO
 * @Author: Rwenjie
 * @Date: 2021/6/3
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/6/3
 -->

<template>
    <div class="goods-home">
        <v-container>
            <v-row>
                <template v-for="n in 4">
                    <v-col
                            :key="n"
                            class="mt-2"
                            cols="12"
                    >
                        <strong>Category {{ n }}</strong>
                    </v-col>

                    <v-col
                            v-for="j in 6"
                            :key="`${n}${j}`"
                            cols="6"
                            md="2"
                    >
                        <v-sheet height="150"></v-sheet>
                    </v-col>
                </template>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    export default {
        name: "GoodsHome",
        data: () => ({ drawer: null }),

    }
</script>

<style scoped>

</style>