
<template>
    <div class="v-wechat-js-signature">
        <Divider size="small" orientation="left">签名生成规则如下</Divider>
        <div class="wechat-js-rule">
            <div class="rule-item">1.参与签名的字段包括有效的 jsapi_ticket（获取方式详见微信 JSSDK 文档）， noncestr （随机字符串，由开发者随机生成），timestamp （由开发者生成的当前时间戳）， url（当前网页的URL，不包含#及其后面部分。注意：对于没有只有域名没有 path 的 URL ，浏览器会自动加上 / 作为 path，如打开 http://qq.com 则获取到的 URL 为 http://qq.com/）。</div>
            <div class="rule-item">2.对所有待签名参数按照字段名的 ASCII 码<span class="text-bold">从小到大</span>排序（字典序）后，使用 URL 键值对的格式（即key1=value1&key2=value2…）拼接成字符串 string1。这里需要注意的是所有参数名均为<span class="text-bold">小写字符</span>。</div>
            <div class="rule-item">3.接下来对 string1 作 sha1 加密，字段名和字段值都采用原始值，<span class="text-bold">不进行URL 转义</span>。即 signature=sha1(string1)。</div>
        </div>
        <Divider size="small" orientation="left">生成签名</Divider>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
            <div class="js-param">
                <FormItem prop="ticket" label="jsapi_ticket">
                    <Input v-model="formValidate.ticket" clearable placeholder="jsapi_ticket" />
                </FormItem>
                <FormItem prop="noncestr" label="noncestr">
                    <Input v-model="formValidate.noncestr" clearable placeholder="noncestr" />
                </FormItem>
                <FormItem prop="timestamp" label="timestamp">
                    <Input v-model="formValidate.timestamp" clearable placeholder="timestamp" />
                </FormItem>
                <FormItem prop="url" label="url">
                    <Input v-model="formValidate.url" clearable placeholder="url" />
                </FormItem>
            </div>
            <FormItem class="v-btn-list">
                <Button type="primary" @click="handleSubmit('formValidate')">生成签名</Button>
                <Button type="error" @click="handleReset('formValidate')">清空</Button>
            </FormItem>
        </Form>
        <Divider v-if="signatureString" size="small" orientation="left">签名字符串</Divider>
        <div class="js-signature-string">{{signatureString}}</div>
        <Divider v-if="signature" size="small" orientation="left">签名(signature)</Divider>
        <div class="js-signature-value">{{signature}}</div>
    </div>
</template>

<script>
import { Button, Divider, Input, Form, FormItem, Row, Col } from 'iview';
import SHA1 from '@common/sha1';
import { TipWarning } from '@common/tip';
export default {
    name: 'WechatJsSignature',
    components: {
        Button,
        Divider,
        Input,
        FormItem,
        Form,
        Row,
        Col,
    },
    data() {
        return {
            formValidate: {
                ticket: '',
                noncestr: '',
                timestamp: '',
                url: '',
            },
            ruleValidate: {
                ticket: [
                    { required: true, message: 'ticket不能为空', trigger: 'blur' }
                ],
                noncestr: [
                    { required: true, message: 'noncestr不能为空', trigger: 'blur' }
                ],
                timestamp: [
                    { required: true, message: 'timestamp不能为空', trigger: 'blur' }
                ],
                url: [
                    { required: true, message: 'url不能为空', trigger: 'blur' }
                ],
            },
            signatureString: '',
            signature: '',
        };
    },
    methods: {
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.signatureString = this.getSignString();
                    this.signature = SHA1(this.signatureString);
                }
            });
        },
        handleReset(name) {
            this.$refs[name].resetFields();
            this.signatureString = '';
            this.signature = '';
        },
        getSignString() {
            return `jsapi_ticket=${this.formValidate.ticket.trim()}&noncestr=${this.formValidate.noncestr.trim()}&timestamp=${this.formValidate.timestamp.trim()}&url=${this.formValidate.url.trim()}`;
        },
    },
};
</script>

<style lang="less">
.v-wechat-js-signature {
    .wechat-js-rule {
        .rule-item {
            display: block;
            .font-size-sm();
        }
    }
    .js-param {
        .m-b(@gap-md);
        .param-title {
            .font-size();
            .m-v(@gap);
            color: @title-color;
        }
    }
    .js-signature-string {
        word-break: break-all;
    }
    .js-signature-value {
        color: @danger;
    }
}
</style>

