import Head from 'next/head'
import { Inter, Modern_Antiqua } from '@next/font/google'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [userPrompt, setUserPrompt] = useState('')
  const [refinedPrompt, setRefinedPrompt] = useState('')
  const [modalClassName, setModalClassName] = useState('hidden')
  const [inputClassName, setInputClassName] = useState('form-control')
  const [headerClassName, setHeaderClassName] = useState('')

  const toggleModal = () => {
    if(modalClassName === 'hidden') {
      setModalClassName('')
    } else {
      setModalClassName('')
    }
  }

  const toggleInput = () => {
    if(inputClassName === 'form-control hidden') {
      setInputClassName('form-control')
    } else {
      setInputClassName('form-control hidden')
    }
  }

  const toggleHeader = () => {
    if(headerClassName === 'hidden') {
      setHeaderClassName('')
    } else {
      setHeaderClassName('hidden')
    }
  }

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
    toggleModal()
    toggleInput()
    //toggleHeader()
  }

  return (
    <>
      <div className='mt-[25vh] xl:mt-[30vh]'>
        <div className='p-5 xl:px-[50px] text-center'>
          <div className='flex flex-col items-center'>
            <div className={headerClassName}>
              <h1 className="text-4xl">Refine your prompts</h1>
              
              <p className="text-lg mt-2">Enter a prompt and refine it.</p>

              <div className='mt-5'>
                <div className="divider"></div>
              </div>

            </div>

            <div className={modalClassName}>
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

              <div className={inputClassName}>
                <div className="input-group">
                  <input type="text" placeholder="Enter prompt" className="input input-bordered" value={userPrompt} onChange={(e) => setUserPrompt(e.target.value) }/>
                  <button className="btn btn-square" onClick={refinePrompt}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  </button>
                </div>
              </div>
          </div>
        </div>
      </div>
    </>
  )
}
