import React from 'react';

const About = () => {
  return (
    <div className="flex flex-col gap-4 p-6">
      <header>
        <h2 className="text-2xl font-semibold">About</h2>
        <p>This is Moonkyu Jun's CV Projects.</p>
      </header>
      <div className="w-full p-4 h-full rounded-2xl border border-gray-200 bg-white shadow">
        <p>FPS comparison, Optimization Methods Theory Self-Analysis</p>
        <a 
          href="https://velog.io/@mkjun2022/posts" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-blue-500 hover:underline"
        >
          링크
        </a>
      </div>
      <div className="w-full p-4 h-full rounded-2xl border border-gray-200 bg-white shadow">
        <p>MediaPipe, OpenCV Pose Estimation & Method to Estimate Body Types</p>
        <a 
          href="https://velog.io/@mkjun2022/posts" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-blue-500 hover:underline"
        >
          링크
        </a>
      </div>
    </div>
  )
}

export default About;
