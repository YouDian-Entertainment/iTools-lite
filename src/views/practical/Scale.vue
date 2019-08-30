<template>
    <div class="v-scale">
        <Divider size="small" orientation="left">进制转换</Divider>
        <Row class="scale-type">
            <Col span="10">
                <Select v-model="firstType">
                    <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.text }}</Option>
                </Select>
            </Col>
            <Col span="4" class="type-tip">转换为</Col>
            <Col span="10">
                <Select v-model="secondType">
                    <template v-for="item in typeList">
                        <Option v-if="item.value !== firstType" :value="item.value" :key="item.value">{{ item.text }}</Option>
                    </template>
                </Select>
            </Col>
        </Row>
        <Input v-model="normalValue" placeholder="原始值" @on-change="binaryChange" @on-keydown="binaryKeyDown"></Input>
        <Divider size="small" orientation="left">结果</Divider>
        <div class="scale-result">{{resultValue}}</div>
    </div>
</template>

<script>
import { Divider, Input, Select, Option, Row, Col } from 'iview';
import scaleTypeToFunction from '@common/scale';
export default {
    name: 'Scale', // 进制转换
    components: {
        Divider,
        Input,
        Select,
        Option,
        Row,
        Col,
    },
    data() {
        return {
            typeList: [
                {value: 'binary', text: '二进制'},
                {value: 'quaternary', text: '四进制'},
                {value: 'octal', text: '八进制'},
                {value: 'integer', text: '十进制'},
                {value: 'hex', text: '十六进制'},
                {value: 'thirtyBinary', text: '三十二进制'},
            ],
            firstType: 'binary',
            secondType: 'integer',
            normalValue: '',
            resultValue: '',
        };
    },
    watch: {
        // binary(val, oldVal) {
        //     const reg = new RegExp('^[+\\-]?[0-1]*[.]?[0-1]*$', 'gi');
        //     const _val = val.match(reg);
        //     if (_val) {
        //         this.integer = binaryToInteger(_val[0]);
        //     }
        // },
        normalValue() {
            this.scaleNormalToResult();
        },
        firstType() {
            this.scaleNormalToResult();
        },
        secondType() {
            this.scaleNormalToResult();
        },
    },
    methods: {
        binaryChange(e) {
            console.log(e.data);
            return false;
        },
        binaryKeyDown(e) {
            console.log(e.key);
            return false;
        },
        scaleNormalToResult() {
            if (this.normalValue) {
                const type = `${this.firstType}=>${this.secondType}`;
                for (let i = 0; i < scaleTypeToFunction.length; i++) {
                    const item = scaleTypeToFunction[i];
                    if (item.type === type) {
                        this.resultValue = item.func(this.normalValue);
                        break;
                    }
                }
            }
        },
    },
};
</script>

<style lang="less">
.v-scale {
    .scale-type {
        .m-b(@gap-md);
        .type-tip {
            .font-size();
            .flex-row-center();
            height: 32px;
        }
    }
}
</style>

