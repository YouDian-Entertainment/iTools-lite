<template>
    <div class="v-encode-decode v-url">
        <Divider size="small" orientation="left">Url</Divider>
        <Input v-model="value" placeholder="输入内容..." />
        <div class="v-btn-list">
            <Button type="primary" @click="encode">加密</Button>
            <Button type="primary" @click="decode">解密</Button>
        </div>
        <div v-if="encodeValue" class="encode-result">
            <Divider size="small" orientation="left">加密结果</Divider>
            <div class="result-value">{{encodeValue}}</div>
        </div>
        <div v-if="decodeValue" class="decode-result">
            <Divider size="small" orientation="left">解密结果</Divider>
            <div class="result-value">{{decodeValue}}</div>
        </div>
    </div>
</template>

<script>
import { Input, Divider, Button } from 'iview';
import { TipError } from '@common/tip';
export default {
    name: 'Url', // url
    components: {
        Input,
        Divider,
        Button,
    },
    data() {
        return {
            value: '',
            encodeValue: '',
            decodeValue: '',
        };
    },
    methods: {
        encode() {
            if (this.urlReg()) {
                this.encodeValue = encodeURIComponent(this.value);
                this.decodeValue = '';
            }
        },
        decode() {
            this.encodeValue = '';
            this.decodeValue = decodeURIComponent(this.value);
        },
        urlReg() {
            const reg = /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/g;
            const flag = reg.test(this.value);
            if (!flag) {
                TipError('不是正确的url地址');
            }
            return flag;
        },
    },
};
</script>

<style scoped>

</style>
