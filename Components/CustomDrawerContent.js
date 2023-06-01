import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem
} from '@react-navigation/drawer'
import { View, Image } from 'react-native'

const CustomDrawerContent = (props) => {
    // drawer에서 보여주는 컴포넌트를 알려줌
    // tabNavigator를 가져오기 때문에 다른 컴포넌트들을 DrawerItem으로 선언함
    // drawer 디자인을 위해 냥이 이미지 추가

    const logOut =()=>{
        console.log('logout')

        // asyncStorage에 저장된 토큰을 삭제하고 로그인 페이지로 이동

        props.navigation.navigate('Logout')

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
                        source={{ uri: 'https://fitpetmall.com/wp-content/uploads/2022/11/shutterstock_1915792003-1024x714.jpg' }}
                    />
                </View>
                <DrawerItemList {...props} />
                <DrawerItem label='Main'
                    onPress={() => props.navigation.navigate('Main')}
                />
                <DrawerItem label='Calendar'
                    onPress={() => props.navigation.navigate('Calendar')}
                />
                <DrawerItem label='Chatbot'
                    onPress={() => props.navigation.navigate('Chatbot')}
                />
                <DrawerItem label='Memo'
                    onPress={() => props.navigation.navigate('Memo')}
                />
                <DrawerItem label='Logout'
                    onPress={() => logOut()}
                />
            </View>
        </DrawerContentScrollView>
    )

}
export default CustomDrawerContent