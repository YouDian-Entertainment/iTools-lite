<template>
    <MainLayout>
        <router-view />
    </MainLayout>
</template>

<script>
import 'iview/dist/styles/iview.css';
import '@styles/main';
import MainLayout from '@views/layout/MainLayout';
export default {
    name: 'index',
    components: {
        MainLayout,
    },
};
</script>
