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
        // width: Dimensions.get('window').width, 
        // height: Dimensions.get('window').height * 0.67,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    progressView:{
        alignItems: 'center',
    },
    inputView: {
        flexDirection: 'row',
    },
    checklistView: {
        backgroundColor:'#F4F4F4',
        width:'95%',
        height:'100%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    


    // ------------Home----------   

})
export default style