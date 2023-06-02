import React, { useState, useEffect } from 'react';
import { 
  View, TextInput, Button, 
  Alert, Text, Image, 
  TouchableOpacity,
} from 'react-native';

import styles from '../Components/Style';

// firebase 연동
import { db } from '../firbaseConfig';
import { collection, getDocs, setDoc } from 'firebase/firestore';

const Join = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);
  const [touchable, setTouchable] = useState(false);



  
  useEffect(() => {
    console.log('Join.js')
    // user 데이터 가져오기
    const a = async () => {
      const data = await getDocs(collection(db, "User"));
      data.docs.map(doc => console.log('users data', doc.data()))
      setUsers(data.docs.map(doc => doc.data()))
    }
    a();


  }, []);



  // 정규식
  // 띄어쓰기 고로시
  const removespace = text => {
    const regex = /\s/g;
    return text.replace(regex, '');
  }

  //아이디 핸들러
  const handleIdChange = (id) => {
    const changeID = removespace(id)
    setUsername(changeID)
    checkjoin() // 회원가입 버튼 활성화 여부
    console.log('check', checkjoin())
  };

  //비밀번호 핸들러
  const handlePwChange = (pw) => {
    const changedPw = removespace(pw);
    setPassword(changedPw);
    checkjoin(); // 회원가입 버튼 활성화 여부
    console.log('check', checkjoin())
  }


  const checkjoin = () => { // 회원가입 버튼 활성화 여부
    console.log('checkjoin username', username)
    console.log('checkjoin pwname', password)
    if (username.length > 4 && password.length >= 6) {
      setTouchable(false)
      return true;
    }
    else {
      setTouchable(true)
      return false
    }
  }

  const handleSignup = () => {

    // 여기서 회원가입 조건문
    const checkuser = users.map(user => {
      if (user.id==username){
        return true
      }else{
        return false
      }
    })


    if(checkuser){
      Alert.alert('동일한 아이디가 있습니다. 다른 아이디를 입력해주세요.')
      setUsername('')
      setPassword('')
    }else if (username.length<4){//아이디 길이는 4보다 길어야함
      Alert.alert('아이디는 4자 이상이어야 합니다.')
      
    }else if (password.length<6){ //비번 길이는 6보다 길어야함
      Alert.alert('비밀번호는 6자 이상이어야 합니다.')
    }else{
      // id와 pw의 조건에 일치한다면
      successSignup()
    }
  };

  const successSignup = async () => {
    // DB 추가
    const docRef = await setDoc(doc(db, "User", username), {
      id: username,
      pw: password,
    });
    console.log("Document written with ID: ", docRef.id);

    Alert.alert('회원가입 성공!');
    props.navigation.navigate('Login');
  }

  return (

    
    <View style={styles.loginView}>

      <Text style={{ fontSize: 30 }}>MyTodoList</Text>
      <Text style={{ fontSize: 20 }}>회원가입</Text>

      <Image style={{ width: 100, height: 100 }} source={require('../assets/logo.gif')} />

      <Text>ID</Text>
      <TextInput
        style={styles.loginInput}
        placeholder="아이디"
        value={username}
        onChangeText={handleIdChange}
      />
      <Text>Password</Text>
      <TextInput
        style={styles.loginInput}
        placeholder="비밀번호"
        secureTextEntry
        value={password}
        onChangeText={handlePwChange}
      />


      <TouchableOpacity
        style={!touchable ? styles.loginButton : [styles.loginButton, { opacity: 0.6 }]}
        onPress={handleSignup}
        disabled={touchable}
      >
        <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white' }}>Signup</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={()=> props.navigation.navigate('Login')}
      >
        <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#B1BDC5' }}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Join;
