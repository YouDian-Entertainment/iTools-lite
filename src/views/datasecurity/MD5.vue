<template>
    <div class="v-encode-decode v-md5">
        <Divider size="small" orientation="left">MD5</Divider>
        <Input v-model="value" placeholder="输入内容..." />
        <div class="encode-result">
            <Divider size="small" orientation="left">MD5结果</Divider>
            <div class="result-value">{{checkValue}}</div>
        </div>
    </div>
</template>

<script>
import { Input, Divider, Button } from 'iview';
import { md5Check } from '@common/datasecurity';
export default {
    name: 'MD5', // MD5
    components: {
        Input,
        Divider,
        Button,
    },
    data() {
        return {
            value: '',
            checkValue: '',
        };
    },
    watch: {
        value() {
            this.checkMd5Value();
        },
    },
    methods: {
        checkMd5Value() {
            this.checkValue = this.value ? md5Check(this.value) : '';
        },
    },
};
</script>

<style scoped>

</style>
