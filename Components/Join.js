import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';

const Join = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    // 여기서 회원가입 로직을 구현합니다.
    // 서버와의 통신이나 데이터베이스 연동 등이 필요합니다.
    // 이 예시에서는 간단하게 Alert을 통해 회원가입 성공 메시지를 표시합니다.
    Alert.alert('회원가입 성공', `Username: ${username}\nPassword: ${password}`);
  };

  return (
    <View>
      <TextInput
        placeholder="ID"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <Button title="회원가입" onPress={handleSignup} />
    </View>
  );
};

export default Join;
