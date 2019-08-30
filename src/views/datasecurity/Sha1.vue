<template>
    <div class="v-encode-decode v-sha1">
        <Divider size="small" orientation="left">Sha1</Divider>
        <Input v-model="value" placeholder="输入内容..." />
        <div class="encode-result">
            <Divider size="small" orientation="left">Sha1结果</Divider>
            <div class="result-value">{{checkValue}}</div>
        </div>
    </div>
</template>

<script>
import { Input, Divider, Button } from 'iview';
import { sha1Check } from '@common/datasecurity';
export default {
    name: 'Sha1', // Sha1
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
            this.checkSha1Value();
        },
    },
    methods: {
        checkSha1Value() {
            this.checkValue = this.value ? sha1Check(this.value) : '';
        },
    },
};
</script>

<style scoped>

</style>
