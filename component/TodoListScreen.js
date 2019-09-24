
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, FlatList, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import BackHeader from './BackHeader'

export default function TodoListScreen(props) {

    return (
        // console.log('TodoItem compo 안에 넘어오는지 확인', name),
        <SafeAreaView style={styles.todo_area}>
            <BackHeader />

            <SafeAreaView style={styles.todo_list_box}>
                <FlatList
                    data={props.screenProps.listData}
                    renderItem={props.screenProps.renderMethod}
                    keyExtractor={(item, index) => index.toString()} 
                   />
            </SafeAreaView>
        </SafeAreaView>

    )
}






const styles = StyleSheet.create({


    //Todo설정과 관련한 부분이 뜨는 부분
    todo_area: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        borderWidth: 5,
        borderColor: 'red',
    },
    //Todo 지역 내의 Todo List가 랜더링 되는 부분을 구분하는 box
    todo_list_box: {
        borderWidth: 3,
        borderColor: 'green',
        marginBottom: 5,
        flex: 3,
    },


});
