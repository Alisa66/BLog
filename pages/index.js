import React, {useState,useEffect} from 'react'
import Head from 'next/head'
import {Row, Col, Button, List, Icon} from "antd";
import Header from "../components/Header";
import '../static/style/pages/index.css'
import Author from '../components/Author'
import Advert from "../components/Advert";
import Lists from "./list";
import Detailed from "./detail";
import Footer from "../components/Footer";
import axios from 'axios'
import Link from "next/link";
import servicePath from "../config/apiUrl";
// 解析Markdown必须的模块和css样式
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

const  renderer = new marked.Renderer();
marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,

    xhtml: false,
    highlight: function (code) {
        return hljs.highlightAuto(code).value;
    }
})



const Home = (list) => {
    Home.getInitialProps = async () => {
        const promise = new Promise((resolve) => {
            axios(servicePath.getArticleList).then(
                (res) => {
                    console.log('远程获得的数据结果是：', res.data.data)
                    resolve(res.data)
                }
            )
        });
        return await promise
    }

    const [mylist, setMylist] = useState(list.data)
    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <Header/>
            <Row className='comm-main' type='flex' justify='center'>
                <Col className='comm-left' xs={24} sm={24} md={16} lg={18} xl={14}>
                    <List
                        header={<div>最新日志</div>}
                        itemLayout='vertical'
                        dataSource={mylist}
                        renderItem={(item) => (
                            <List.Item>
                                <div className='list-title'>
                                    <Link href={{pathname: '/detail', query: {id: item.id}}}>
                                        <a>{item.title}</a>
                                    </Link>
                                </div>
                                <div className='list-icon'>
                                    <span> <Icon type='calendar'/>{item.addTime}</span>
                                    <span><Icon type='folder'/>{item.typeName}</span>
                                    <span><Icon type='fire'/>{item.view_count}人</span>
                                </div>
                                <div className='list-context'
                                 dangerouslySetInnerHTML={{__html:marked(item.introduce)}}
                                >

                                    {/*{item.article_content}*/}
                                </div>
                            </List.Item>
                        )}
                    />
                </Col>
                <Col className='comm-right' xs={0} sm={0} md={7} lg={5} xl={4}>
                    <Author/>
                    <Advert/>
                </Col>

            </Row>
            <Footer/>
        </>
    )

}

export default Home
