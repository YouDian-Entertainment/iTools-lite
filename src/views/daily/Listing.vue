<template>
    <div class="v-listing">
        <Input v-model="listingValue" @on-enter="addListingItem" placeholder="添加任务到清单" />
        <template v-if="listArray.length === 0">
            <Empty type="list" tip="还没有清单任务，赶紧添加~~" />
        </template>
        <template v-if="unfinished.length > 0">
            <Divider orientation="left" size="small">未完成</Divider>
            <div class="listing-unfinished-list">
                <ListingItem v-for="item in unfinished" :listingItem="item" :key="item._id" @refresh="getAllListItems" />
            </div>
        </template>
        <template v-if="finished.length > 0">
            <Divider orientation="left" size="small">已完成</Divider>
            <div class="listing-finished-list">
                <ListingItem v-for="item in finished" :listingItem="item" :key="item._id" @refresh="getAllListItems" />
            </div>
        </template>
    </div>
</template>

<script>
import { Button, Input, Checkbox, Divider } from 'iview';
import { MouseRight, Empty } from '@components';
import { addItem, getAllItems } from '@common/db';
import dbName from '@constants/db';
import ListingItem from '@views/components/ListingItem';
export default {
    name: 'Listing', // 清单
    components: {
        Button,
        Input,
        Checkbox,
        Divider,
        MouseRight,
        ListingItem,
        Empty,
    },
    async mounted() {
        await this.getAllListItems();
    },
    data() {
        return {
            listingValue: '',
            listArray: [],
            finished: [],
            unfinished: [],
            mouseRightData: [{
                text: '删除',
                action: this.delListingItem,
            }],
        };
    },
    methods: {
        async getAllListItems() {
            this.listArray = await getAllItems(dbName.list);
            this.dealDataBase();
        },
        async addListingItem() {
            await addItem(dbName.list, {
                value: this.listingValue,
                state: false,
                priority: 0, // 优先级：0-默认 1-一级优先 2-二级优先 3-三级优先
                data: new Date(),
            });
            this.listingValue = '';
            await this.getAllListItems();
        },
        dealDataBase() {
            let unfinished = [];
            let finished = [];
            (this.listArray || []).forEach(item => {
                if (item.state) {
                    finished.push(item);
                } else {
                    unfinished.push(item);
                }
            });
            this.finished = finished;
            this.unfinished = unfinished;
        },
    },
};
</script>

<style lang="less" scoped>
.v-listing {
    .listing-unfinished-list {
        .m-t(@gap);
    }
}
</style>
