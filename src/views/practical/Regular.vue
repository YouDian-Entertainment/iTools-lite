<template>
    <div class="v-regular">
        <!-- <Divider size="small" orientation="left">生成正则表达式</Divider>
        规则
        <CheckboxGroup v-model="createGroup">
            <Checkbox label="香蕉"></Checkbox>
            <Checkbox label="苹果"></Checkbox>
            <Checkbox label="西瓜"></Checkbox>
        </CheckboxGroup>
        <Button type="primary">生成</Button> -->
        <Divider size="small" orientation="left">正则大全</Divider>
        <div class="regular-total">
            <Input v-model="regularName" placeholder="输入正则名称" />
            <div class="regular-list">
                <RegularItem v-for="item in regularList" :key="item.title" :itemInfo="item" />
            </div>
        </div>
        <!-- <Divider size="small" orientation="left">正则匹配校验</Divider> -->
        <!-- <div class="v-regular-file v-markdown" v-html="content"></div> -->
    </div>
</template>

<script>
import { Divider, CheckboxGroup, Checkbox, Button, Input } from 'iview';
// import { loadMarkdownFile } from '@common/utils';
import { dealRegularSearch } from '@common/regular';
import { REGULAR_LIST } from '@constants/regular';
import RegularItem from '../components/RegularItem';
export default {
    name: 'Regular',
    components: {
        Divider,
        Checkbox,
        CheckboxGroup,
        Button,
        Input,
        RegularItem,
    },
    data() {
        return {
            // content: loadMarkdownFile('regular'),
            createGroup: [],
            regularName: '',
        };
    },
    computed: {
        regularList() {
            return dealRegularSearch(REGULAR_LIST, this.regularName);
        },
    },
};
</script>

<style lang="less">
.v-regular {
    .regular-total {
        .regular-list {
            .m-t(@gap);
        }
    }
}
</style>
