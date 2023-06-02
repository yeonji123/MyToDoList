import { 
    StyleSheet, Dimensions,
} from "react-native"

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    // ------------Login----------
    loginView: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        marginTop:120,
        alignItems: 'center',
        textAlign: 'center',
    },
    loginInput: {
        width: '50%',
        height: 40,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        fontSize: 16,
        color: '#333',
        marginBottom: 10,
    },
    loginButton: {
        width: 80,
        backgroundColor: '#889FA5',
        height: 30,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginBottom:10,
    },
    joinButton: {
        width: 80,
        backgroundColor: '#B1BDC5',
        height: 30,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
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
        height: '16%',
        padding:8,
        alignItems: 'center',
    },
    inputView: {
        width: '100%',
        height: '13%',
        padding:5,
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center',
    },
    addinput:{
        width: '70%', 
        height: '81%', 
        borderWidth: 1, 
        padding: 8, 
        borderRadius: 10, 
        borderColor: '#628281'
    },
    addButton:{
        width: '20%',
        backgroundColor:'#889FA5',
        height: '75%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
    checklistView: {
        width: '100%',
        height: '67%',
        padding:10,
        flexDirection: 'row',
    },
    checklist: {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        paddingLeft: 10,
    },
    deleteButton:{
        width: '20%',
        backgroundColor:'#FFE8F7',
        height: '75%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    }


    // ------------Calendar----------   



    // ------------ChatGPT----------   


    // ------------Memo----------   

})
export default style