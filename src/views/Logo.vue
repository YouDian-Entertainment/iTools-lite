<template>
    <div class="v-logo">
        <img class="logo" :src="logoSrc" alt="itools">
    </div>
</template>

<script>
import logoSrc from '@assets/logo.png';
export default {
    name: 'Logo', // logo
    data() {
        return {
            logoSrc,
        };
    },
};
</script>

<style lang="less">
.v-logo {
    height: 100px;
    .flex-row-center();
    .m-t(@gap-md);
    .logo {
        width: 60px;
        height: 60px;
    }
    &:after {
        content: '';
        display: block;
        width: 1px;
        height: 100%;
        background: #dcdee2;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        z-index: 1;
    }
}
</style>
