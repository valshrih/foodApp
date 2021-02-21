import React, { ReactNode } from 'react'
import Head from 'next/head'
import { Layout, Menu, Breadcrumb, Typography, Row, Col, Divider, Input, Button } from 'antd';
import  { BorderOutlined, HeartOutlined, SearchOutlined, StarFilled, UserOutlined } from '../node_modules/@ant-design/icons';

import Image from 'next/image'


const { Text } = Typography
const { Header, Content, Footer } = Layout;

type Props = {
  children?: ReactNode
  title?: string
}

const LayoutApp = ({ children, title = 'Food App' }: Props) => (
  <div className="app-header">
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    {/* <header>
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>{' '}
        |{' '}
        <Link href="#">
          <a>About</a>
        </Link>{' '}
        |{' '}
        <Link href="#">
          <a>Users List</a>
        </Link>{' '}

      </nav>
    </header>
    {children}
    <footer>
      <hr />
      <span>I'm here to stay (Footer)</span>
    </footer> */}
    <Layout>
      <Row>
        <Header style={{ width: '100%', height: 'auto' }}>
          <div className="logo" />
          <Row>
            <Col span={24} style={{ fontSize: 45 }}>
              <Text style={{ color: 'white' }}>McDonald's</Text>

            </Col>
            <Col span={5} style={{ fontSize: 15 }}>
              <Row>
                <Col span={5} style={{ color: 'whitesmoke' }}>
                  <StarFilled />&nbsp; {'4.3'}

                  <Divider type="vertical" style={{ color: 'white' }} />
                </Col>
                <Col span={5} style={{ color: 'whitesmoke' }}>
                  {'35 mins'}
                  <Divider type="vertical" style={{ color: 'white' }} />
                </Col>
                <Col span={6} style={{ color: 'whitesmoke' }}>
                  <Image
                    src={'/rs.png'}
                    alt="rs"
                    width={10}
                    height={11}
                  />  {'400 for two'}
                </Col>
              </Row>
            </Col>
            <Col span={19} />
            <Col span={4}>
              <Input size="large" placeholder="" prefix={<SearchOutlined />} />
            </Col>
            <Col span={2} style={{ paddingLeft: 10 }}>
              <Button icon={<BorderOutlined />} size="large">Veg Only</Button>
            </Col>
            <Col span={2} style={{ marginLeft: -15 }}>
              <Button icon={<HeartOutlined />} size="large">Favourite</Button>
            </Col>
          </Row>

        </Header>
      </Row>
      <Row>&nbsp;</Row>
      <Row>
        <Content className="site-layout" style={{ padding: '0 50px' }}>
          <div className="site-layout-background" style={{ padding: 10, minHeight: 380 }}>
            {children}
          </div>
        </Content>
      </Row>

      <Footer style={{ textAlign: 'center', bottom: 0 }}>Food App ©2020</Footer>
    </Layout>
  </div >
)

export default LayoutApp
