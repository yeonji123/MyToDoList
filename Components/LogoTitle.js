import {Image, View, Text} from 'react-native'

const LogoTitle = (name) =>{
  let iconImagePath;
  
  // porps로 받아온 것이 Home, Calendar, ChatGPT, Memo이라면 각 아이콘을 상단에 보여줌
  // 그리고 어떤 페이지인지 타이틀도 보여줌
  if (name==='Home'){ 
    iconImagePath = require('../assets/Home.png')
  }else if(name==='Calendar'){
    iconImagePath = require('../assets/Calendar.png')
  } else if (name==='ChatGPT'){
    iconImagePath = require('../assets/ChatGPT.png')
  }

  return (
    <View style={{flexDirection:'row', alignItems:'center', padding:10}}>
      
        <Image
          style={{ width: 40, height: 40, padding: 10 }}
          source={iconImagePath}
        />
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 20, color: '#371f18' }}>{name}</Text>
      
    </View>
  )
}
export default LogoTitle