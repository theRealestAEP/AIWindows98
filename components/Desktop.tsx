// Desktop.tsx
'use client';
import React, { useState } from 'react';
import PastSearches from './userItems';
import GenerateSearch from './generateSearch';
import DesktopIcon from './DesktopIcon';
import AboutMe from './aboutMe';

const Desktop = ({ user }: any) => {
  const [showPastSearches, setShowPastSearches] = useState(false);
  const [showGenerateSearch, setShowGenerateSearch] = useState(false);
  const searchImage = '/globeSearch.png'
  const historicalSearchImage = '/folderFile.png'


  return (
    <>
    <AboutMe />
    <div className='desktop'>
      <DesktopIcon label="Past Searches"   imageSrc={historicalSearchImage} onClick={() => {
        setShowPastSearches(true)}} />
      <DesktopIcon label="Generate Search" imageSrc={searchImage} onClick={() => setShowGenerateSearch(true)} />
    </div>

      {showPastSearches && <PastSearches user={user} onClose={() => setShowPastSearches(false)} />}
      {showGenerateSearch && <GenerateSearch user={user} onClose={() => setShowGenerateSearch(false)} />}
    </>
  );
};

export default Desktop;
