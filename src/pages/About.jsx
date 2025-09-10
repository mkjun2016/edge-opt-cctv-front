import MarkdownView from 'react-showdown';
import sample1 from '/Users/kevin/workspace/edge-opt-cctv-front/src/pages/CV_project.md?raw';
import sample2 from '/Users/kevin/workspace/edge-opt-cctv-front/src/pages/CV_project2.md?raw';

const About = () => {
  return (
    <div className="flex flex-col gap-4 p-6">
      <header>
        <h2 className="text-2xl font-semibold">About</h2>
        <p>This is Moonkyu Jun's CV Projects.</p>
      </header>
      <div className="w-full p-4 h-full rounded-2xl border border-gray-200 bg-white shadow">
        <MarkdownView markdown={sample1} />
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
        <MarkdownView markdown={sample2} />
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
