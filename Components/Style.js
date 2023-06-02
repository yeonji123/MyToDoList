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
        
    },
    checklist: {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        paddingLeft: 10,
    },
    modifyButton:{
        width: '20%',
        height: '75%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },


    // ------------Calendar----------   
    today:{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.05,
        backgroundColor:'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    calendar: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.365,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    calendarView: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.37,
        padding:10,
        justifyContent:'center',
        alignItems:'center',
    },
    calendarData:{
        width:'95%',
        height:'95%',
        borderRadius:10,
        backgroundColor:'#F4F4F4',
        
    },
    schduledate:{
        width:'100%',
        height:'20%',
        alignItems:'center',
        justifyContent:'space-between',
        flexDirection:'row',
        padding:10,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        width : Dimensions.get('window').width*0.9,
        height : Dimensions.get('window').height * 0.25,
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        padding:10,
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
    modalTop:{
        width:'100%',
        height:'20%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    addschedule: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalMid:{
        width:'100%',
        height:'60%',
        justifyContent: 'center',
        alignItems: 'center',
        padding:5,
    },
    addScheduleData:{
        marginTop:10,
        width: '80%', 
        height: '60%', 
        borderWidth: 1, 
        padding: 8, 
        borderRadius: 10, 
        borderColor: '#628281'
    },
    modalBot:{
        width:'100%',
        height:'20%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addBottomButton:{
        width: 80,
        height: '100%',
        borderRadius: 10,
        backgroundColor:'#628281',
        justifyContent: 'center',
        alignItems: 'center',
    }

    // ------------ChatGPT----------   


    // ------------Memo----------   

})
export default style