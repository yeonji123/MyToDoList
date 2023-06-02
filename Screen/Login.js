import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';

// firebase 연동
import { db } from '../firbaseConfig';
import { addDoc, collection, getDocs } from 'firebase/firestore';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    console.log('Login.js')
  }, []);


  const handleLogin = async () => {
    // 여기서 로그인 로직을 구현합니다.
    // 서버와의 통신이나 데이터베이스 연동 등이 필요합니다.
    // 이 예시에서는 간단하게 Alert을 통해 로그인 성공 메시지를 표시합니다.

          


    Alert.alert('로그인 성공', `Welcome, ${username}!`);
  };

  return (
    <View>
      <TextInput
        placeholder="아이디"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        placeholder="비밀번호"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <Button title="로그인" onPress={handleLogin} />
    </View>
  );
};

export default Login;
