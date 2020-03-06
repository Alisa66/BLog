import React, {useState, useEffect} from "react";
import {
    List, Card, Row, Col, Modal, message, Button,
    Switch, Menu, Layout, Breadcrumb, Table
} from 'antd';
import axios from 'axios'
import servicePath from "../config/apiUrl";
import {FileAddOutlined, MessageOutlined, PieChartOutlined, ReadOutlined} from "@ant-design/icons";
import {Route} from "react-router-dom";
import AddArticle from "./AddArticle";

const {confirm} = Modal
const {SubMenu} = Menu;
const {Header, Content, Footer, Sider} = Layout;
const {Column} = Table;

function ArticleList(props) {
    const [list, setList] = useState([])
    // 获取文章列表
    const getList = () => {
        axios({
            method: 'get',
            url: servicePath.getArticleList,
            withCredentials: true,
            header: {'Access-Control-Allow-Origin': '*'}
        }).then(
            res => {
                 // console.log(res)
                setList(res.data.list)
            }
        )
    }
    useEffect(() => {
        getList()
    }, [])
    // 删除文章
    const delArticle = (id) => {
        confirm({
            title: '确定要删除这篇博客文章吗?',
            content: '如果你点击OK按钮，文章将会永远被删除，无法恢复。',
            onOk() {
                axios({
                    method: 'get',
                    url: servicePath.delArticle + id,
                    withCredentials: true
                }).then(
                    res => {
                        if (res.data.isSuccess) {
                            message.success('文章删除成功')
                            getList()
                        }

                    }
                )
            },
            onCancel() {
                message.success('没有任何改变')
            }
        })
    }

    // 修改文章
    const handleUpdateArticle = (id, checked) => {
        props.history.push('/index/add/' + id)
    }


    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sider collapsible>
                <div className="logo"/>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1">
                        <PieChartOutlined/>
                        <span>工作台</span>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <FileAddOutlined/>
                        <span>添加文章</span>
                    </Menu.Item>
                    <SubMenu
                        key="sub1"
                        title={
                            <span>
                                <ReadOutlined/>
                                <span>文章管理</span>
                            </span>
                        }
                    >
                        <Menu.Item key="addArticle">添加文章</Menu.Item>
                        <Menu.Item key="articleList">文章列表</Menu.Item>

                    </SubMenu>

                    <Menu.Item key="9">
                        <MessageOutlined/>
                        <span>留言管理</span>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header style={{background: '#fff', padding: 0}}/>
                <Content>
                    <div style={{padding: 24, minHeight: 360}}>
                        <div>
                            <List
                                itemLayout="horizontal"
                                header={
                                    <Row className="list-div">
                                        <Col span={8}>
                                            <b>标题</b>
                                        </Col>
                                        <Col span={3}>
                                            <b>类别</b>
                                        </Col>
                                        <Col span={3}>
                                            <b>发布时间</b>
                                        </Col>
                                        <Col span={3}>
                                            <b>浏览量</b>
                                        </Col>
                                        <Col span={4}>
                                            <b>操作</b>
                                        </Col>
                                    </Row>
                                }
                                bordered
                                split
                                dataSource={list}
                                renderItem={item => (
                                    <List.Item>
                                        <Row className="list-div">
                                            <Col span={8}  style={{width:'1600px'}}>{item.title}</Col>
                                            <Col span={3} >{item.typeName}</Col>
                                            <Col span={3} >{item.addTime}</Col>
                                             <Col span={3}>{item.view_count}</Col>
                                            <Col span={3}>
                                                <Button type="primary"
                                                        onClick={() => handleUpdateArticle(item.id)}>修改</Button>&nbsp;
                                                 <Button type='primary' onClick={() => delArticle(item.id)}>删除</Button>
                                            </Col>
                                        </Row>
                                    </List.Item>
                                )}
                            />
                        </div>
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>JSPang.com</Footer>
            </Layout>
        </Layout>

    )

}

export default ArticleList