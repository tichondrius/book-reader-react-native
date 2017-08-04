import React, { Component } from 'react';
import { Provider, connect } from 'react-redux'; 

import TruyenKhin from './app';
import { configStore } from './redux/configStore';


const Root = () => (
  <Provider store = {configStore()}>
    <TruyenKhin />
  </Provider>
);
export default Root;