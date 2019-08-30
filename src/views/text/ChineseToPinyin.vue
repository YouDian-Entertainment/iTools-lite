<template>
    <div class="v-chinese-to-pinyin">
        <Divider size="small" orientation="left">汉字转换拼音</Divider>
        <Input class="value-box" v-model="textValue" type="textarea" placeholder="输入汉字" />
        <Button type="primary" @click="transformValue">转化为拼音</Button>
        <Divider size="small" orientation="left">结果</Divider>
        <div class="spell-value">{{spellValue}}</div>
    </div>
</template>

<script>
import { Divider, Input, Button } from 'iview';
import { chineseToPinyin } from '@common/pinyin';
export default {
    name: 'ChineseToPinyin',
    components: {
        Divider,
        Input,
        Button,
    },
    data() {
        return {
            textValue: '',
            spellValue: '',
        };
    },
    methods: {
        transformValue() {
            this.spellValue = chineseToPinyin(this.textValue);
        }
    },
};
</script>

<style lang="less" scoped>
.v-chinese-to-pinyin {
    .ivu-btn {
        .m-t(@gap);
    }
}
</style>
