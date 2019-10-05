
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView,  FlatList,  Dimensions,TouchableOpacity,Image } from 'react-native';
import { AntDesign} from '@expo/vector-icons';
import BackHeader from './BackHeader'
const { height, width } = Dimensions.get('window')

export default class TodoListScreen extends React.Component {

   render(){
       return (
           <SafeAreaView style={styles.todo_area}>
               <BackHeader />

               <View style={styles.todolist_container}>
                   <Text style={styles.todolist_lefttext}>> ToDo</Text>
                   <Text style={styles.todolist_righttext}> List</Text>
               </View>

               <SafeAreaView style={styles.todo_list_box}>
                   <FlatList
                       data={this.props.screenProps.listData}
                       renderItem={this.props.screenProps.renderMethod}
                       keyExtractor={(item, index) => index.toString()}
                   />
               </SafeAreaView>

               <SafeAreaView style={styles.list_to_addpage_box}>
                   <TouchableOpacity
                       onPress={() => {
                           this.props.navigation.navigate('AddScreen')
                       }}>
                       {/* <Image source={require('../assets/흰색버튼.png')} style={styles.whitebuttom} resizeMode='contain'/> */}
                       <AntDesign name="pluscircleo" size={width * 0.18} color="white" />
                   </TouchableOpacity>
               </SafeAreaView>

           </SafeAreaView>

       )
   }

}






const styles = StyleSheet.create({


    //Todo설정과 관련한 부분이 뜨는 부분
    todo_area: {
        flex: 1,
        backgroundColor: '#fec8c9',
        justifyContent: 'center',

    },
    //Todo 지역 내의 Todo List가 랜더링 되는 부분을 구분하는 box
    todo_list_box: {
        flex: 3,
        // borderWidth:5,
        // borderColor:'green'
    },
    todolist_container: {
        flexDirection: 'row',
        marginBottom: height*0.05,
        marginLeft:width*0.05,
    },
    todolist_lefttext: {
        fontSize: width*0.12,
        fontFamily: 'DungGeunMo',
        color: '#ff7f80',
    }, 
    todolist_righttext: {
        fontSize: width * 0.12,
        fontFamily: 'DungGeunMo',
        color: '#fff',
    },
    list_to_addpage_box:{
        // flex:1,
        // borderWidth:5,
        borderColor:'white',
        alignItems:'flex-end',
        padding:width*0.04,
        justifyContent:'flex-end'
    },
    // whitebuttom:{
    //     // borderWidth:4,
    //     // borderColor:'red',
    //     width:  width * 0.25,
    //     height: width * 0.25,
    // }
});
