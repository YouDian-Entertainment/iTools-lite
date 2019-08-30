<template>
    <Card class="v-history-item">
        <div class="history-color-block" :style="historyColorBlock"></div>
        <div class="history-item-value">
            <div class="item-val">
                <span class="">{{colorInfo.rgb}}</span>
            </div>
            <div class="item-val">
                <span class="">{{colorInfo.hex}}</span>
            </div>
        </div>
        <div class="history-item-del">
            <Button type="info" @click="copyValue(colorInfo.rgb)">RGB</Button>
            <Button type="info" @click="copyValue(colorInfo.hex)">16进制</Button>
            <Button type="error" @click="() => delColorItem(colorInfo._id)">删除</Button>
        </div>
    </Card>
</template>

<script>
import { Card, Button } from 'iview';
import { copyText } from '@common/utils';
import { delItem } from '@common/db';
import dbName from '@constants/db';
export default {
    name: 'ColorHistoryItem',
    components: {
        Card,
        Button,
    },
    props: {
        colorInfo: {
            type: Object,
            default() {
                return {
                    rgb: '',
                    hex: '',
                    _id: '',
                };
            },
        },
    },
    computed: {
        historyColorBlock() {
            return `background: ${this.$props.colorInfo.rgb};`;
        },
    },
    methods: {
        copyValue(val) {
            copyText(val);
        },
        async delColorItem(id) {
            await delItem(dbName.color, id);
            this.$emit('refresh');
        },
    },
};
</script>

<style lang="less">
.v-history-item {
    width: 100%;
    height: 195px;
    .m-b(@gap);
    overflow: hidden;
    .ivu-card-body {
        .flex-column();
        .p(0);
        height: 100%;
    }
    .history-color-block {
        width: 100%;
        height: 100px;
        .m-r(@gap);
        .border-line();
    }
    .history-item-value {
        .flex-column-center();
        .item-val {
            width: 100%;
            .font-size();
            height: 35px;
            line-height: 35px;
            text-align: center;
        }
        .value-convert-icon {
            height: 25px;
            transform: rotate(90deg);
        }
        .ivu-icon-ios-copy-outline {
            cursor: pointer;
        }
    }
    .history-item-del {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: @mask-color;
        .flex-column-center();
        display: none;
        .ivu-btn {
            .m-t(@gap);
            width: 80px;
        }
    }
    &:hover {
        .history-item-del {
            display: flex;
        }
    }
}
</style>

