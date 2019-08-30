<template>
    <Modal v-model="visiable" title="新增Bucket" ok-text="添加" @on-cancel="close" :footer-hide="true">
        <Form ref="form" :model="formItem" :rules="formRule" :label-width="100">
            <FormItem label="Bucket别名" prop="nickname">
                <Input v-model="formItem.nickname" placeholder="输入别名，方便后续选择"></Input>
            </FormItem>
            <FormItem label="Bucket" prop="name">
                <Input v-model="formItem.name" placeholder="输入bucket的名字"></Input>
            </FormItem>
            <FormItem label="存储区域" prop="area">
                <RadioGroup v-model="formItem.area">
                    <Radio v-for="item in bucketAreaList" :key="item.value" :label="item.value">{{item.text}}</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="accessKey" prop="accessKey">
                <Input v-model="formItem.accessKey" placeholder="输入accessKey"></Input>
            </FormItem>
            <FormItem label="secretKey" prop="secretKey">
                <Input v-model="formItem.secretKey" placeholder="输入secretKey"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="addItemAction">添加</Button>
                <Button @click="close">取消</Button>
            </FormItem>
        </Form>
    </Modal>
</template>

<script>
import { Modal, FormItem, Form, RadioGroup, Radio, Button, Input } from 'iview';
import { bucketArea } from '@constants/cdn';
export default {
    name: 'AddBucketItemModal',
    components: {
        Modal,
        Form,
        FormItem,
        RadioGroup,
        Radio,
        Button,
        Input,
    },
    props: {
        type: {
            type: String,
            default: 'qiniu', // qiniu aliyun
        },
    },
    computed: {
        bucketAreaList() {
            const { type } = this.$props;
            return bucketArea[type];
        },
    },
    data() {
        return {
            bucketArea,
            visiable: false,
            formItem: {
                nickname: '',
                name: '',
                area: '',
                accessKey: '',
                secretKey: '',
            },
            formRule: {
                nickname: [
                    { required: true, message: '昵称不能为空', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: 'Bucket名字不能为空', trigger: 'blur' }
                ],
                area: [
                    { required: true, message: 'Bucket名字不能为空', trigger: 'blur' }
                ],
                accessKey: [
                    { required: true, message: 'accessKey不能为空', trigger: 'blur' }
                ],
                secretKey: [
                    { required: true, message: 'secretKey不能为空', trigger: 'blur' }
                ],
            }
        };
    },
    methods: {
        show() {
            this.visiable = true;
        },
        close() {
            // 初始化状态和表单
            this.visiable = false;
            this.$refs['form'].resetFields();
        },
        addItemAction() {
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    console.log('当前的参数为：', JSON.stringify(this.formItem));
                    this.$emit('addAction', this.formItem);
                    this.close();
                }
            });
        },
    },
};
</script>

<style lang="scss" scoped>

</style>
