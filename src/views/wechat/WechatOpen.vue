<template>
    <div class="v-wechat-open">
        <Divider size="small" orientation="left">接口调试</Divider>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
            <FormItem label="接口类型">
                <Select v-model="interfaceType">
                    <Option v-for="item in wechatOpenInterfaceType" :value="item.value" :key="item.value">{{ item.text }}</Option>
                </Select>
            </FormItem>
            <FormItem label="接口列表">
                <Select v-model="selectInterfaceApi">
                    <Option v-for="item in interfaceList" :value="item.value" :key="item.value">{{ item.text }}</Option>
                </Select>
            </FormItem>
            <FormItem v-for="item in interfaceApiArgs" :label="item.name" :prop="item.name" :key="item.name">
                <Input v-model="formValidate[item.name]" :placeholder="item.tips"></Input>
            </FormItem>
            <FormItem class="v-btn-list">
                <Button type="primary" @click="handleSubmit('formValidate')">生成Sign</Button>
                <Button type="error" @click="handleReset('formValidate')">清空</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
import { Divider, Input, Button, Select, Option, Form, FormItem } from 'iview';
import { wechatOpenInterfaceConfig } from '@constants/enmu';
import wechatOpenInterfaceType from '@constants/wechat';
export default {
    name: 'WechatOpen',
    components: {
        Divider,
        Input,
        Button,
        Select,
        Option,
        Form,
        FormItem
    },
    data() {
        return {
            wechatOpenInterfaceType,
            interfaceType: '',
            interfaceList: [],
            selectInterfaceApi: '',
            interfaceApiArgs: [],
            formValidate: {},
            ruleValidate: {},
        };
    },
    mounted() {
        this.interfaceType = wechatOpenInterfaceType[0].value;
    },
    watch: {
        interfaceType(val) {
            this.interfaceList = wechatOpenInterfaceType.filter(item => item.value === val)[0].apiList || [];
            this.selectInterfaceApi = this.interfaceList[0].value || '';
        },
        selectInterfaceApi(val) {
            const _arr = this.interfaceList.filter(item => item.value === val)[0].args || [];
            this.interfaceApiArgs = _arr;
            for (let i = 0; i < _arr.length; i++) {
                this.formValidate[_arr[i].name] = '';
            }
        },
    },
    methods: {
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    //
                    console.log(this.formValidate);
                }
            });
        },
        handleReset(name) {
            this.$refs[name].resetFields();
        },
    },
};
</script>

<style scoped>

</style>
