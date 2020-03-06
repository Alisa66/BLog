import React, {useState, useEffect} from "react";
import marked from 'marked'
import '../static/css/AddArticle.css'
import {Row, Col, Input, Select, DatePicker, Button} from "antd";
import axios from 'axios'
import servicePath from "../config/apiUrl";
import {message} from "antd/es";

const {TextArea} = Input


const renderer = new marked.Renderer();
marked.setOptions({
    render: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false
})


function AddArticle(props) {

    const [articleId, setArticleid] = useState(0) // 文章的ID
    const [articleTitle, setArticletitle] = useState('') // 文章标题
    const [articleContent, setArticlecontent] = useState('')// 文章内容
    const [markdownContent, setMarkdowncontent] = useState('预览内容')//markdown编辑的内容
    const [introducemd, setIntroducemd] = useState()// markdown的内容 简介
    const [introducehtml, setIntroducehtml] = useState('等待编辑') //简介的html内容
    const [showDate, setShowDate] = useState()//发布日期
    const [typeInfo, setTypeinfo] = useState([])// 文章类别信息
    const [selectedType, setSelectedtype] = useState(1) // 设置文章的类别

    // 获取文章类别
    const getTypeinfo = () => {
        axios({
            method: 'get',
            url: servicePath.getTypeInfo,
            header: {'Access-Control-Allow-Origin': '*'},
            withCredentials: true
        }).then(
            res => {
                if (res.data.data == '没有登陆') {
                    localStorage.removeItem('openId')
                    props.history.push('/')
                } else {
                    setTypeinfo(res.data.data)
                }
            }
        )

    }
    useEffect(() => {
        getTypeinfo()
        //获取文章Id
        let temId = props.match.params.id
        if (temId) {
            setArticleid(temId)
            getArticleById(temId)
        }
    }, [])
    // 选择类别后
    const selectTypeHandler = (value) => {
        setSelectedtype(value)
    }
    const changeContent = (e) => {
        setArticlecontent(e.target.value)
        let html = marked(e.target.value)
        setMarkdowncontent(html)
    }
    const changeIntroduce = (e) => {
        setIntroducemd(e.target.value)
        let html = marked(e.target.value)
        setIntroducehtml(html)
    }
    // 保存文章
    const saveArticle = () => {
        // marked() // 先进行转换

        if (!articleTitle) {
            message.error('文章名称不能为空')
            return false
        } else if (!selectedType) {
            message.error('必须选择文章类别')
            return false
        } else if (!articleContent) {
            message.error('文章内容不能为空')
            return false
        } else if (!showDate) {
            message.error('发布时间不能为空')
            return false
        }
        let dataProps = {} //传递到接口的参数

        dataProps.type_id = selectedType
        dataProps.title = articleTitle
        dataProps.article_content = articleContent
        dataProps.introduce = introducemd
        let datetext = String(showDate).replace('-', '/') // 把字符串转换成时间
        dataProps.addTime = (new Date(datetext).getTime()) / 1000
        dataProps.view_count = Math.ceil(Math.random() * 100) + 1000

        if (articleId == 0) {
            // console.log('articleId=:'+articleId)
            axios({
                method: 'post',
                url: servicePath.addArticle,
                data: dataProps,
                withCredentials: true
            }).then(
                res => {
                    // console.log(res)
                    setArticleid(res.data.insertId)
                    if (res.data.isSuccess) {
                        message.success('文章保存成功')
                    } else {
                        message.error('文章保存失败')
                    }
                }
            )
        } else {
            // console.log(articleId)
            dataProps.id = articleId
            console.log(dataProps.id)
            console.log(dataProps)
            axios({
                method: 'post',
                url: servicePath.updateArticle,
                data: dataProps,
                withCredentials: true
            }).then(
                res => {
                    if (res.data.isSuccess) {
                        message.success('文章更新成功')
                    } else {
                        message.error('文章更新失败')
                    }
                }
            )
        }
    }

    // 根据传过来的Id获取值
    const getArticleById = (id) => {
        axios(servicePath.getArticleById + id, {
            withCredentials: true,
            header: {'Access-Control-Allow-Origin': '*'}
        }).then(
            res => {
                // console.log(res)
                setArticletitle(res.data.data[0].title)
                setArticlecontent(res.data.data[0].article_content)
                let html = marked(res.data.data[0].article_content)
                marked(html)
                setIntroducemd(res.data.data[0].introduce)
                let tmpInt = marked(res.data.data[0].introduce)
                setIntroducehtml(tmpInt)
                setShowDate(res.data.data[0].addTime)
                setSelectedtype(res.data.data[0].typeId)
            }
        )
    }
    return (
        <div>
            <Row gutter={5}>
                <br/>
                <Col span={12}>
                    <Input
                        placeholder='博客标题'
                        size='large'
                        value={articleTitle}
                        onChange={e => {
                           setArticletitle(e.target.value)
                       }}
                    />
                </Col>
                <Col span={6}>
                    &nbsp;
                    <Select
                        defaultValue={selectedType}
                        size='large'
                        onChange={selectTypeHandler}
                    >
                        {
                            typeInfo.map((item, index) => {
                                return (<Select.Option key={index} value={item.Id}>{item.typeName}</Select.Option>)
                            })
                        }

                    </Select>
                    {/*<Select>*/}
                    {/*    <Select.Option value="lucy">lucy</Select.Option>*/}
                    {/*</Select>*/}
                </Col>
                <Col span={6}>
                    <Button type='primary' size='large'>暂存</Button>&nbsp;&nbsp;
                    <Button type='primary' onClick={saveArticle} size='large'>发布文章</Button>
                </Col>
            </Row>
            <br/>
            <Row gutter={5}>
                <Col span={9}>
                    <TextArea
                        className='markdown-content'
                        rows={35}
                        placeholder='文章内容'
                        onChange={changeContent}
                        onPressEnter={changeContent}
                        value={articleContent}
                    />
                </Col>
                <Col span={9}>
                    <div
                        className='show-html'
                        dangerouslySetInnerHTML={{__html: markdownContent}}
                    >
                    </div>
                </Col>
                <Col span={6}>
                    <TextArea
                        rows={4}
                        placeholder='文章简介'
                        value={introducemd}
                        onChange={changeIntroduce}
                    />
                    <br/><br/>
                    <div
                        className='introduce-html'
                        dangerouslySetInnerHTML={{__html: '文章简介:' + introducehtml}}
                    >
                    </div>
                    <div className='date-select'>
                        <DatePicker
                            placeholder="发布日期"
                            onChange={(date, dateString) => setShowDate(dateString)}
                            size='large'

                        />
                    </div>
                </Col>


            </Row>
        </div>
    )
}

export default AddArticle