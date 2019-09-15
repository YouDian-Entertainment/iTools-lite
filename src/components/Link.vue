<template>
    <Card class="v-link">
        <div class="link-content" @click.stop="open">
            <img class="link-icon" v-if="logo" :src="logo" alt="">
            <div class="link-text">{{text}}</div>
        </div>
    </Card>
</template>

<script>
import { Card } from 'iview';
import { openLink } from '@common/utils';
export default {
    name: 'Link', // 站外链接，浏览器打开
    components: {
        Card,
    },
    props: {
        logo: {
            type: String,
            default: '',
        },
        link: String,
        text: String,
    },
    methods: {
        async open() {
            console.log('sssss');
            await openLink(this.$props.link);
        },
    },
};
</script>

<style lang="less">
.v-link {
    width: 100px;
    cursor: pointer;
    display: inline-block;
    .link-content {
        .flex-column-center();
    }
    .link-icon {
        width: 38px;
        height: 38px;
        .m-b(@gap);
    }
    .link-text {
        .font-size();
        color: @text-color;
    }
}
</style>
