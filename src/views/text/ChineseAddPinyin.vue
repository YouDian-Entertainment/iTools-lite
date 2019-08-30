<template>
    <div class="v-chinese-add-pinyin">
        <Divider size="small" orientation="left">汉字添加拼音</Divider>
        <Input class="value-box" v-model="textValue" type="textarea" placeholder="输入汉字" />
        <Button type="primary" @click="addSpellValue">添加拼音</Button>
        <Divider size="small" orientation="left">结果</Divider>
        <div class="add-value">
            <div class="chiness-spell-item" v-for="(item, i) in addValue" :key="i">
                <div class="spell-value">{{item.isEmpty ? '' : item.spell}}</div>
                <div class="chinese-value">{{item.chinese}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { Divider, Input, Button } from 'iview';
import { chineseAddPinyin } from '@common/pinyin';
export default {
    name: 'ChineseAddPinyin',
    components: {
        Divider,
        Input,
        Button,
    },
    data() {
        return {
            textValue: '',
            addValue: [],
        };
    },
    methods: {
        addSpellValue() {
            this.addValue = chineseAddPinyin(this.textValue);
        }
    },
};
</script>

<style lang="less" scoped>
.v-chinese-add-pinyin {
    .ivu-btn {
        .m-t(@gap);
    }
    .add-value {
        .flex();
        .chiness-spell-item {
            .flex-column-center();
            .m-h(3px);
            .spell-value {
                height: 20px;
                .font-size-sm();
            }
            .chinese-value {
                .font-size();
                height: 22px;
            }
        }
    }
}
</style>
