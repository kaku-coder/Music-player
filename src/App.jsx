import React from 'react'
import MusicPlayer from './componets/MusicPlayer'

const App = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      width: '100%',
      padding: '20px',
      boxSizing: 'border-box',
      background: '#0a090f'
    }}>
      <MusicPlayer />
    </div>
  )
}

export default App