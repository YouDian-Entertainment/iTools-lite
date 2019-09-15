<template>
    <div class="v-contact-auth">
        <div class="auth-info">
            <img src="@assets/avatar.jpeg" alt="" class="auth-avatar">
            <div class="auth-base-info">
                <div class="auth-name">康兵奎</div>
                <div class="auth-detail">
                    <div class="auth-post"><Icon type="ios-briefcase-outline" />前端开发工程师</div>
                    <div class="auth-nickname"><Icon type="ios-contact-outline" />无聊小码农</div>
                    <div class="auth-homepage"><Icon type="ios-planet-outline" />https://uiseed.cn</div>
                </div>
                <div class="auth-desc">梦想始终是要有的，万一哪天天上掉馅儿饼，砸着自己可咋办！</div>
                <div class="auth-tag">
                    <Tag color="blue">Vue</Tag>
                    <Tag color="blue">React</Tag>
                    <Tag color="blue">NodeJs</Tag>
                    <Tag color="blue">Python</Tag>
                </div>
            </div>
        </div>
        <Divider size="small" orientation="left">联系方式</Divider>
        <div class="contact-type-list">
            <div class="contact-type-item">
                <img src="@assets/wechat.png" alt="" class="contact-type-qrcode">
                <div class="contact-type-name">微信</div>
            </div>
            <div class="contact-type-item">
                <img src="@assets/qq.png" alt="" class="contact-type-qrcode">
                <div class="contact-type-name">QQ</div>
            </div>
            <div class="contact-type-item">
                <img src="@assets/miniprogram.jpg" alt="" class="contact-type-qrcode">
                <div class="contact-type-name">小程序</div>
            </div>
            <div class="contact-type-item">
                <img src="@assets/public.jpg" alt="" class="contact-type-qrcode">
                <div class="contact-type-name">公众号</div>
            </div>
        </div>
        <div class="tip-info">Tip: 添加好友注明来自-iTools</div>
        <Divider size="small" orientation="left">其他</Divider>
        <Link
            :logo="JuejinLogo"
            text="掘金"
            link="https://juejin.im/user/57b7e805165abd0054b90cfc"
        />
        <Link
            :logo="GithubLogo"
            text="GitHub"
            link="https://github.com/BingKui"
        />
    </div>
</template>

<script>
import { Divider, Tag, Icon } from 'iview';
import Link from '@components/Link';
import JuejinLogo from '@assets/svg/juejin.svg';
import GithubLogo from '@assets/svg/github.svg';
export default {
    name: 'Contact', // 联系作者
    components: {
        Divider,
        Tag,
        Link,
        Icon,
    },
    data() {
        return {
            JuejinLogo,
            GithubLogo,
        };
    },
};
</script>

<style lang="less">
.v-contact-auth {
    .auth-info {
        .flex-column-center();
        .auth-avatar {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            .m(@gap-md);
        }
        .auth-base-info {
            .flex-column-center();
            .auth-name {
                .font-size(22px);
                font-weight: bold;
            }
            .auth-detail {
                .m-v(@gap-sm);
                .flex-row-center();
                .font-size();
                .ivu-icon {
                    .m-r(3px);
                }
                .auth-post {
                    .m-r(@gap);
                }
                .auth-nickname,
                .auth-homepage {
                    .m-r(@gap);
                    .ivu-icon {
                        font-size: 16px;
                    }
                }
            }
            .auth-desc {
                .m-b(@gap);
                color: @tip-color;
            }
        }
    }
    .contact-type-list {
        .flex();
        .contact-type-item {
            flex: 1;
            .p(@gap-md);
            .flex-column-center();
            .contact-type-qrcode {
                width: 100%;
            }
        }
    }
    .tip-info {
        .m-l(@gap-md);
        color: @tip-color;
    }
}
</style>
