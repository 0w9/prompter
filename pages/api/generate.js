import posthog  from "posthog-js"

export default async function handler(req, res) {
  const { prompt, model } = req.body

  posthog.capture('my event', { property: 'value' })

  const url = "https://api.openai.com/v1/chat/completions"

  const headers = {
    "Content-Type": "application/json",
    "Authorization": 
      `Bearer ${process.env.OPENAI_API_KEY}`
  }

  console.log(req.body)

  const data = JSON.stringify({
    "model": "gpt-3.5-turbo",
    "messages": [
      {
        role: "user",
        content: `
        What prompt would I have to use to get the best result for the following idea: ${prompt}? 
        The model I am using is  ${model}. 
        Please create a prompt for a ${model} specifically. 
        If its a image model write a prompt that can be used in the speicified model: ${model}, etc. 
        Only return the new prompt and do not include any other text. Do not add quotes around the prompt.`
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
    const refinedPrompt = json.choices[0].message.content.replace(/(\r\n|\n|\r)/gm, " ").replace(/ +(?= )/g,'').replace('Hey. Please write a better stable-diffusion text-to-image prompt for this idea: ', '').replace('Please only return the new prompt.', '')
    return res.status(200).json({ prompt: refinedPrompt })
  }  
}