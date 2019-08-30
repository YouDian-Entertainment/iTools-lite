<template>
    <MouseRight :mouseData="mouseRightData" :mouseKey="listingItem._id">
        <div class="listing-item">
            <Checkbox :value="listingItem.state" @on-change="changeListingItemState"></Checkbox>
            <div class="item-value">{{listingItem.value}}</div>
            <Poptip class="item-priority" placement="left" trigger="hover">
                <Icon type="ios-flash-outline" v-if="priorityValue.length < 1" color="#c5c8ce" />
                <template v-else>
                    <Icon type="ios-flash" v-for="(item, i) in priorityValue" :color="item" :key="i" />
                </template>
                <div class="priority-list" slot="content">
                    <div class="priority-list-item" @click="() => changeListingItemPriority(0)">
                        <Icon type="ios-flash-outline" color="#c5c8ce" />
                        <div class="tip-el">无优先级</div>
                    </div>
                    <div class="priority-list-item" @click="() => changeListingItemPriority(1)">
                        <Icon type="ios-flash" color="#2db7f5" />
                        <div class="tip-el">低优先级</div>
                    </div>
                    <div class="priority-list-item" @click="() => changeListingItemPriority(2)">
                        <div class="icons">
                            <Icon type="ios-flash" color="#ff9900" />
                            <Icon type="ios-flash" color="#ff9900" />
                        </div>
                        <div class="tip-el">中优先级</div>
                    </div>
                    <div class="priority-list-item" @click="() => changeListingItemPriority(3)">
                        <div class="icons">
                            <Icon type="ios-flash" color="#ed4014" />
                            <Icon type="ios-flash" color="#ed4014" />
                            <Icon type="ios-flash" color="#ed4014" />
                        </div>
                        <div class="tip-el">高优先级</div>
                    </div>
                </div>
            </Poptip>
        </div>
    </MouseRight>
</template>

<script>
import { Checkbox, Icon, Poptip } from 'iview';
import { MouseRight } from '@components';
import { delItem, updateItem } from '@common/db';
import { listingItemPriority } from '@constants/listing';
import dbName from '@constants/db';
export default {
    name: 'ListingItem',
    components: {
        MouseRight,
        Checkbox,
        Icon,
        Poptip,
    },
    props: {
        listingItem: {
            type: Object,
            default() {
                return {
                    value: this.listingValue,
                    state: false,
                    priority: 0, // 优先级：0-默认 1-一级优先 2-二级优先 3-三级优先
                    data: new Date(),
                };
            },
        },
    },
    data() {
        return {
            mouseRightData: [{
                text: '删除',
                action: this.delListingItem,
            }],
        };
    },
    computed: {
        priorityValue() {
            const { priority } = this.$props.listingItem;
            return listingItemPriority[priority || 0];
        },
    },
    methods: {
        async delListingItem(id) {
            await delItem(dbName.list, id);
            this.$emit('refresh');
        },
        async changeListingItemState() {
            const item = this.$props.listingItem;
            await updateItem(dbName.list, {
                '_id': item._id,
            }, {
                state: !item.state,
            });
            this.$emit('refresh');
        },
        async changeListingItemPriority(val) {
            const item = this.$props.listingItem;
            await updateItem(dbName.list, {
                '_id': item._id,
            }, {
                priority: val,
            });
            this.$emit('refresh');
        },
    },
};
</script>

<style lang="less" scoped>
.listing-item {
    width: 100%;
    height: 40px;
    background-color: @white;
    border-radius: @border-radius;
    .p-h(@gap);
    .m-b(@gap-sm);
    .flex();
    align-items: center;
    position: relative;
    .item-priority {
        position: absolute;
        right: @gap;
        .priority-list {
            .flex();
            overflow: hidden;
            .priority-list-item {
                height: 50px;
                width: 60px;
                .flex-column-center();
                width: 55px;
                .tip-el {
                    .m-v(@gap-sm);
                    .font-size-mini();
                }
                .ivu-icon {
                    .m(0);
                }
                .icons {
                    .flex-row-center();
                    .ivu-icon {
                        .m-h(-4px);
                    }
                }
            }
        }
    }
    .ivu-icon {
        font-size: 18px;
        .m-h(-4px);
    }
}
</style>
