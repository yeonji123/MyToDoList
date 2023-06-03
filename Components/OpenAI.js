import { useState } from 'react'
import { Text, TextInput, View, Button } from 'react-native'

const OpenAIText = () => {
  const [text, setText] = useState();
  const [response, setResponse] = useState();

  const generateText = async () => {
    const prompt = text
    const apiKey  = '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'
    const url = 'https://api.openai.com/v1/engines/text-davinci-003/completions'
  
    const headers = {
      "Content-Type" : "application/json",
      Authorization : `Bearer ${apiKey}`
    }

    const data = {
      prompt : prompt,
      max_tokens : 1024,
      temperature:0.7,
    }

    const response = await fetch(url, {
      method:'POST',
      headers : headers,
      body : JSON.stringify(data) // String 형태로 변환환
    })

    // JSON.stringify(result)
    const result = await response.json()

    setResponse(result.choices[0].text) // json 형태로 변환한 후 set
  }

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', }}> OpenAI </Text>
      <TextInput
        style={{ width: 300, height: 40, backgroundColor: 'skyblue', padding: 10 }}
        placeholder='입력하세요'
        value={text}
        onChangeText={(value) => setText(value)}
      />
      <Button
        title='Generate Text'
        onPress={generateText}
      />
      <Text>{response}</Text>
    </View>
  )
}

export default OpenAIText
