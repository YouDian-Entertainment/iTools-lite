<template>
    <div class="v-board">
        <Row :gutter="10" class="v-board-container">
            <Col span="8">
                <div class="board-group-item">
                    <div class="group-name">未开始</div>
                    <div class="group-content">
                        <ScrollBar class="border-list add-container">
                            <Container
                                group-name="col"
                                @drop="(e) => dragBordItem(0, e)"
                                drag-class="card-ghost"
                                drop-class="card-ghost-drop"
                                :get-child-payload="getItemData(unfinished)"
                                :drop-placeholder="dropPlaceholderOptions"
                            >
                                <Draggable v-for="item in unfinished" :key="item._id">
                                    <BoardItem :boardItem="item" @refresh="getAllBorderListItems" />
                                </Draggable>
                            </Container>
                        </ScrollBar>
                        <div class="add-item-btn">
                            <Button @click="() => this.addModal = true">添加</Button>
                        </div>
                    </div>
                </div>
            </Col>
            <Col span="8">
                <div class="board-group-item">
                    <div class="group-name">进行中</div>
                    <div class="group-content">
                        <ScrollBar class="border-list">
                            <Container
                                group-name="col"
                                @drop="(e) => dragBordItem(1, e)"
                                drag-class="card-ghost"
                                drop-class="card-ghost-drop"
                                :get-child-payload="getItemData(working)"
                                :drop-placeholder="dropPlaceholderOptions"
                            >
                                <Draggable v-for="item in working" :key="item._id">
                                    <BoardItem :boardItem="item" @refresh="getAllBorderListItems" />
                                </Draggable>
                            </Container>
                        </ScrollBar>
                    </div>
                </div>
            </Col>
            <Col span="8">
                <div class="board-group-item">
                    <div class="group-name">已完成</div>
                    <div class="group-content">
                        <ScrollBar class="border-list">
                            <Container
                                group-name="col"
                                @drop="(e) => dragBordItem(2, e)"
                                drag-class="card-ghost"
                                drop-class="card-ghost-drop"
                                :get-child-payload="getItemData(finished)"
                                :drop-placeholder="dropPlaceholderOptions"
                            >
                                <Draggable v-for="item in finished" :key="item._id">
                                    <BoardItem :boardItem="item" @refresh="getAllBorderListItems" />
                                </Draggable>
                            </Container>
                        </ScrollBar>
                    </div>
                </div>
            </Col>
        </Row>
        <Modal v-model="addModal" title="添加" :footer-hide="true" :mask-closable="false" :closable="false">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="50">
                <FormItem label="名字" prop="name">
                    <Input v-model="formValidate.name" placeholder="输入名字"></Input>
                </FormItem>
                <FormItem label="详情">
                    <Input v-model="formValidate.detail" placeholder="输入详情..."></Input>
                </FormItem>
                <FormItem label="标签">
                    <Tag class="tag-select-item" v-for="item in boardTags" :checked="tagIsCheck(item)" :key="item.key" :name="item.key" checkable :color="item.color" @on-change="changeBoardTag">{{item.name}}</Tag>
                </FormItem>
                <FormItem label="">
                    <Button @click="cancelAddBoard">取消</Button>
                    <Button type="primary" @click="addBoardItem">添加</Button>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>
