<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>健康问答</el-breadcrumb-item>
        </el-breadcrumb>
        <!--    用户列表主体（卡片）-->
        <el-card>

            <el-autocomplete placeholder="请输入您的问题" class="inline-input" v-model="question" :fetch-suggestions="querySearch"
                @select="handleSelect" clearable style="width: 50%; padding-right: 10px"></el-autocomplete>
            <el-button type="primary" icon="el-icon-search" @click="search">发送</el-button>


            <el-card class="box-card">
                <div class="text item">
                    {{ answer }}
                </div>
            </el-card>


        </el-card>
    </div>
</template>
  
<script>
import { Mounted } from 'vue'
export default {
    data() {
        return {
            questionList: [],
            question: '',
            answer: ' 在人生中，健康的价值远胜过声望和财富。愿您劳逸适度，多加保重。'
        };
    },
    mounted() {
        this.questionList = this.loadAll();
    },
    methods: {
        querySearch(queryString, cb) {
            var questionList = this.questionList;
            var results = queryString ? questionList.filter(this.createFilter(queryString)) : questionList;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        createFilter(queryString) {
            return (restaurant) => {
                return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        loadAll() {
            return [
                { "value": "肚子疼怎么办" },
                { "value": "感冒症状有哪些" },
                { "value": "肠胃炎多久能好" },
                { "value": "如何医治头疼" }
            ];
        },
        handleSelect(item) {
            console.log(item);
        },
        async search() {

            // 问答接口python
            const { data: res } = await this.$http.post("http://localhost:5000/kbqa", { question: this.question });

            console.log(res)

        },


    }
}
</script>
  
<style lang="less" scoped>
.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.box-card {
    margin-top: 18px;
    width: 70%;
    height: 50%;
    min-height: 300px;
    max-height: fit-content;
}

@media screen and (max-width: 1000px) {
    .box-card {
        width: 100%;
    }
}

.el-breadcrumb {
    margin-bottom: 15px;
    font-size: 17px;
}

.dialog_diy {
    ::v-deep .el-dialog__wrapper {

        // eslint-disable-line
        .el-dialog {
            .el-dialog__body {
                padding: 0px;
            }

            .el-dialog__header {
                padding: 0px;
            }

            .el-dialog__headerbtn {
                top: 5px;
                right: 5px;
                padding-top: 10px;
            }

            .el-dialog__headerbtn .el-dialog__close {
                color: #fff;
                height: 30px;
                width: 35px;
            }

            .el-dialog__headerbtn .el-dialog__close:hover {
                color: gray;
            }
        }
    }
}
</style>
  