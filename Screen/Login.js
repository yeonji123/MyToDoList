import React, { useEffect, useState } from 'react';
import {
  View, TextInput,
  Button, Alert, Image,
  TouchableOpacity, Text,
} from 'react-native';

import styles from '../Components/Style';

// firebase 연동
import { db } from '../firbaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = (props) => {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);
  

  useEffect(() => {

    console.log('Login.js')

  }, []);


  const handleLogin = async () => {
    // 여기서 로그인 로직을 구현합니다.
    // 서버와의 통신이나 데이터베이스 연동 등이 필요합니다.
    // 이 예시에서는 간단하게 Alert을 통해 로그인 성공 메시지를 표시합니다.
    console.log('handleLogin')

    // check login
    var checklogin=false


    if (username.length<4){
      Alert.alert('아이디를 4자 이상 입력해주세요.')
    } else if (password.length<4){
      Alert.alert('비밀번호를 4자 이상 입력해주세요.')
    } else{
      checklogin = false
      const data = await getDocs(collection(db, "User"));

      data.docs.map(doc => {
        console.log('user', doc.data())
        if (doc.data().id == username && doc.data().pw == password) {
          // id와 pw가 일치하는 경우
          checklogin = true
        }
      })

      if (checklogin) {
        Alert.alert('로그인 성공!')
        await AsyncStorage.setItem('id', username)
        props.navigation.reset({routes:[{name:"Home"}]})
      }
      else {
        Alert.alert('아이디와 비밀번호를 다시 확인해주세요.')
        setPassword('') // 비밀번호 초기화
      }
    }    
  };



  return (
    <View style={styles.loginView}>
      <Text style={{fontSize:30}}>MyTodoList</Text>

      <Image style={{ width: 100, height: 100 }} source={require('../assets/logo.gif')} />

      <TextInput
        style={styles.loginInput}
        placeholder="아이디"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        style={styles.loginInput}
        placeholder="비밀번호"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />


      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
      >
        <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white' }}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={()=> props.navigation.navigate('Join')}
      >
        <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#B1BDC5' }}>SignUp</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