import { Row, Col, Card, Button, Tag, Modal, Form, FormItem, Input } from 'iview';
import { ScrollBar } from '@components';
import { Container, Draggable } from 'vue-smooth-dnd';
import { getAllItems, addItem, updateItem } from '@common/db';
import { boardTags } from '@constants/board';
import dbName from '@constants/db';
import BoardItem from '@views/components/BoardItem';
export default {
    name: 'Board',
    components: {
        Row,
        Col,
        Tag,
        Card,
        Modal,
        Button,
        Form,
        FormItem,
        Input,
        Container,
        Draggable,
        ScrollBar,
        BoardItem,
    },
    data() {
        return {
            addModal: false,
            boardTags,
            dropPlaceholderOptions: {
                className: 'drop-preview',
                animationDuration: '150',
                showOnTop: true
            },
            boardList: [],
            unfinished: [], // 未开始
            working: [], // 进行中
            finished: [], // 已完成
            formValidate: {
                name: '',
                detail: '',
                tag: [],
            },
            ruleValidate: {
                name: [
                    { required: true, message: '名字不能为空', trigger: 'blur' }
                ],
                detail: [
                    { required: false, message: '名字不能为空', trigger: 'blur' }
                ],
            },
        };
    },
    computed: {
        tagIsCheck() {
            return item => {
                const { key } = item;
                return this.formValidate.tag.indexOf(key) > -1;
            };
        }
    },
    async mounted() {
        await this.getAllBorderListItems();
    },
    methods: {
        async dragBordItem(state, dropResult) {
            const { payload, addedIndex } = dropResult;
            if (addedIndex !== null) {
                // 执行更新操作，更新当前条目的状态
                await updateItem(dbName.board, {
                    _id: payload._id,
                }, {
                    index: addedIndex,
                    state,
                });
                await this.getAllBorderListItems();
            }
        },
        changeBoardTag(checked, key) {
            const { tag } = this.formValidate;
            let arr = tag;
            if (checked) {
                arr.push(key);
            } else {
                arr = tag.filter(i => i !== key);
            }
            this.formValidate = Object.assign(this.formValidate, {
                tag: [...arr],
            });
        },
        cancelAddBoard() {
            this.formValidate = {
                name: '',
                detail: '',
                tag: [],
            };
            this.addModal = false;
        },
        async addBoardItem() {
            this.$refs.formValidate.validate(async (valid) => {
                if (valid) {
                    await addItem(dbName.board, {
                        name: this.formValidate.name,
                        detail: this.formValidate.detail,
                        state: 0,
                        tag: this.formValidate.tag || [],
                        index: this.unfinished.length || 0,
                    });
                    await this.getAllBorderListItems();
                    this.addModal = false;
                }
            });
        },
        async getAllBorderListItems() {
            this.boardList = await getAllItems(dbName.board);
            this.dealBoardData();
        },
        dealBoardData() {
            let unfinished = [];
            let working = [];
            let finished = [];
            (this.boardList || []).forEach(item => {
                switch(item.state) {
                case 0:
                    unfinished.push(item);
                    break;
                case 1:
                    working.push(item);
                    break;
                case 2:
                    finished.push(item);
                    break;
                default:
                    break;
                }
            });
            this.unfinished = unfinished;
            this.working = working;
            this.finished = finished;
        },
        getItemData(data) {
            return index => {
                return data[index];
            };
        },
        log(...params) {
            console.log(...params);
        }
    }
};
</script>

<style lang="less">
.v-board {
    display: block;
    height: 100%;
    flex: 1;
    .v-board-container,
    .ivu-col {
        height: 100%;
    }
    .group-name {
        .font-size-lg();
        font-weight: @font-weight-bold;
        .m-b(@gap-sm);
        color: @gray-dark;
    }
    .board-group-item {
        background-color: @gray-light;
        flex: 1;
        .p(@gap-sm);
        display: block;
        max-height: 100%;
        border-radius: @border-radius;
        .border-list {
            height: 620px;
            .scrolly-viewport {
                padding: 0 !important;
                .smooth-dnd-container {
                    min-height: 580px;
                }
            }
            &.add-container {
                height: 580px;
            }
        }
        .add-item-btn {
            height: 40px;
            .flex-column-center();
            .ivu-btn {
                width: 100%;
            }
        }
    }
    .drop-preview {
      background-color: rgba(150, 150, 200, 0.1);
      border: 1px dashed #abc;
      margin: 5px;
    }
    .card-ghost {
        transition: transform 0.18s ease;
        transform: rotateZ(5deg)
    }

    .card-ghost-drop {
        transition: transform 0.18s ease-in-out;
        transform: rotateZ(0deg)
    }
    .draggable-item {
        height: 50px;
        line-height: 50px;
        text-align: center;
        display: block;
        background-color: #fff;
        outline: 0;
        border: 1px solid rgba(0, 0, 0, .125);
        margin-bottom: 2px;
        margin-top: 2px;
        cursor: default;
        user-select: none;
    }

    .draggable-item-horizontal {
        height: 300px;
        padding: 10px;
        line-height: 100px;
        text-align: center;
        /* width : 200px; */
        display: block;
        background-color: #fff;
        outline: 0;
        border: 1px solid rgba(0, 0, 0, .125);
        margin-right: 4px;
        cursor: default;
    }
    .opacity-ghost {
        transition: all .18s ease;
        opacity: 0.8;
        /* transform: rotateZ(5deg); */
        background-color: cornflowerblue;
        box-shadow: 3px 3px 10px 3px rgba(0, 0, 0, 0.3);
    }

    .opacity-ghost-drop {
        opacity: 1;
        /* transform: rotateZ(0deg); */
        background-color: white;
        box-shadow: 3px 3px 10px 3px rgba(0, 0, 0, 0.0);
    }
}
</style>
