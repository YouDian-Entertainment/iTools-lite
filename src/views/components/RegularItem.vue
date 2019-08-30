<template>
    <Card class="v-regular-item">
        <div class="regular-name">
            {{itemInfo.name}}
        </div>
        <div class="regular-desc">{{itemInfo.desc}}</div>
        <div class="regular-rule">
            <div class="rule-value">{{itemInfo.rule}}</div>
            <Button class="copy-btn" @click="copy" type="info" size="small">复制</Button>
        </div>
        <!-- <div class="regular-check-element">
            <Input v-model="checkText" :placeholder="itemInfo.example" />
            <Button type="primary" @click="checkInputValue">校验</Button>
        </div> -->
    </Card>
</template>

<script>
import { Input, Button, Card } from 'iview';
import { copyText } from '@common/utils';
export default {
    name: 'RegularItem', // 正则表达式校验
    props: {
        itemInfo: {
            type: Object,
            default() {
                return {
                    name: '',
                    rule: null,
                    example: '',
                };
            },
        },
    },
    components: {
        Card,
        Input,
        Button,
    },
    data() {
        return {
            checkText: '',
        };
    },
    methods: {
        copy() {
            const { rule } = this.$props.itemInfo;
            copyText(`${rule}`);
        },
        checkInputValue() {
            const { rule } = this.$props.itemInfo;
            console.log('校验结果：', rule.test(this.checkText));
        },
    },
};
</script>

<style lang="less">
.v-regular-item {
    .m-b(@gap);
    .ivu-card-body {
        .p(@gap);
    }
    .regular-name {
        .font-size();
        color: @title-color;
    }
    .regular-desc {
        .font-size-sm();
        color: @tip-color;
    }
    .regular-rule {
        .font-size-sm();
        color: @info;
        // background-color: @gray-light;
        .p(@gap-sm);
        border-radius: @border-radius;
        .m-v(@gap-sm);
        .flex();
        .rule-value {
            flex: 1;
            word-break: break-all;
        }
        .copy-btn {
            height: 24px;
        }
    }
    .regular-check-element {
        .flex();
        .ivu-btn {
            .m-l(@gap);
        }
    }
}
</style>
