<template>
    <Card class="v-bucket-item">
        <template v-if="isAdd">
            <div class="add-el">
                <Icon @click.stop="clickAction" type="ios-add" size="30" />
                添加
            </div>
        </template>
        <template v-else>
            <Icon type="ios-trash-outline" @click.stop="delBucketItem" />
            <div class="bucket-nickname">{{itemInfo.nickname}}</div>
            <div class="bucket-name">Bucket: {{itemInfo.name}}</div>
            <div class="bucket-area">存储区域: {{areaValue}}</div>
            <!-- <div class="bucket-area">
                <Tag color="primary">Image</Tag>
                <Tag color="success">File</Tag>
            </div> -->
        </template>
    </Card>
</template>

<script>
import { Card, Icon, Tag } from 'iview';
import { QINIU_BUCKET_AREA } from '@constants/cdn';
import { delItem } from '@common/db';
import dbName from '@constants/db';
export default {
    name: 'BucketItem',
    components: {
        Card,
        Icon,
        Tag,
    },
    props: {
        type: {
            type: String,
            default: 'qiniu', // qiniu aliyun
        },
        isAdd: {
            type: Boolean,
            default: false,
        },
        itemInfo: {
            type: Object,
            default() {
                return {
                    _id: '',
                    nickname: '',
                    name: '',
                    area: '',
                    accessKey: '',
                    secretKey: '',
                };
            },
        },
    },
    computed: {
        areaValue() {
            const { area } = this.$props.itemInfo;
            return QINIU_BUCKET_AREA[area];
        },
    },
    methods: {
        clickAction() {
            this.$emit('addAction');
        },
        async delBucketItem() {
            const { _id } = this.$props.itemInfo;
            await delItem(dbName.qiniuBucket, _id);
            this.$emit('refresh');
        },
    },
};
</script>

<style lang="less">
.ivu-radio-wrapper-checked {
    .v-bucket-item {
        border-color: @primary;
        .m-b(@gap-md);
    }
}
.v-bucket-item {
    .m-b(@gap-md);
    width: 205px;
    height: 85px;
    &.ivu-card .ivu-card-body {
        .p(@gap);
        .flex-column();
    }
    .del-icon-style();
    .bucket-nickname {
        .font-size();
        color: @title-color;
    }
    .bucket-name,
    .bucket-area {
        .font-size-sm();
        color: @content-color;
    }
    .add-el {
        width: 100%;
        height: 65px;
        .flex-row-center();
    }
}
</style>
