<template>
    <div class="v-welcome">
        <div class="hello-text">感谢使用 iTools 工具集！</div>
        <img class="hello-img" :src="welcomeSrc" alt="">
        <!-- <div class="hello-tip">
            使用过程中有任何问题都可以给我反馈，或者有什么需要的功能也可以提出来，我会在后续功能添加上慢慢添加。
        </div> -->

        <!-- <Button>意见反馈</Button> -->
    </div>
</template>

<script>
import { openFile } from '@common/electron';
import { Button } from 'iview';
import welcomeSrc from '@assets/svg/welcome.svg';
export default {
    name: 'Welcome',
    components: {
        Button,
    },
    data() {
        return {
            welcomeSrc,
        };
    },
};
</script>

<style lang="less">
.v-welcome {
    height: calc(100vh - 40px);
    .flex-column-center();
    .hello-text {
        .font-size(20);
    }
    .hello-img {
        width: 300px;
        .m-v(20px);
    }
}
</style>

