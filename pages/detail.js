import React from "react";
import Head from "next/head";
import {Row, Col, Breadcrumb, Icon, Affix} from "antd";
import Header from "../components/Header";
import '../static/style/pages/detailed.css'
import ReactMarkdown from "react-markdown";
import MarkNav from 'markdown-navbar';
import 'markdown-navbar/dist/navbar.css'
import axios from 'axios'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import Tocify from "../components/tocity.tsx";
import Author from "../components/Author";
import Advert from "../components/Advert";
import Footer from "../components/Footer";
import servicePath from "../config/apiUrl";

const Detailed = (props) =>{
    let articleContent = props.article_content

    const tocity = new Tocify()

    const renderer = new marked.Renderer();

    renderer.heading = function (text,level,raw) {
            const anchor = tocity.add(text,level);
            return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
        }

    marked.setOptions({
        renderer: renderer,
        gfm: true, // 启动markdown样式
        pedantic: false,//解析符合markdown定义
        sanitize: false, // 原始输出，忽略html标签
        tables: true, // 支持github形式的表格
        breaks: false, // 支持github换行符
        smartLists: true,// 优化列表输出
        smartypants:false,
        highlight: function (code) { // 高亮显示规则
            return hljs.highlightAuto(code).value;
        }
    });

     let  html = marked(props.article_content)

    return (
        <>
            <Head>
                <title>博客详细页</title>
            </Head>
            <Row className='comm-main' type='flex' justify='center'>
                <Col className='comm-left' xs={24} sm={24} md={16} lg={18} xl={14}>
                    <div>
                        <div className='bread-div'>
                            <Breadcrumb>
                                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                                <Breadcrumb.Item>{props.typeName}</Breadcrumb.Item>
                                <Breadcrumb.Item>{props.title}</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div>
                            <div className='detailed-title'>
                                {props.title}
                            </div>
                            <div className='list-icon center'>
                                <span><Icon type='calendar'/>{props.addTime}</span>
                                <span><Icon type='folder'/>{props.typeName}</span>
                                <span><Icon type='fire'/>{props.view_count}</span>
                            </div>

                            <div className='detailed-content'
                                 dangerouslySetInnerHTML={{__html:html}}
                            >
                            </div>

                        </div>


                    </div>
                </Col>
                <Col className='comm-right' xs={0} sm={0} md={7} lg={5} xl={4}>
                    <Author/>
                    <Advert/>
                    <Affix offsetTop={5}>
                        <div className='detailed-nav comm-box'>
                            <div className='nav-title'>文章目录</div>
                           <div className='toc-list'>
                               {tocity && tocity.render()}
                           </div>
                        </div>
                    </Affix>
                </Col>
            </Row>
            <Footer/>
        </>
    )
};

Detailed.getInitialProps = async (context) => {
    console.log('rrrrr: ' + context.query.id)
    let id = context.query.id
    const promise = new Promise((resolve) => {
        axios(servicePath.getArticleById+id).then(
            (res) => {
                // console.log(res)
                // console.log(title)
                console.log(res.data.data)
                resolve(res.data.data[0])
            }
        )
    })
    return await promise
}

export default Detailed