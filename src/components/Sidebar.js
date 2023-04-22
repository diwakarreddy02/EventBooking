import React from 'react';

function Sidebar({ pages, onProfileClick, onPageClick }) {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, bottom: 0, width: '200px', backgroundColor: 'black', color: 'white' }}>
      <div style={{ padding: '10px', borderBottom: '1px solid #ccc', cursor: 'pointer', color: 'white' }} onClick={onProfileClick}>
        Profile
      </div>
      {pages.map((page, index) => (
        <div key={index} style={{ padding: '10px', borderBottom: '1px solid #ccc', cursor: 'pointer', color: 'white' }} onClick={() => onPageClick(page)}>
          {page.name}
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
