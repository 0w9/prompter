export default async function handler(req, res) {
  // call the openai api for gpt-3.5-turbo

  const { prompt } = req.body

  const model = "gpt-3.5-turbo"

  const url = "https://api.openai.com/v1/chat/completions"

  const headers = {
    "Content-Type": "application/json",
    "Authorization": 
      `Bearer ${process.env.OPENAI_API_KEY}`
  }

  const data = JSON.stringify({
    "model": "gpt-3.5-turbo",
    "messages": [
      {
        role: "user",
        content: `Hey. Please write a better stable-diffusion text-to-image prompt for this idea: ${prompt}. Please only return the new prompt.`
      }
    ],
  })

  const response = await fetch(url, {
    method: 'POST',
    headers: headers,
    body: data
  })

  const json = await response.json()

  if(json.error) {
    return res.status(500).json({ error: json.error })
  } else {
    // filter all the text of json.choices[0].message.content, remove the wrong spaces and newlines and return the refined prompt
    const refinedPrompt = json.choices[0].message.content.replace(/(\r\n|\n|\r)/gm, " ").replace(/ +(?= )/g,'').replace('Hey. Please write a better stable-diffusion text-to-image prompt for this idea: ', '').replace('Please only return the new prompt.', '')
    return res.status(200).json({ prompt: refinedPrompt })
  }  
}