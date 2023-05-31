import { useState, } from 'react';
import { View, Text, Image, StyleSheet, } from 'react-native';
// npm i @react-native-community/checkbox
import CheckBox from '@react-native-community/checkbox';

const TodoCom = (props) => {  
    const [toggleCheckBox, setToggleCheckBox] = useState(false)

    return (
        <View style={styles.container}>
            <View style={styles.checkbox}>
                <CheckBox
                    disabled={false}
                    value={toggleCheckBox}
                    onValueChange={(newValue) => setToggleCheckBox(newValue)}
                />
            </View>
            <View style={styles.text}>

            </View>
            <View style={styles.delete}>
                <View style={styles.deleteIcon}>
                    <Image source={{uri:'https://icons-for-free.com/iconfiles/png/512/delete+remove+trash+trash+bin+trash+can+icon-1320073117929397588.png'}} style={{width:30, height:30}}/>
                </View>
            </View>
        </View>
    );
};

export default TodoCom;

const styles=StyleSheet.create({
    container:{
        flexDirection:'row', 
        justifyContent:'center', 
        alignItems:'center', 
        width:'100%', 
        height:60, 
        backgroundColor:'pink',
    },
    checkbox:{
        width:'20%', 
        height:'100%',
    },
    text:{
        width:'60%', 
        height:'100%',
    },
    delete:{
        width:'20%', 
         height:'100%', 
         padding:10,
    },
    deleteIcon:{
        height:'100%', 
        width:'100%', 
        backgroundColor:'red',
        justifyContent:'center', 
        alignItems:'center',
        borderRadius:10,
    }
})