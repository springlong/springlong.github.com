import React, { Component } from 'react';
import DemoJSX from './demo/jsx';
import DemoPropTypes from './demo/propTypes';
import DemoRefs from './demo/refs';
import DemoFragments from './demo/fragments';
import './App.css';

function CompA() {
  return (
    <div>compA text</div>
  )
}

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <DemoJSX /> */}
        <DemoPropTypes
          typeArray={[1, 2, 3]}
          typeBool={true}
          typeFunc={() => { return 'funcs-return'; }}
          typeNumber={123}
          typeObject={{a: 'obj-a-value', b: 'obj-b-value'}}
          // typeString={'abc'}
          typeSymbol={Symbol('sm')}
          typeElement={<CompA />}
          typeOneOf={'News'}
          typeOneOfType={'typeoftype'}
          typeArrayOf={[1]}
          typeObjectOf={{a: '1'}}
          typeShape={{a:1 , b: 2}}
          typeRequire={'require'}
          typeAnyRequire={'any'}
          typeCustom={'customValue'}
          typeCustomArrayOf={['1']}
        />
        <DemoRefs />
        <DemoFragments />
      </div>
    );
  }
}

export default App;
