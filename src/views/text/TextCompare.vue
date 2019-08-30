<template>
    <div class="v-text-compare">
        <Divider size="small" orientation="left">比较文本</Divider>
        <RadioGroup class="compare-type" v-model="selectType" @on-change="typeChange">
            <Radio v-for="item in compareType" :label="item.type" :key="item.type">{{item.value}}</Radio>
        </RadioGroup>
        <div class="text-value">
            <Input class="value-box" v-model="originalValue" type="textarea" placeholder="输入原始文本" />
            <Input class="value-box" v-model="compareValue" type="textarea" placeholder="输入比较文本" />
        </div>
        <Button type="primary" @click="diffText">开始比较</Button>
        <Divider size="small" orientation="left">结果</Divider>
        <div class="compare-result">
            <div v-for="(item, i) in compareResult" :key="i" :class="`${item.added ? 'is-add' : ''} ${item.removed ? 'is-remove' : ''}`" v-html="htmlValue(item.value)"></div>
        </div>
    </div>
</template>

<script>
import { Input, Divider, Button, Radio, RadioGroup } from 'iview';
import { compareType } from '@constants/enmu';
import compareText, { dealTextToHtmlText } from '@common/textcompare';
import logger from '@common/logger';
export default {
    name: 'TextCompare',
    components: {
        Input,
        Divider,
        Button,
        Radio,
        RadioGroup,
    },
    mounted() {
        this.selectType = compareType[0].type;
    },
    computed: {
        htmlValue() {
            return (val) => {
                return dealTextToHtmlText(val);
            };
        },
    },
    data() {
        return {
            originalValue: '',
            compareValue: '',
            selectType: '',
            compareType,
            compareResult: [],
        };
    },
    methods: {
        diffText() {
            const result = compareText(this.originalValue, this.compareValue, this.selectType);
            this.compareResult = result;
        },
        typeChange(val) {
            console.log(val);
        },
    },
};
</script>

<style lang="less">
.v-text-compare {
    .compare-type {
        .m-b(@gap-md);
    }
    .text-value {
        .flex();
        .m-b(@gap-md);
        .value-box {
            height: 500px;
            textarea {
                resize: none;
                height: 100%;
            }
            &:last-child {
                .m-l(@gap-md);
            }
        }
    }
    .compare-result {
        .is-add {
            color: @success;
        }
        .is-remove {
            color: @red;
        }
    }
}
</style>

