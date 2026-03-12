/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Directory from './pages/Directory';
import PlatformDetails from './pages/PlatformDetails';
import LandscapeMap from './pages/LandscapeMap';
import Compare from './pages/Compare';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="directory" element={<Directory />} />
          <Route path="platform/:id" element={<PlatformDetails />} />
          <Route path="landscape" element={<LandscapeMap />} />
          <Route path="compare" element={<Compare />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
