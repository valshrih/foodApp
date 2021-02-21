import React, { PureComponent } from 'react';
import dynamic from 'next/dynamic';
const Layout: any = dynamic(import('../components/Layout'));
import { List, Button, Row, Col, Typography, Input, Space, Skeleton, Divider } from 'antd';
import Image from 'next/image'
import { Console } from 'console';
import { ArrowRightOutlined, DownloadOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
// import veglogo from '../public/assets/images/veg.png';
// import nonVeglogo from '../public/static/images/nonveg.png';

const fakeDataUrl = `https://run.mocky.io/v3/9d71cb03-a9f9-4d70-bae2-9d3adaa1cfe7`;
const { Text } = Typography;

class App extends PureComponent {
  public static getLayout: React.ReactNode;
  state = {
    initLoading: true,
    loading: false,
    count: 10,
    data: [],
    list: [],
    cart: [],
  };

  componentDidMount = async () => {
    const { count } = this.state;

    fetch(fakeDataUrl).then(response => response.json())
      .then(data => {
        const fetchData = data.slice(0, count)
        this.setState({
          initLoading: false,
          data: fetchData,
          list: fetchData,
        });
      });


  }



  onLoadMore = () => {
    const { count } = this.state;
    const newCount = count + 10;

    fetch(fakeDataUrl).then(response => response.json())
      .then(data => {
        const fetchData = data.slice(0, newCount)
        this.setState({
          initLoading: false,
          data: fetchData,
          list: fetchData,
          count: newCount
        });
      });
  };

  /**
   * minusProd
   */
  public minusProd = (subitem: any) => {
    const { cart } = this.state;
    let newCart = [];

    if (cart?.length > 0) {
      const findPro: any = cart.find((item: any) => item.id == subitem.id);
      if (findPro && findPro.quantity > 1) {
        newCart = cart.filter((item: any) => item.id !== findPro.id);
        newCart.push({ ...findPro, quantity: findPro.quantity - 1 });
      }
      else if (findPro && findPro.quantity === 1) {
        newCart = cart.filter((item: any) => item.id !== findPro.id).filter(Boolean);
      } else {
        newCart = cart;
      }
      this.setState({ cart: newCart })
    }


  }
  /**
   * plusProd
   */
  public plusProd = (additem: any) => {
    const { cart } = this.state;
    let newCart = [];
    if (cart?.length === 0) {

      newCart.push({ ...additem, quantity: 1 });

      this.setState({ cart: newCart })
    }
    else if (cart?.length > 0) {
      const findPro: any = cart.find((item: any) => item.id == additem.id);
      if (findPro) {
        newCart = cart.filter((item: any) => item.id !== findPro.id);
        newCart.push({ ...findPro, quantity: findPro.quantity + 1 });
      }
      else {
        newCart = cart;
        newCart.push({ ...additem, quantity: 1 });
      }
      this.setState({ cart: [...newCart] })
    }

  }

  public render() {

    const { initLoading, loading, list, cart } = this.state;
    const arrImgnv = ['nonveg.png', 'veg.png']
    const arrImg = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.webp', '6.jpg',]
    const desc = ["A delectable patty filled with potatoes, peas, carrots and tasty Indian spices. Topped with crispy lettuce, mayonnaise, and packed into toasted sesame buns.",
      "Tender and juicy chicken patty coated in spicy, crispy batter, topped with a creamy sauce, wrapped with lettuce, onions, tomatoes & seasoning and cheese. A BIG indulgence.",
      "A delectable patty filled with potatoes, peas, carrots and tasty Indian spices. Topped with crispy lettuce, mayonnaise, and packed into toasted sesame buns."
    ]
    const loadMore =
      !initLoading && !loading ? (
        <div
          style={{
            textAlign: 'center',
            marginTop: 12,
            height: 32,
            lineHeight: '32px',
          }}
        >
          <Button onClick={this.onLoadMore}>loading more</Button>
        </div>
      ) : null;

    let totalCartPrice = 0;
    if (cart?.length > 0) {
      for (let ith = 0; ith < cart.length; ith += 1) {
        const currentItemPrice = cart[ith].price * cart[ith].quantity;
        totalCartPrice += currentItemPrice;
      }
    }


    return (<div>
      <Row>

        <Col span={15}>
          {initLoading === false ?
            <List
              className="demo-loadmore-list"
              itemLayout="horizontal"
              loadMore={loadMore}
              dataSource={list}
              renderItem={item => {
                const randomDesc = Math.floor(Math.random() * 3);
                const findInCart = cart.find((iCart: any) => iCart.id === item.id)
                let qnty = 0;
                if (findInCart) {
                  qnty = findInCart.quantity;
                }
                let imgCount = item.id;
                if (item.id > 5) {
                  imgCount = item.id % 2;
                }
                const imgnorv = item.id % 2;
                return (
                  <List.Item
                    key={item.key}
                  >
                    <Row style={{ width: "100%" }}>
                      <Col span={1} />
                      <Col span={22}>
                        <Row>
                          <Col span={16}>
                            <Row>
                              <Col span={24}>
                                <Image
                                  src={`/${arrImgnv[imgnorv].toString()}`}
                                  alt="veg"
                                  width={imgnorv === 0 ? 19 : 25}
                                  height={imgnorv === 0 ? 15 : 16}
                                />
                              </Col>

                              <Col span={24} className="item-header">
                                <Text strong>{item.item_name}</Text>
                              </Col>
                              <Col span={24} className="item-price">
                                <Image
                                  src={'/rs.png'}
                                  alt="rs"
                                  width={10}
                                  height={11}
                                /> <Text >{item.price}</Text>
                              </Col>
                              <Col span={24} className="item-desc">
                                <Text style={{ fontSize: 'small' }}>{desc[randomDesc].toString()}</Text>
                              </Col>
                            </Row>

                          </Col>
                          <Col span={6}>
                            <Image
                              src={`/${arrImg[imgCount].toString()}`}
                              alt={arrImg[imgCount].toString()}
                              width={240}
                              height={150}
                            />
                            <div className="qt-button">
                              <Button
                                type="text"
                                style={{ color: "grey" }}
                                icon={<MinusOutlined />}
                                onClick={() => this.minusProd(item)}
                              />
                              <Input
                                {...this.props}
                                style={{ width: 35, padding: 4, pointerEvents: 'none', textAlign: 'center', color: 'green' }}
                                defaultValue={qnty}
                                value={qnty}
                                bordered={false}
                              />
                              <Button
                                type="text"
                                style={{ color: 'green' }}
                                icon={<PlusOutlined />}

                                onClick={() => this.plusProd(item)}
                              />
                            </div>

                          </Col>
                        </Row>
                      </Col>
                      <Col span={1} />
                    </Row>
                    <Skeleton loading={loading} active avatar>
                      <List.Item.Meta
                        title={<a href={item.href}>{item.title}</a>}
                        description={item.description}
                      />
                      {item.content}
                    </Skeleton>
                  </List.Item>
                )
              }}
            />
            : (<span>{[...Array(6)].map((i: any) => {
              return (
                <div style={{marginLeft:35}}>
                  <Space key={i}>
                    <Skeleton.Input style={{ width: 740 }} active size="default" />
                    
                     <Skeleton active /><Skeleton.Image />
                  </Space>
                  <Divider />
                </div>
              );
            })}</span>)}
        </Col>

        <Col span={9}>
          <Row>
            <Col span={1} />
            <Col span={23}>
              <Row>
                <Col span={24} >
                  <Text style={{ fontSize: 30 }} strong> Cart</Text>
                </Col>
                <Col span={24} >
                  <Text style={{ fontSize: 14 }} > {cart?.length} ITEM</Text>
                </Col>
                <Col span={24}>&nbsp;</Col>
                {
                  cart?.map((cartItem: any) => {
                    let qnty = 0;
                    const findInCart = cart.find((iCart: any) => iCart.id === cartItem.id)
                    if (findInCart) {
                      qnty = findInCart.quantity;
                    }

                    const imgnorv = cartItem.id % 2;
                    return (
                      <Row style={{ width: "100%", minHeight: 45 }}>

                        <Col span={2} >
                          <span style={{ marginLeft: `${imgnorv === 0 ? 3 : 0}px` }}>
                            <Image
                              src={`/${arrImgnv[imgnorv].toString()}`}
                              alt="veg"
                              width={imgnorv === 0 ? 19 : 25}
                              height={imgnorv === 0 ? 15 : 16}

                            />
                          </span>

                        </Col>
                        <Col span={7} className="item-header">
                          <Text strong>{cartItem.item_name}</Text>
                        </Col>
                        <Col span={1} />
                        <Col span={7}>
                          <div className="qt-cart-button">
                            <Button
                              type="text"
                              style={{ color: "grey" }}
                              icon={<MinusOutlined />}
                              onClick={() => this.minusProd(cartItem)}
                            />
                            <Input
                              {...this.props}
                              style={{ width: 35, padding: 4, pointerEvents: 'none', textAlign: 'center', color: 'green' }}
                              defaultValue={qnty}
                              value={qnty}
                              bordered={false}
                            />
                            <Button
                              type="text"
                              style={{ color: 'green' }}
                              icon={<PlusOutlined />}

                              onClick={() => this.plusProd(cartItem)}
                            />
                          </div>
                        </Col>
                        <Col span={3} className="item-price">
                          <Image
                            src={'/rs.png'}
                            alt="rs"
                            width={10}
                            height={11}
                          /> <Text >{cartItem.price * cartItem.quantity}</Text>
                        </Col>
                        <br />
                      </Row>
                    )
                  })
                }
                <Col span={24} >&nbsp;</Col>
                <Col span={24} >&nbsp;</Col>
                <Col span={10} >
                  <Text style={{ fontSize: 24 }} strong> Subtotal</Text>
                </Col>
                <Col offset={4} span={10} ><Image
                  src={'/rs.png'}
                  alt="rs"
                  width={10}
                  height={11}
                /> <Text strong>{totalCartPrice}</Text></Col>
                <Col span={24} >
                  <Text style={{ fontSize: 12 }} > Extra Charges May Apply</Text>
                </Col>

                <Col span={24} >&nbsp;</Col>
                <Col span={24} >&nbsp;</Col>
                <Col offset={2} span={16} >
                  <Button type="primary" block className="checkout-btn">
                    CHECKOUT <ArrowRightOutlined />
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>

    </div>


    );
  };
}
App.getLayout = (page: any) => <Layout>{page}</Layout>;
export default App;