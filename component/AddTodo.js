import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import BackHeader from './BackHeader';

export default function AddTodo(props) {

    return (
        // console.log('TodoItem compo 안에 넘어오는지 확인', name),


            <SafeAreaView style={styles.todo_add_box}>
                <BackHeader />

                    <SafeAreaView style={styles.input_and_icon}>
                        <TextInput
                            placeholder={'Todo를 채워주세요'}
                            value={props.screenProps.displayvalue}
                            onChangeText={props.screenProps.changemethod}
                            maxLength={50}
                            style={styles.todo_inputBox}></TextInput>

                        <TouchableOpacity
                            onPress={   ()=>{
                                props.screenProps.savemethod()
                                props.navigation.navigate('MainScreen')
                                }
                                }>
                            <MaterialIcons name={'playlist-add'} size={30} />
                        </TouchableOpacity>
                    </SafeAreaView>
            </SafeAreaView>

    )
}

const styles = StyleSheet.create({

    todo_add_box: {
        borderWidth: 3,
        borderColor: 'purple',
        flex: 1,
    },
    //직접적으로  Text 입력창의 스타일
    todo_inputBox: {
        borderBottomWidth: 1,
        width: 200,
        borderWidth:10,
    },
    input_and_icon:{
        flexDirection:'row',
    }
})