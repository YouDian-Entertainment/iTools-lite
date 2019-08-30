<template>
    <div class="v-qrcode">
        <Divider size="small" orientation="left">内容</Divider>
        <Input v-model="qrcodeValue" type="textarea" :rows="4" placeholder="输入要生成的文本、网址" />
        <Divider size="small" orientation="left">二维码</Divider>
        <canvas id="qrcode"></canvas>
        <Button type="primary" @click="openModal">保存二维码</Button>
        <template v-if="qrcodeList.length > 0">
            <Divider size="small" orientation="left">本地二维码</Divider>
            <Row class="local-qrcode-list">
                <Col :span="8" class="qrcode-item" v-for="item in qrcodeList" :key="item._id">
                    <div class="item-name text-overflow">{{item.name}}</div>
                    <img class="item-img" :src="item.url" />
                    <div class="item-del">
                        <Button type="success" @click="() => openDetailModal(item.url)">大图</Button>
                        <Button type="error" @click="() => delQrcodeItem(item._id)">删除</Button>
                    </div>
                </Col>
            </Row>
        </template>
        <Modal v-model="addModal" title="保存二维码" ok-text="保存" @on-ok="addQrcodeItem">
            <Input v-model="qrcodeName" placeholder="输入二维码名字" :maxlength="10" />
        </Modal>
        <Modal v-model="detailModal" class-name="detail-modal" :footer-hide="true" :width="350">
            <img class="detail-img" :src="detailValue" />
        </Modal>
    </div>
</template>

<script>
import { Input, Divider, Button, Modal, Row, Col } from 'iview';
import { addItem, getAllItems, delItem } from '@common/db';
import { TipError } from '@common/tip';
import QRCode from 'qrcode';
export default {
    name: 'Qrcode',
    components: {
        Input,
        Divider,
        Button,
        Modal,
        Row,
        Col,
    },
    watch: {
        qrcodeValue(val) {
            if (val) {
                this.createQrcode();
            }
        },
    },
    data() {
        return {
            qrcodeValue: '',
            addModal: false,
            qrcodeList: [],
            qrcodeName: '',
            detailModal: false,
            detailValue: '',
        };
    },
    async mounted() {
        await this.getHistoryList();
    },
    methods: {
        createQrcode() {
            const canvas = document.querySelector('#qrcode');
            if (canvas) {
                QRCode.toCanvas(canvas, this.qrcodeValue, {
                    errorCorrectionLevel: 'L',
                    margin: 1,
                    width: 280,
                }, function(err) {
                    if (err) console.log(err);
                    console.log('qrcode success');
                });
            }
        },
        openModal() {
            this.addModal = true;
        },
        async getHistoryList() {
            this.qrcodeList = await getAllItems('qrcode');
        },
        async addQrcodeItem() {
            if (!this.qrcodeName) {
                TipError('名字不能为空');
                return;
            }
            const url = await QRCode.toDataURL(this.qrcodeValue);
            await addItem('qrcode', {
                name: this.qrcodeName || this.qrcodeValue,
                url,
            });
            await this.getHistoryList();
        },
        async delQrcodeItem(id) {
            await delItem('qrcode', id);
            await this.getHistoryList();
        },
        openDetailModal(val) {
            this.detailValue = val;
            this.detailModal = true;
        },
    },
};
</script>

<style lang="less">
.v-qrcode {
    canvas {
        display: block;
        height: 280px;
    }
    .ivu-btn-primary,
    .ivu-btn-error {
        .m-t(@gap);
    }
    .local-qrcode-list {
        .qrcode-item {
            height: 210px;
            .flex-column-center();
            float: left;
            position: relative;
            border-radius: @border-radius;
            overflow: hidden;
            .item-name {
                height: 30px;
                .font-size();
            }
            .item-img {
                width: 160px;
            }
            .item-del {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: @mask-color;
                .flex-column-center();
                display: none;
            }
            &:hover {
                .item-del {
                    display: flex;
                }
            }
        }
    }
}
.detail-modal {
    .detail-img {
        width: 100%;
    }
}
</style>
