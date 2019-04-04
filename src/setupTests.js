/* eslint-disable import/no-extraneous-dependencies */
import EnzymeAdapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
// import sinon from 'sinon';
// import React from 'react';
import { createSerializer } from 'enzyme-to-json';

expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));

Enzyme.configure({ adapter: new EnzymeAdapter() });

global.dd = wrapper => console.log(wrapper.debug());

// global.React = React;
// global.shallow = shallow;
// global.render = render;
// global.mount = mount;
// global.sinon = sinon;

Enzyme.configure({
  adapter: new EnzymeAdapter(),
  // disableLifecycleMethods: true
});
