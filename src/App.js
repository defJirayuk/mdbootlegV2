import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './component/page/dashboard/index';
import Product from './component/page/product/index';
import ImageFireBase from './component/page/imageFireBase/index';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' exact element={<Dashboard />} />
        <Route path='/product' exact element={<Product />} />
        <Route path='/firebase' exact element={<ImageFireBase />} />
      </Routes>
    </Router>
  );
}

export default App;
