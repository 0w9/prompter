import { useState } from 'react'

export default function Home() {
  const [userPrompt, setUserPrompt] = useState('')
  const [refinedPrompt, setRefinedPrompt] = useState('')
  const [inputIsShown, setInputIsShown] = useState(true)
  const [modalIsOpen, setIsOpen] = useState(false);
  const [headerIsShown, setIsShown] = useState(true);

  const refinePrompt = async () => {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: userPrompt }),
    })
    const data = await response.json()
    setRefinedPrompt(data.prompt)
    toggleView()
  }

  const toggleView = () => {
    setIsOpen(!modalIsOpen)
    setIsShown(!headerIsShown)
    setInputIsShown(!inputIsShown)
  }

  return (
    <>
      <div className='mt-[25vh] xl:mt-[30vh]'>
        <div className='p-5 xl:px-[50px] text-center'>
          <div className='flex flex-col items-center'>
            {
              headerIsShown ? (
                <div>
                  <h1 className="text-4xl">Refine your prompts</h1>
                  <p className="text-lg mt-2">Enter a prompt and refine it.</p>

                <div className='mt-5'>
                  <div className="divider"></div>
                </div>
              </div>
              ) : (
                <></>
              )
            }

            {
              modalIsOpen ? (
                <div>
                  <div className="justify-end">
                    <button className="btn btn-square btn-sm justify-left" onClick={toggleView}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>

                  <div className="card-body text-left shadow-xl">
                    <h2 className="card-title text-left">Prompt for your idea: {userPrompt}</h2>
                    <p className="text-left">{refinedPrompt}</p>
                  </div>
                </div>
              ) : (
                <></>
              )
            }

            {
              inputIsShown ? (
                <div className="form-control">
                <div className="input-group">
                  <input type="text" placeholder="Enter prompt" className="input input-bordered" value={userPrompt} onChange={(e) => setUserPrompt(e.target.value) }/>
                  <button className="btn btn-square" onClick={refinePrompt}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  </button>
                </div>
              </div>
              ) : (
                <></>
              )
            }
          </div>
        </div>
      </div>
    </>
  )
}
