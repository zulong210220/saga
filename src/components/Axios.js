import React  from 'react';
import axios from 'axios'
class Axios extends React.Component {
    //构造函数
    constructor() {
        super();
        //react定义数据
        this.state = {
            list:[]
        }
    }
    //请求接口的方法
    getData=()=>{
        var  api='http://192.168.50.101:8000/posts/1';

        axios.get(api)
            .then((response) =>{
                //console.log(response);
                console.log("axios",response.data);
                //用到this需要注意指向，箭头函数
                this.setState({
                    list:response.data.body
                })
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    }
    render() {
        return (
            <div>
                <h2>axios获取数据</h2>
                <button onClick={this.getData}>获取api接口</button>
                <ul>
                    {/* 对数组进行循环 */}
                    {
                        this.state.list.map((value,key)=>{
                            return<p  key={key}>{value}</p>
                        })
                    }
                </ul>
            </div>
        )
    }
}
export default Axios;
