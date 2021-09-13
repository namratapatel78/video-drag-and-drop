import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

const Example = lazy(() => import('../src/views/Example') )


function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
          <Switch>
            <Route path='/' exact>
              <Redirect to="/example"/>
            </Route>
            <Route path='/example' component={Example}>
            </Route>
          </Switch>
        </BrowserRouter>
        </Suspense>
    </div>
  );
}

export default App;
