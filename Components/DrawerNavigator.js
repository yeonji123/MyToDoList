import { createDrawerNavigator } from '@react-navigation/drawer'

import TabNavigator from './TabNavigator'
import CustomDrawerContent from './CustomDrawerContent'

const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {
  // drawerNavigator props와 컴포넌트들
  return (
    <Drawer.Navigator
      drawerPosition='right'
      drawerStyle={{
        backgroundColor: 'skyblue',
        width: 200,
      }}
      drawerContentOptions={{
        activeTintColor: 'blue',
        activeBackgroundColor: 'white'
      }}
      drawerContent={props => <CustomDrawerContent {...props} />} // drawer content : drawer에 보여지는 컴포넌트들
    >
      <Drawer.Screen name="Home" component={TabNavigator} />

    </Drawer.Navigator>
  );
}
export default DrawerNavigator;
