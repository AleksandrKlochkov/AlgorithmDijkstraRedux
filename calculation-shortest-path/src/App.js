import React, { Component } from 'react'
import {connect} from 'react-redux'
import Layout from './hoc/Layout/Layout'
import Wrapper from './containers/Wrapper/Wrapper'
import Footer from './containers/Footer/Footer'
import Page from './containers/Page/Page'

class App extends Component {


  render() {
    return (
      <Layout>
          <Wrapper>
            <Page />
            <Footer/>
          </Wrapper>
      </Layout>
    );
  }
}



export default connect()(App);
