import React from 'react';
import { createDevTools } from 'redux-devtools';
import DockMonitor from 'redux-devtools-dock-monitor';
import FilterMonitor from 'redux-devtools-filter-actions';
import LogMonitor from 'redux-devtools-log-monitor';

// createDevTools takes a monitor and produces a DevTools component
const DevTools = createDevTools(
  <FilterMonitor>
    <DockMonitor
      toggleVisibilityKey="ctrl-h"
      changePositionKey="ctrl-q"
      fluid={true}
      defaultSize={0.3}
      defaultPosition="left"
      defaultIsVisible={false}
    >
        <LogMonitor theme='tomorrow' />
    </DockMonitor>
  </FilterMonitor>
);

export default DevTools;
