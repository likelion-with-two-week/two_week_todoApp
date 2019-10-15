import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput,  TouchableOpacity,Dimensions } from 'react-native';

import BackHeader from './BackHeader';
import { withNavigation } from 'react-navigation'

const { height,width} = Dimensions.get('window')

 function AddTodo(props) {
    tempname = props.navigation.getParam('name')
    tempid  = props.navigation.getParam('check_id')
    console.log(tempname,tempid)
    return (



            
        <SafeAreaView style={styles.todo_add_box}>
            <BackHeader />
            {tempname ? 

            (   <View>
                <View style={styles.add_todolist_container}>
                    <Text style={styles.add_todolist_lefttext}>> ToDo</Text>
                    <Text style={styles.add_todolist_righttext}> Edit</Text>
                </View>

                <SafeAreaView style={styles.input_and_icon}>
                        <TextInput
                            value={props.screenProps.edit_todo_text}
                            onChangeText={props.screenProps.edit_changemethod}
                            maxLength={30}
                            style={styles.todo_inputBox}></TextInput>
                         

                    <TouchableOpacity
                        onPress={() => {
                            props.screenProps.savemethod()
                            props.navigation.navigate('TodoListScreen')
                        }
                        }>
                        <Text style={styles.save_text_style}> >저장하기 </Text>
                    </TouchableOpacity>

                </SafeAreaView>
                </View> )

                : 
                
                (<View>
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
                            onPress={() => {
                                props.screenProps.savemethod()
                                props.navigation.navigate('TodoListScreen')
                            }
                            }>
                            <Text style={styles.save_text_style}> >저장하기 </Text>
                        </TouchableOpacity>

                    </SafeAreaView>
                </View>)
            }
           
        </SafeAreaView>

           
    )
}

const styles = StyleSheet.create({

    todo_add_box: {
        backgroundColor:'#fec8c9',
        flex: 1,
    },
    //직접적으로  Text 입력창의 스타일
    todo_inputBox: {
        paddingLeft: width * 0.03,
        paddingRight: width * 0.02,
        backgroundColor:'#fff',
        height: height/8,
        width: width*0.7,
        borderTopWidth:3,
        borderBottomWidth:7,
        borderLeftWidth:3,
        borderRightWidth:5,
        borderColor:'#444f59',

        fontFamily:'DungGeunMo',
        fontSize: height / 25,
        color:'#444f59',
    },
    input_and_icon:{
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
        color: '#ff7f80',
    },
    add_todolist_righttext: {
        fontSize: width *0.13,
        fontFamily: 'DungGeunMo',
        color: 'white',
    },
   
    save_text_style:{

        color:"#444f59",
        fontSize: height*0.05,
        fontFamily:'DungGeunMo',
    },

})

export default withNavigation(AddTodo);