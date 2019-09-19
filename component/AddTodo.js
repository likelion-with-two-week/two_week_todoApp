import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function AddTodo({}) {

    return (
        // console.log('TodoItem compo 안에 넘어오는지 확인', name),

        <SafeAreaView style={styles.todo_add_box}>
            <TextInput
                placeholder={'Todo를 채워주세요'}
                value={this.state.inputTodo}
                onChangeText={this._changeText}
                maxLength={50}
                style={styles.todo_inputBox}></TextInput>

            <TouchableOpacity
                onPress={this._saveTodo}>
                <MaterialIcons name={'playlist-add'} size={30} />
            </TouchableOpacity>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    render_todoList: {
        flexDirection: 'row',
    },
    todo_add_box: {
        borderWidth: 3,
        borderColor: 'purple',
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
    },
    //직접적으로  Text 입력창의 스타일
    todo_inputBox: {
        borderBottomWidth: 1,
        width: 200,
    },
})