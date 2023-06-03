import { useState, useEffect } from 'react';
import {
    View, LogBox, Text,
    TextInput, TouchableOpacity,
    ScrollView, Image,
    Keyboard, KeyboardAvoidingView,
    Button,
} from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);

import styles from '../Components/Style';

import AsyncStorage from '@react-native-async-storage/async-storage'
import { set } from 'react-native-reanimated';




const ChatGPT = () => {
    const [text, setText] = useState();
    const [response, setResponse] = useState();
    const [date, setDate] = useState(); // 현재 시간 저장
    const [chatuser, setChatUser] = useState([]); // 채팅 사용자 데이터 저장
    const [chatgpt, setChatGPT] = useState([]); // 채팅 gpt 데이터 저장
    
    useEffect(() => {
        (async () => {
            try {
                console.log('ChatGPT.js')
                const today = new Date().toLocaleDateString() // 현재 시간 저장
                setDate(today) // 현재 시간 저장



                // 디바이스에 저장되어 있는 값 가져오기
                // 오늘 날짜 가져오기
                const localDate = await AsyncStorage.getItem('date') // 디바이스에 저장되어 있는 데이터의 날짜
                console.log('localDate', localDate)
                console.log('date', today) // 오늘 날짜


                // 디바이스에 저장되어 있는 데이터의 날짜와 현재 날짜가 다르면
                if (localDate==null || localDate != today) { 
                    // 디바이스에 저장한 데이터의 날짜
                    // 날짜 저장
                    await AsyncStorage.setItem('date', localDate)

                    setChatGPT([]) // 빈배열로 저장
                    setChatUser([]) // 빈배열로 저장
                }else{
                    // 만약에 같으면
                    console.log('동일하면')
                    const localdata = getArrayFromAsyncStorage('localuserdata')
                    console.log('localdata', localdata._z) 
                    if (localdata != null) {
                        const chating = getArrayFromAsyncStorage('localuserdata')
                        const chatinggpt = getArrayFromAsyncStorage('localgptdata')
                        console.log('chating', chating._z)
                        console.log('chatinggpt', chatinggpt._z)
                        setChatUser(chating._z)
                        setChatGPT(chatinggpt._z)
                    }

                }


            } catch (error) {
                console.log('eerror', error.message)
            }
        })();
       


    }, []);



    const generateText = async () => {
        setText('') // 입력창 초기화


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
        setResponse(result.choices[0].text) // json 형태로 변환한 후 set


        // 로컬에 저장할거임
        console.log('text',text)
        console.log('ans', answer)
        console.log('chatuser', chatuser)
        console.log('chatgpt', chatgpt)

        if (chatuser == null) {
            console.log('null check chatuser')
            setChatUser(text)
        } else {
            setChatUser([...chatuser, text]) // user question
        }
        if (chatgpt == null) {
            setChatGPT(answer)
        } else {
            setChatGPT([...chatgpt, answer]) // gpt answer
        }

        // 디바이스에 저장
        saveArrayToAsyncStorage('localuserdata', chatuser)
        saveArrayToAsyncStorage('localgptdata', chatgpt)

    }

    // 배열을 AsyncStorage에 저장하는 함수
    const saveArrayToAsyncStorage = async (key, array) => {
        try {
            const serializedArray = JSON.stringify(array);
            await AsyncStorage.setItem(key, serializedArray);
            console.log('Array saved to AsyncStorage.');
        } catch (error) {
            console.error('Error saving array to AsyncStorage:', error);
        }
    };

    // AsyncStorage에서 배열을 가져오는 함수
    const getArrayFromAsyncStorage = async (key) => {
        try {
            const serializedArray = await AsyncStorage.getItem(key);
            console.log('serializedArray', serializedArray)
            if (serializedArray !== null) {
                const array = JSON.parse(serializedArray);
                // console.log('Array retrieved from AsyncStorage:', array);
                return array;
            }else{
                return array
            }
        } catch (error) {
            console.error('Error retrieving array from AsyncStorage:', error);
        }
        return [];
    };

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
                    onPress={generateText}
                >
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#43655A' }}>Add</Text>
                </TouchableOpacity>
            </View>

            <KeyboardAvoidingView
                style={styles.chatView}
                behavior={"padding"}
                onPress={() => {
                    
                    Keyboard.dismiss()}}
            >
                <Button title='test' onPress={()=>getArrayFromAsyncStorage('localuserdata')}/>

                <ScrollView>
                    {
                        chatuser && chatuser.length == 0 ?
                            <View style={[styles.chatView, { justifyContent: 'center', alignItems: 'center' }]}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Chat GPT에게 물어보세요!</Text>
                                <Text style={{marginTop:10}}>채팅으로 물어봐유</Text>
                                <View style={{ width: 60, height: 60, backgroundColor: 'white', justifyContent: 'center', marginRight: 10 }}>
                                    <Image style={{ width: '100%', height: '100%' }} source={{ uri: 'https://cdn.icon-icons.com/icons2/1234/PNG/512/1492719128-robot_83633.png' }}></Image>
                                </View>
                            </View> :
                            null
                    }
                    {/* {
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
                    } */}


                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};

export default ChatGPT;