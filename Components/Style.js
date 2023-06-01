import { 
    StyleSheet, Dimensions,
} from "react-native"

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    // ------------Home----------
    topView: {
        width: Dimensions.get('window').width, 
        height: Dimensions.get('window').height * 0.1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    weatherView: {
        backgroundColor:'#F4F4F4',
        width:'95%',
        height:'100%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    weather: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    temperature: {
        flexDirection: 'row',
        width: '50%',
        height: '100%',
        padding: 5,
    },
    location: {
        width: '50%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    middleView:{
        width: Dimensions.get('window').width, 
        height: Dimensions.get('window').height * 0.67,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    totalcheck:{
        width: '95%',
        height: '100%',
        backgroundColor:'#F4F4F4',
        borderRadius: 10,
    },
    progressView:{
        width: '100%',
        height: '20%',
        padding:8,
        alignItems: 'center',
        backgroundColor:'yellow'
    },
    inputView: {
        width: '100%',
        height: '13%',
        padding:5,
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'orange'
    },
    checklistView: {
        width: '100%',
        height: '67%',
        padding:10,
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'skyblue'
    },
    


    // ------------Home----------   

})
export default style