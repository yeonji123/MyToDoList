import { Image } from 'react-native'


function TabBarIcon  (focused, name)  {
  let iconImagePath;

  if (name==='Main'){
    iconImagePath = require('../assets/Home.png')
  }else if(name==='Calendar'){
    iconImagePath = require('../assets/Calendar.png')
  } else if (name==='ChatGPT'){
    iconImagePath = require('../assets/ChatGPT.png')
  } else if (name==='Memo'){
    iconImagePath = require('../assets/Memo.png')
  }

  return (
    <Image
      style={{
        width : focused ? 24:20,
        height : focused ? 24:20,
      }}
      source={iconImagePath}
    />
  )
}
export default TabBarIcon;