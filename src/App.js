import React from 'react';
import BoxBuilderPage from './containers/box-builder-page';
import BoxIdeasPage from './containers/box-ideas-page';
import QuoteBuilderPage from './containers/quote-builder-page';
import { Route, Switch } from 'react-router-dom'

function App() {
  return (
    <Switch>
      <Route exact path="/" component={QuoteBuilderPage}/>
      <Route path="/box-builder" component={BoxBuilderPage}/>
      <Route path="/box-ideas" component={BoxIdeasPage}/>
      <Route path="/quote-builder" component={QuoteBuilderPage}/>
      {/* <Route path="/:id" component={UserPage} /> */}
    </Switch>
  );
}

export default App;
