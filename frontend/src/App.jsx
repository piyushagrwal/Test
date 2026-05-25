import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const fetchUser = async(id) => {
    const response = await fetch(`https://test-production-c75c.up.railway.app/users/${id}`)
    .then(res => console.log(res))
  }
  return (
    <>
      <section id="center">
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => fetchUser(1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
