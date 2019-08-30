<template>
    <Card class="board-item">
        <Icon class="item-del-icon" type="ios-trash-outline" @click="delBoardItem" />
        <div class="item-name">{{boardItem.name}}</div>
        <div class="item-detail">{{boardItem.detail}}</div>
        <div class="item-tag">
            <Tag v-for="tag in tagValues" :color="tag.color" :key="tag.key">{{tag.name}}</Tag>
        </div>
    </Card>
</template>

<script>
import { Card, Tag, Icon } from 'iview';
import { delItem } from '@common/db';
import { boardTags } from '@constants/board';
import dbName from '@constants/db';
export default {
    name: 'BoardItem',
    components: {
        Tag,
        Card,
        Icon,
    },
    props: {
        boardItem: {
            type: Object,
            default() {
                return {
                    name: '',
                    detail: '',
                    state: 0,
                    tag: [],
                    index: 0,
                    _id: '',
                };
            },
        },
    },
    computed: {
        tagValues() {
            const { tag } = this.$props.boardItem;
            let arr = [];
            tag.forEach(item => {
                arr = arr.concat(boardTags.filter(i => i.key === item));
            });
            return arr;
        },
    },
    methods: {
        async delBoardItem() {
            await delItem(dbName.board, this.$props.boardItem._id);
            this.$emit('refresh');
        },
    },
};
</script>

<style lang="less">
.board-item {
    .m-b(@gap-sm);
    height: 110px;
    .ivu-card-body {
        .p(@gap);
        .flex-column();
        justify-content: space-around;
        height: 100%;
        .del-icon-style();
        .item-name {
            .font-size();
            color: @title-color;
        }
        .item-detail {
            .font-size-sm();
            color: @tip-color;
            flex: 1;
            .text-overflow-line(2);
        }
    }
}
</style>
