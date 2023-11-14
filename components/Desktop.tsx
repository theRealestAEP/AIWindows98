// Desktop.tsx
'use client';
import React, { useState } from 'react';
import PastSearches from './userItems';
import GenerateSearch from './generateSearch';
import DesktopIcon from './DesktopIcon';
import StuffIMade from './stuffIMade';


const Desktop = ({ user }: any) => {
  const [showPastSearches, setShowPastSearches] = useState(false);
  const [showGenerateSearch, setShowGenerateSearch] = useState(false);
  const [showStuffIMade, setShowStuffImade] = useState(false);

  const searchImage = '/globeSearch.png'

  const stuffIMade = '/bookflip.png'



  return (
    <>
      <div className='desktop'>
        <DesktopIcon label="Past Deep Thought" imageSrc={searchImage} onClick={() => {
          setShowPastSearches(true)
          setShowGenerateSearch(true)
        }} />
        {/* <DesktopIcon label="Deep Thought Search" imageSrc={searchImage} onClick={() => setShowGenerateSearch(true)} /> */}
        <DesktopIcon label="Stuff I Made" imageSrc={stuffIMade} onClick={() => setShowStuffImade(true)} />
      </div>

      {showPastSearches && <PastSearches user={user} onClose={() => setShowPastSearches(false)} />}
      {showGenerateSearch && <GenerateSearch user={user} onClose={() => setShowGenerateSearch(false)} />}
      {showStuffIMade && <StuffIMade user={user} onClose={() => setShowStuffImade(false)} />}
    </>
  );
};

export default Desktop;
