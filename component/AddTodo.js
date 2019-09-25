import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, FlatList, TouchableOpacity,Dimensions } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons,AntDesign } from '@expo/vector-icons';

import BackHeader from './BackHeader';

const { height,width} = Dimensions.get('window')

export default function AddTodo(props) {

    return (
        // console.log('TodoItem compo 안에 넘어오는지 확인', name),


            <SafeAreaView style={styles.todo_add_box}>
                <BackHeader />

                    <View style={styles.add_todolist_container}>
                        <Text style={styles.add_todolist_lefttext}>> ToDo</Text>
                        <Text style={styles.add_todolist_righttext}> Write</Text>
                    </View>

                    <SafeAreaView style={styles.input_and_icon}>
                        <TextInput
                            placeholder={'Todo를 채워주세요'}
                            value={props.screenProps.displayvalue}
                            onChangeText={props.screenProps.changemethod}
                            maxLength={30}
                            style={styles.todo_inputBox}></TextInput>

                        <TouchableOpacity
                            onPress={   ()=>{
                                props.screenProps.savemethod()
                                props.navigation.navigate('MainScreen')
                                }
                                }>
                        {/* <View style={styles.save_text_container_style}> */}
                            <Text style={styles.save_text_style}> >저장하기 </Text>
                        {/* </View> */}
                        {/* <AntDesign name={'form'} color="#d8e9ef"size={height*0.15} /> */}
                        </TouchableOpacity>
                    </SafeAreaView>
            </SafeAreaView>

    )
}

const styles = StyleSheet.create({

    todo_add_box: {
        backgroundColor:'#454552',
        flex: 1,
    },
    //직접적으로  Text 입력창의 스타일
    todo_inputBox: {
        paddingLeft: width * 0.03,
        paddingRight: width * 0.02,

        height: height/8,
        width: width*0.7,
        borderTopWidth:3,
        borderBottomWidth:7,
        borderLeftWidth:3,
        borderRightWidth:5,
        borderColor:'#d8e9ef',

        fontFamily:'DungGeunMo',
        fontSize: height / 25,
        color:'#d8e9ef',
    },
    input_and_icon:{
        // borderWidth:5,
        // flexDirection:'col',
        height:height*0.4,
        alignItems:'center',
        justifyContent:'space-around',
        paddingHorizontal:width*0.07,
    },
    add_todolist_container: {
        flexDirection: 'row',
        marginBottom: height * 0.02,
        marginLeft: width * 0.05,
    },
    add_todolist_lefttext: {
        fontSize: width*0.13,
        fontFamily: 'DungGeunMo',
        color: '#e85a71',
    },
    add_todolist_righttext: {
        fontSize: width *0.13,
        fontFamily: 'DungGeunMo',
        color: 'white',
    },
    save_text_container_style:{
        paddingLeft: width * 0.03,
        paddingRight: width * 0.02,

        height: height / 12,
        width: width * 0.5,
        borderTopWidth: 3,
        borderBottomWidth: 7,
        borderLeftWidth: 3,
        borderRightWidth: 5,
        borderColor: '#d8e9ef',
        alignItems:'center',
        justifyContent:'center',
    },
    save_text_style:{

        color:"#d8e9ef",
        fontSize: height*0.05,
        fontFamily:'DungGeunMo',
    },

})