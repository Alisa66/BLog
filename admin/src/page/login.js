import React, {createContext, useEffect, useState} from 'react'
import { Card,Input,Button,Spin } from "antd";
import 'antd/dist/antd.css'
import '../static/css/login.css'
// antd4引入新图标
import {UserAddOutlined ,KeyOutlined} from "@ant-design/icons";
import axios from 'axios'
import servicePath from "../config/apiUrl";

import {message} from "antd/es";

const openIdContext = createContext()

const Login =(props)=>{
    const [userName,setUserName] = useState('')
    const [password,setPassword] = useState('')
    const [isLoading,setIsLoading] =useState(false)
    useEffect(()=>{},[])

    const checkLogin = ()=>{
        if(!userName){
            message.error('用户名不能为空')
            setTimeout(()=>{
                setIsLoading:false
            },1000)
            return false
        }else if(!password){
            message.error('密码不能为空')
            return false
        }
        let dataProps = {
            'userName': userName,
            'password': password
        }
        axios({
            method: 'post',
            url: servicePath.checkLogin,
            data: dataProps,
            withCredentials: true
        }).then(
            res=>{
                console.log(res.data)
                if(res.data.data =='登陆成功'){
                    localStorage.setItem('openId',res.data.openId)
                    props.history.push('/index')
                }else{
                    message.error('用户名密码错误')
                }
            }
        )
        setTimeout( ()=>{
            setIsLoading(false)
        },1000)
    }



   return(
      <div className='login-div'>
         <Spin tip='Loading....' spinning={isLoading}>
             <Card title='Jspang blog system' bordered={true} style={{width:400}}>
                 <Input
                     id='userName'
                     size='large'
                     placeholder='enter your userName'
                     prefix={ <UserAddOutlined style={{color:'rgba(0,0,0,.25)'}} />}
                     onChange={(e)=>{setUserName(e.target.value)}}
                 />
                 <Input.Password
                     id='password'
                     size='large'
                     placeholder='enter you password'
                     prefix={<KeyOutlined  style={{color:'rgba(0,0,0,.25)'}}/>}
                     onChange={(e)=>{setPassword(e.target.value)}}
                 />

                 <br/><br/>
                 <Button type='primary' size='large' block onClick={checkLogin}>Login in</Button>
             </Card>

         </Spin>

      </div>
   )

}
export  default  Login