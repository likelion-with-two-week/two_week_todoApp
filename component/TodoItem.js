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
                
                    {this.props.isComplete ?
                        <Text style={styles.todo_time_complete}>{this.props.starthour}:{this.props.startminutes}→</Text>

                        :
                        <Text style={styles.todo_time}>{this.props.starthour}:{this.props.startminutes}→</Text>

                    }
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

                {this.props.isComplete?
                    <TouchableOpacity>
                        <MaterialCommunityIcons name={'checkbox-intermediate'} size={width * 0.13} color="#444f59" />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity
                        onPress={() => {
                            this.props.changeComplete()
                            // this.props.navigation.navigate("Todocomplete")
                            // setTimeout(this.props.avigation.navigate("TodoListScreen"), 3000)
                        }
                        }

                    >
                        <MaterialCommunityIcons name={'checkbox-blank-outline'} size={width * 0.13} color="#444f59" />
                    </TouchableOpacity>
                    
                    
                    
                }
               
                
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
        marginBottom:height*0.03,
        padding:width*0.035,
    },
    todoItemText:{
        fontSize:width*0.07,
        fontFamily:'DungGeunMo',
    },
    todoItemText_complete:{
        textDecorationLine: 'line-through', 
        textDecorationStyle: 'solid' ,
        fontSize: width * 0.07,
        fontFamily: 'DungGeunMo',
        color:'#444f59',
        },
    todo_time:{
        fontSize: width * 0.07,
        fontFamily: 'DungGeunMo',
    },
    todo_time_complete:{
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid',
        fontSize: width * 0.07,
        fontFamily: 'DungGeunMo',
        color: '#444f59',
    },
    todoList_textBox:{
        overflow:"scroll",
        width:width*0.6,
        marginLeft:width*0.03,
        marginRight: width * 0.02
    }

})
