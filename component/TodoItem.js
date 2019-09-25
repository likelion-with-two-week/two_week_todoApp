import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons, } from '@expo/vector-icons';


export default class TodoItem extends React.Component {
    // { name, isComplete, changeComplete, deleteItem }

    render(){
        return (
            // console.log('TodoItem compo 안에 넘어오는지 확인', name),

            <SafeAreaView style={styles.render_todoList}>
                <SafeAreaView >
                    {/* <TouchableOpacity
                        onPress={this.props.deleteItem}>
                        <MaterialCommunityIcons name="delete-empty" size={30} />

                    </TouchableOpacity> */}
                    <Text style= {styles.todo_time}>{this.props.starthour}:{this.props.startminutes}→</Text>
                </SafeAreaView>

                <SafeAreaView>

                    <Text style={styles.todoItemText}>{this.props.name}</Text>

                </SafeAreaView>
                <TouchableOpacity
                    onPress={this.props.changeComplete}>
                    <MaterialCommunityIcons name={this.props.isComplete ? 'checkbox-intermediate' : 'checkbox-blank-outline'} size={50} color="#454552" />
                </TouchableOpacity>
                
            </SafeAreaView>
        )
    }
   
}

const styles = StyleSheet.create({
    render_todoList:{
        flexDirection:'row',
        backgroundColor:'#fff',
        height:80,
        alignItems:'center',
        justifyContent:'space-between',
        marginBottom:10,
        paddingLeft:10,
    },
    todoItemText:{
        fontSize:30,
        fontFamily:'DungGeunMo',
    },
    todo_time:{
        fontSize: 30,
        fontFamily: 'DungGeunMo',
    }

})