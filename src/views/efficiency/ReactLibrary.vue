<template>
    <div class="v-react-library v-markdown" v-html="content"></div>
</template>

<script>
import { loadMarkdownFile } from '@common/utils';
export default {
    name: 'ReactLibrary', // React 常用类库推荐
    data() {
        return {
            content: loadMarkdownFile('reactlibrary'),
        };
    },
};
</script>

<style lang="less" scoped>

</style>
