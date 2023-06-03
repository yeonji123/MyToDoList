import { useState, useEffect } from 'react';
import {
    View, LogBox, Text,
    TextInput, TouchableOpacity,
    ScrollView, Image,
    Keyboard, KeyboardAvoidingView,
    ActivityIndicator
} from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);

import styles from '../Components/Style';





const ChatGPT = () => {
    const [text, setText] = useState();
    const [response, setResponse] = useState();
    const [chatuser, setChatUser] = useState([]); // 채팅 사용자 데이터 저장
    const [chatgpt, setChatGPT] = useState([]); // 채팅 gpt 데이터 저장
    const [first, setFirst] = useState(false)
    const [check, setCheck] = useState(false) // 로딩


    useEffect(() => {
        (async () => {
            try {
                console.log('ChatGPT.js')


            } catch (error) {
                console.log('eerror', error.message)
            }
        })();



    }, []);



    const generateText = async () => {


        setText('') // 입력창 초기화
        Keyboard.dismiss()

        const prompt = text // user question
        const apiKey = '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'
        const url = 'https://api.openai.com/v1/engines/text-davinci-003/completions'

        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`
        }

        const data = {
            prompt: prompt,
            max_tokens: 1024,
            temperature: 0.7,
        }

        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data) // String 형태로 변환환
        })

        // gpt answer
        // JSON.stringify(result)
        const result = await response.json()
        const answer = result.choices[0].text // gpt answer
        setCheck(false) // 로딩
        setResponse(result.choices[0].text) // json 형태로 변환한 후 set

        setChatUser([...chatuser, text]) // user question
        setChatGPT([...chatgpt, answer]) // gpt answer


    }


    return (
        <View style={styles.container}>

            <View style={styles.chatinput}>
                <TextInput
                    style={styles.addinput}
                    placeholder="Enter a task..."
                    value={text}
                    onChangeText={setText}
                />
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => {
                        setCheck(true)
                        generateText()
                    }}
                >
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#43655A' }}>Add</Text>
                </TouchableOpacity>
            </View>

            <KeyboardAvoidingView
                style={styles.chatView}
                behavior={"padding"}
                onPress={() => { Keyboard.dismiss() }}
            >
                <ScrollView>
                    {
                        chatuser && chatuser.length == 0 ?
                            <View style={[styles.chatView, { justifyContent: 'center', alignItems: 'center' }]}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Chat GPT에게 물어보세요!</Text>
                                <Text style={{ marginTop: 10 }}>채팅으로 물어봐요</Text>
                                <View style={{ width: 60, height: 60, backgroundColor: 'white', justifyContent: 'center', marginRight: 10 }}>
                                    <Image style={{ width: '100%', height: '100%' }} source={{ uri: 'https://cdn.icon-icons.com/icons2/1234/PNG/512/1492719128-robot_83633.png' }}></Image>
                                </View>
                            </View> :
                            null
                    }
                    {
                        chatuser?.map((item, idx) => {
                            return (
                                <>
                                    <View style={styles.questionView} key={idx}>
                                        <View style={styles.question}>
                                            <Text>{item}</Text>
                                        </View>
                                    </View>

                                    <View style={styles.answerView}>
                                        <View style={{ flexDirection: 'row', backgroundColor: 'white', alignItems: 'center', }}>
                                            <View style={{ width: 40, height: 40, backgroundColor: 'white', justifyContent: 'center', marginRight: 10 }}>
                                                <Image style={{ width: '100%', height: '100%' }} source={{ uri: 'https://cdn.icon-icons.com/icons2/1234/PNG/512/1492719128-robot_83633.png' }}></Image>
                                            </View>

                                            <View style={styles.answer}>
                                                <Text>{chatgpt[idx]}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </>
                            )

                        })
                    }
                    {
                        check ?
                            <ActivityIndicator /> : null
                    }

                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};

export default ChatGPT;