import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons, } from '@expo/vector-icons';


export default function TodoItem({name,isComplete,changeComplete,deleteItem}) {

    return (
        // console.log('TodoItem compo 안에 넘어오는지 확인', name),

        <SafeAreaView style= {styles.render_todoList}>
            <SafeAreaView>
                <TouchableOpacity
                    onPress={changeComplete}>
                    <MaterialCommunityIcons name={isComplete ? 'checkbox-multiple-marked':'checkbox-multiple-blank-outline'} size={30}/>
                </TouchableOpacity>
            </SafeAreaView>

            <SafeAreaView>

                <Text>{name}</Text>

            </SafeAreaView>

            <TouchableOpacity
                onPress={deleteItem}>
                <MaterialCommunityIcons name="delete-empty" size={30}/>

            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    render_todoList:{
        flexDirection:'row',
        borderWidth: 5,
        borderColor: "pink",
        
    },
  

})