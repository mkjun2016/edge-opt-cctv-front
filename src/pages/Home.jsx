const Home = () => {
  return (
    <div className="flex flex-col gap-4 p-6">
      <header>
        <h2 className="text-2xl font-semibold">Home</h2>
        <p>This is Moonkyu Jun CV Projects HomePage</p>
        <img className="rounded-lg shadow-md w-100" src="/myimage.jpg" alt="MyImage" />
      </header>
      <section className="w-full p-4 h-full rounded-2xl border border-gray-200 bg-white shadow">
        <h3 className="text-xl font-semibold">Introduction</h3>
        <p>Undergraduate Student at Stony Brook University, majoring in computer science. Passionate about building impactful software services.
        </p>
        <p>Ready to grow together. Always exploring emerging technologies to solve real-world problems efficiently. Quick to adapt, eager to grow, and ready to innovate!
        </p>
        <p>Core Skills: React.js, React Native, Python, SQL, TypeScript, Computer Vision
        </p>
        <p>
          Open to any internship opportunities—welcome!
        </p>
      </section>
    </div>
  )
}

export default Home;
