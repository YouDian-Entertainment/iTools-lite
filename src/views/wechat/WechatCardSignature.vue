<template>
    <div class="v-wechat-card-signature">
        <Divider size="small" orientation="left">签名生成规则如下</Divider>
        <div class="wechat-card-rule">
            <div class="rule-item">1.将所有参数的value值进行字符串的字典序排序</div>
            <div class="rule-item">2.将所有参数字符串拼接成一个字符串进行sha1加密，得到signature</div>
            <div class="rule-item">3.自定义code (勾选请确认创建接口中use_custom_code填写为true)</div>
            <div class="rule-item">4.指定用户领取 (勾选请确认创建接口中bind_openid填写为true)</div>
        </div>
        <Divider size="small" orientation="left">生成签名</Divider>
        <div class="js-param">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
                <FormItem label="类型">
                    <RadioGroup class="sign-type-value" v-model="signType" @on-change="handleReset('formValidate')">
                        <Radio label="bacthAddCard">添加到卡包JSAPI（bacthAddCard）</Radio>
                        <Radio label="chooseCard">拉起卡劵列表JSAPI（chooseCard）</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem prop="ticket" label="api_ticket">
                    <Input v-model="formValidate.ticket" clearable placeholder="api_ticket" />
                </FormItem>
                <Row v-if="signType === 'chooseCard'" :gutter="10">
                    <Col span="12">
                        <FormItem prop="appId" label="app_id">
                            <Input v-model="formValidate.appId" clearable placeholder="app_id" />
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem prop="locationId" label="location_id">
                            <Input v-model="formValidate.locationId" clearable placeholder="location_id" />
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="10">
                    <Col span="12">
                        <FormItem prop="timestamp" label="timestamp">
                            <Input v-model="formValidate.timestamp" clearable placeholder="timestamp" />
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem prop="noncestr" label="nonce_str">
                            <Input v-model="formValidate.noncestr" clearable placeholder="noncestr" />
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="10">
                    <Col span="12">
                        <FormItem prop="cardId" label="card_id">
                            <Input v-model="formValidate.cardId" clearable placeholder="card_id" />
                        </FormItem>
                    </Col>
                    <Col v-if="signType === 'chooseCard'" span="12">
                        <FormItem prop="cardType" label="card_type">
                            <Input v-model="formValidate.cardType" clearable placeholder="card_type" />
                        </FormItem>
                    </Col>
                </Row>
                <div v-if="signType === 'bacthAddCard'" class="extra-param">
                    <FormItem label="额外参数">
                        <Checkbox v-model="isCode">自定义code</Checkbox>
                        <Checkbox v-model="isOpenid">指定用户领取</Checkbox>
                        <Checkbox v-model="isBalance">红包类型卡券</Checkbox>
                    </FormItem>
                    <Row v-if="isCode || isOpenid || isBalance" :gutter="10" class="extra-param-input">
                        <Col v-if="isCode" span="12" class="extra-param-item">
                            <FormItem prop="code" label="code">
                                <Input v-model="formValidate.code" clearable placeholder="code" />
                            </FormItem>
                        </Col>
                        <Col v-if="isOpenid" span="12" class="extra-param-item">
                            <FormItem prop="openid" label="openid">
                                <Input v-model="formValidate.openid" clearable placeholder="openid" />
                            </FormItem>
                        </Col>
                        <Col v-if="isBalance" span="12" class="extra-param-item">
                            <FormItem prop="balance" label="balance">
                                <Input v-model="formValidate.balance" clearable placeholder="balance" />
                            </FormItem>
                        </Col>
                    </Row>
                </div>
                <FormItem class="v-btn-list">
                    <Button type="primary"  @click="handleSubmit('formValidate')">生成签名</Button>
                    <Button type="error" @click="handleReset('formValidate')">清空</Button>
                </FormItem>
            </Form>
        </div>
        <Divider v-if="signatureString" size="small" orientation="left">签名字符串</Divider>
        <div class="js-signature-string">{{signatureString}}</div>
        <Divider v-if="signature" size="small" orientation="left">签名(signature)</Divider>
        <div class="js-signature-value">{{signature}}</div>
    </div>
</template>

<script>
import { Button, Divider, Input, Checkbox, RadioGroup, Radio, Row, Col, Form, FormItem } from 'iview';
import SHA1 from '@common/sha1';
export default {
    name: 'WechatCardSignature',
    components: {
        Button,
        Divider,
        Input,
        Checkbox,
        Radio,
        RadioGroup,
        Row,
        Col,
        Form,
        FormItem,
    },
    data() {
        return {
            isCode: false,
            isOpenid: false,
            isBalance: false,
            signature: '',
            signatureString: '',
            signType: 'bacthAddCard',
            formValidate: {
                code: '',
                openid: '',
                balance: '',
                ticket: '',
                timestamp: '',
                noncestr: '',
                cardId: '',
                appId: '',
                locationId: '',
                cardType: '',
            },
            ruleValidate: {
                code: [
                    { required: true, message: 'code不能为空', trigger: 'blur' }
                ],
                openid: [
                    { required: true, message: 'openid不能为空', trigger: 'blur' }
                ],
                balance: [
                    { required: true, message: 'balance不能为空', trigger: 'blur' }
                ],
                ticket: [
                    { required: true, message: 'api_ticket不能为空', trigger: 'blur' }
                ],
                noncestr: [
                    { required: true, message: 'nonce_str不能为空', trigger: 'blur' }
                ],
                timestamp: [
                    { required: true, message: 'timestamp不能为空', trigger: 'blur' }
                ],
                cardId: [
                    { required: true, message: 'card_id不能为空', trigger: 'blur' }
                ],
                appId: [
                    { required: true, message: 'app_id不能为空', trigger: 'blur' }
                ],
                locationId: [
                    { required: true, message: 'location_id不能为空', trigger: 'blur' }
                ],
                cardType: [
                    { required: true, message: 'card_type不能为空', trigger: 'blur' }
                ],
            },
        };
    },
    methods: {
        createSign() {},
        getParamsValue() {
            const arr = [];
            if (this.signType === 'bacthAddCard') {
                const items = ['ticket', 'timestamp', 'noncestr', 'cardId', 'locationId'];
                items.forEach(item => arr.push(`${this.formValidate[item]}`));
                this.isCode && arr.push(`${this.formValidate.code}`);
                this.isOpenid && arr.push(`${this.formValidate.openid}`);
                this.isBalance && arr.push(`${this.formValidate.balance}`);
                return arr.sort((a, b) => a >= b).join('');
            } else {
                const items = ['ticket', 'timestamp', 'noncestr', 'cardId', 'appId', 'locationId', 'cardType'];
                items.forEach(item => arr.push(this.formValidate[item]));
                return arr.sort((a, b) => a >= b).join('');
            }
        },
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.signatureString = this.getParamsValue();
                    this.signature = SHA1(this.getParamsValue());
                }
            });
        },
        handleReset(name) {
            this.$refs[name].resetFields();
            this.signature = '';
            this.signatureString = '';
        },
    },
};
</script>

<style lang="less">
.v-wechat-card-signature {
    .wechat-card-rule {
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
