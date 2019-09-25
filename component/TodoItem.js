import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, FlatList, TouchableOpacity,Dimensions } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons, } from '@expo/vector-icons';

const { height, width } = Dimensions.get('window')

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

                <SafeAreaView style={styles.todoList_textBox}>
                    {this.props.isComplete ? 
                    <Text style={styles.todoItemText_complete}>
                        {this.props.name}                    
                    </Text>
                    :
                    <Text style={styles.todoItemText}>{this.props.name}</Text>
                    }

                </SafeAreaView>
                <TouchableOpacity
                    onPress={()=>{
                        this.props.changeComplete()
                        // this.props.navigation.navigate("Todocomplete")
                        // setTimeout(this.props.avigation.navigate("TodoListScreen"), 3000)
                    }
                    }

                    >
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
        alignItems:'center',
        justifyContent:'space-between',
        marginBottom:10,
        padding:10,
    },
    todoItemText:{
        fontSize:30,
        fontFamily:'DungGeunMo',
    },
    todoItemText_complete:{
        textDecorationLine: 'line-through', 
        textDecorationStyle: 'solid' ,
        fontSize: 30,
        fontFamily: 'DungGeunMo',
        color:'grey',
        },
    todo_time:{
        fontSize: 30,
        fontFamily: 'DungGeunMo',
    },
    todoList_textBox:{
        overflow:"scroll",
        width:width*0.6,
    }

})
