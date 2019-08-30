<template>
    <div class="v-encode-decode v-base64">
        <Divider size="small" orientation="left">Base64</Divider>
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
import { base64Encode, base64Decode } from '@common/datasecurity';
export default {
    name: 'Base64', // Base64
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
            this.encodeValue = base64Encode(this.value);
            this.decodeValue = '';
        },
        decode() {
            this.encodeValue = '';
            this.decodeValue = base64Decode(this.value);
        },
    },
};
</script>
