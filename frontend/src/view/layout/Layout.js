import React, { Component } from 'react';
import Header from 'view/layout/Header';
import LayoutWrapper from 'view/layout/styles/LayoutWrapper';
import Menu from 'view/layout/Menu';

class Layout extends Component {
  render() {
    return (
      <LayoutWrapper>
        <Menu url={this.props.match.url} />
        <div className="main">
          <Header />
          <div className="content">
            {this.props.children}
          </div>
        </div>
      </LayoutWrapper>
    );
  }
}

export default Layout;
