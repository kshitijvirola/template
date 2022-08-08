import React, { Component } from "react";
import { Row, Col, Spin } from "antd";

import { Menu, Header } from "components/Form";

class RequestType extends Component {
  render() {
    return (
      <Spin spinning={false} size="large">
        <Row>
          <Col xs={0} sm={0} md={8} lg={6} xl={5} className="menuItems">
            <Menu />
          </Col>
          <Col xs={24} sm={24} md={16} lg={18} xl={19} className="dataItems">
            <Header />
            {/* <RequestStyle></RequestStyle> */}
          </Col>
        </Row>
      </Spin>
    );
  }
}
export default RequestType;
