import React, { Component } from "react"
import { Button, message } from 'antd'; //antd
import { GetCode } from '../../api/account.js'
import { validate_email } from '../../utils/validate';
//定时器
let timer=null
//class 组件
class Code extends Component {
    constructor(props) {
        //初始化 props 的值
        super(props);
        this.state = {
            username: props.username,
            button_text: "获取验证码",
            button_disabled: false,
            button_loading: false,
            flag:true,
            module:props.module
        }
    }
    //this.props.username//每次都会获取新的
    componentWillReceiveProps({ username }) {//生命周期获取最新值
        this.setState({
            username
        })

    }
    componentWillUnmount(){//组件销毁
        clearInterval(timer);
    }
    //获取验证码
    getCode = () => {
        let username = this.state.username
        if (!username) {
            message.warning('用户名不能为空', 1);
            return false;
        }
        if (!validate_email(username)) {
            message.warning('邮箱格式不正确', 1);
            return false;
        }
        const requestData = {
            username,
            module: this.state.module,
        };
        if (!this.state.flag) {
            return false;
        }
        this.setState({
            button_loading: true,
            button_disabled: true,
            button_text: '发送中',
            flag: false
        });
        GetCode(requestData)
            .then((response) => {
                message.success("获取成功,验证码:"+response.data.message)
                //执行倒计时
                this.countDown();
            })
            .catch((error) => {
                this.setState({
                    button_loading: false,
                    button_text: '重新获取',
                    button_disabled: false,
                    flag: true,
                });
            });
    };
    /**
     * 倒计时
     */
    countDown = () => {
       
        //计时器时间
        let sec = 60;
        //修改状态
        this.setState({
            button_loading: false,
            button_text: `${sec}S`,
        });
        timer = setInterval(() => {
            sec--;
            if (sec <= 0) {
                this.setState({
                    button_disabled: false,
                    button_text: '重新获取',
                    flag: true,
                });
                clearInterval(timer);
                return false;
            }
            this.setState({
                button_text: `${sec}S`,
            });
        }, 1000);
    };
    render() {
        let { button_text,button_disabled,button_loading } = this.state
        return (
            <Button
                type="danger"
                block
                onClick={this.getCode}
                disabled={button_disabled}
                loading={button_loading}
            >
                {button_text}
            </Button>
        )
    }
}
export default Code