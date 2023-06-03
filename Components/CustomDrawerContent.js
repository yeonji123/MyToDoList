import { useEffect, useState } from 'react'
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem
} from '@react-navigation/drawer'
import { View, Image } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'


const CustomDrawerContent = (props) => {
    // drawer에서 보여주는 컴포넌트를 알려줌
    // tabNavigator를 가져오기 때문에 다른 컴포넌트들을 DrawerItem으로 선언함
    // drawer 디자인을 위해 냥이 이미지 추가

    const [id, setId] = useState('')

    useEffect(async () => {
      try {
        console.log('CustomDrawerContent.js')
        const id = await AsyncStorage.getItem('id')
        console.log('id', id)
        setId(id)
        
      } catch (e) {
        console.log('e', e.message)
      }
    }, [])

    const logOut = async ()=>{
        console.log('logout')

        // asyncStorage에 저장된 토큰을 삭제하고 로그인 페이지로 이동
        await AsyncStorage.removeItem('id')
        props.navigation.reset({routes: [{ name: 'Login' }] })

    }



    return (
        <DrawerContentScrollView
            style={{ flex: 1, }}
            {...props}
        >
            <View style={{ justifyContent: 'center' }}>
                <View style={{ alignItems: 'center' }}>
                    <Image
                        style={{ width: 100, height: 100, padding: 10 }}
                        source={require('../assets/logo.gif')}
                    />
                </View>
                <DrawerItemList {...props} />
                <DrawerItem label='Calendar' 
                    onPress={() => props.navigation.navigate('Calendar')}
                />
                <DrawerItem label='ChatGPT'
                    onPress={() => props.navigation.navigate('ChatGPT')}
                />
                
                {
                    id ?
                        <DrawerItem label='Logout'
                            onPress={() => logOut()}
                        />
                        : <DrawerItem label='Login' onPress={() => props.navigation.reset({routes: [{ name: 'Login' }] })} />
                }
                
            </View>
        </DrawerContentScrollView>
    )

}
export default CustomDrawerContent