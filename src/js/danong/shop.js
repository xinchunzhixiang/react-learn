import React from 'react';
import ShopAction from './shopAction';
import ShopStore from './shopStore';
import {
    Link
} from 'react-router';
import './shop.scss';

import Container from '../../plugin/amazeui-touch/lib/Container';
import Notification from '../../plugin/amazeui-touch/lib/Notification';
import List from '../../plugin/amazeui-touch/lib/List';
import Card from '../../plugin/amazeui-touch/lib/Card';
import Grid from '../../plugin/amazeui-touch/lib/Grid';
import Col from '../../plugin/amazeui-touch/lib/Col';
import Group from '../../plugin/amazeui-touch/lib/Group';
import Button from '../../plugin/amazeui-touch/lib/Button';
import Slider from '../../plugin/amazeui-touch/lib/Slider';

class App extends React.Component {
    constructor(){
        super();
        this.state = {
            data: {}
        };
    }

    onAction(index, direction) {
        //console.log('激活的幻灯片编号：', index, '，滚动方向：', direction);
    }

    render() {
        console.log('render this.state', this.state)
        let { 
            bannerList,
            productList,
            shopTitle
        } = this.state.data;
        return(
            <Container 
                scrollable={true} 
                className="component-shop"
            >
                <Slider 
                    className='m-slider'
                    controls={false}
                    onAction={this.onAction}
                >
                    {
                        bannerList && bannerList.map((v, i) => {
                            return (
                                <Slider.Item key= {i} >
                                    <img
                                        id={'slider' + i}
                                        src={ '//static.sztoda.com/' + v.imgLarge} />
                                </Slider.Item>
                            )
                        })
                    }
                </Slider>
                <Group>
                    <Grid 
                        align='around'
                    >
                        <Col className='li-align-center'>
                            <Link href={'/api/carInsurance/index?productId=1'}>
                                <i className='icon-che'></i>
                                <p className='li-text-normal'>车险询价</p>
                            </Link>    
                        </Col>
                        <Col className='li-align-center'>
                            <Link>
                                <i className="icon-gerenzhongxin1"></i>
                                <p className='li-text-normal'>个人中心</p>
                            </Link>
                        </Col>
                    </Grid>
                </Group>
                <Group
                    className='m-pro'
                    header={shopTitle || '产品列表'}
                >
                    <List>
                        {productList && productList.map((v, i) => {
                            if(i <= 0) return;
                            return (
                                <List.Item
                                    className='el-pro-list'
                                    title={v.name}
                                    media={<img src={'//static.sztoda.com/' + v.imgSmall} />}
                                    subTitle={
                                        <div>
                                            ￥<span className='li-color-highlight'>{v.price}</span>起
                                        </div>
                                    }
                                    href={v.gotoUrl}
                                    key={i}
                                />
                            );
                        })}
                    </List>
                </Group>
            </Container>
        )
    }

    componentDidMount() {
        ShopAction.bannerList();
        ShopAction.productList();

        ShopStore.bind("change",function(){
            this.setState({
                data: ShopStore.getAll()
            })
            console.log('触发change',this.state)
        }.bind(this));
    }
}

export default App