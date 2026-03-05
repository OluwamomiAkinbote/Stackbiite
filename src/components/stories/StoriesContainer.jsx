// src/components/stories/StoriesContainer.jsx
'use client';

import React from 'react';
import * as Base from "@react-instastories/base";
import * as External from "@react-instastories/external";

export const StoriesContainer = ({ children }) => {
  return (
    <Base.Configurable.Container>
      <Base.Configurable.Viewer
        events={[
          External.Events.Mount.AutoClose,
          External.Events.Mount.Interactive,
          External.Events.Focus.Timer,
          External.Events.Keyboard.Close,
          External.Events.Keyboard.Stories
        ]}
      >
        {/* External UI Controls */}
        <External.Controls.Viewer.Background />
        <External.Controls.Viewer.Close />
        <External.Controls.Stories.Next />
        <External.Controls.Stories.Previous />
        
        {/* Preloading for smooth navigation */}
        <External.Preloadable.Stories unloadable next={1} previous={1} />
        <External.Preloadable.Pages unloadable next={1} previous={1} />
        
        {/* Your Stories */}
        <Base.Stories>
          {children}
        </Base.Stories>
      </Base.Configurable.Viewer>
    </Base.Configurable.Container>
  );
};