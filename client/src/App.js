import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import { RouterProvider } from 'react-router-dom';
import Header from './containers/Header/Header';
import AppLayout from './containers/AppLayout/AppLayout';
import Routing from './containers/Routing/Routing';

const App = () => {
  return (
    <div className="App">
      <Header />
      <AppLayout>
        <RouterProvider router={Routing} />
      </AppLayout>

    </div>
  );
}

export default App;
