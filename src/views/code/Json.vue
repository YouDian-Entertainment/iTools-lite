<template>
    <div class="v-json">
        <Divider size="small" orientation="left">JSON数据</Divider>
        <Input class="value-box" v-model="jsonValue" type="textarea" :rows="8" placeholder="输入JSON数据" />
        <Button type="primary" @click="parseJsonData">格式化</Button>
        <Divider size="small" orientation="left">格式化数据</Divider>
        <VueJsonPretty
            v-if="prettyValue"
            :data="prettyValue"
            :path="path"
            :deep="deep"
            :show-double-quotes="showDoubleQuotes"
            :highlight-mouseover-node="highlightMouseoverNode"
            :highlight-selected-node="highlightSelectedNode"
            :show-length="showLength"
            :show-line="showLine"
            :selectable-type="selectableType"
            :show-select-controller="showSelectController"
        />
    </div>
</template>

<script>
import { Divider, Button, Input } from 'iview';
import VueJsonPretty from 'vue-json-pretty';
import { TipError } from '@common/tip';
export default {
    name: 'Json', // json 格式化
    components: {
        Divider,
        Input,
        Button,
        VueJsonPretty,
    },
    data() {
        return {
            jsonValue: '',
            prettyValue: '',
            selectableType: 'single',
            showSelectController: false,
            showLength: true,
            showLine: true,
            showDoubleQuotes: true,
            highlightMouseoverNode: true,
            highlightSelectedNode: true,
            selectOnClickNode: true,
            path: 'data',
            deep: 3,
        };
    },
    methods: {
        parseJsonData() {
            try {
                this.prettyValue = JSON.parse(this.jsonValue);
            } catch (error) {
                this.prettyValue = '';
                TipError('内容不是正确的json数据');
            }
        },
    },
};
</script>

<style lang="less" scoped>
.v-json {
    .ivu-btn {
        .m-t(@gap);
    }
}
</style>

