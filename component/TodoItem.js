import React from 'react';
import { StyleSheet, Text,  SafeAreaView,   TouchableOpacity,Dimensions } from 'react-native';
import {  MaterialCommunityIcons, } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation'

const { height, width } = Dimensions.get('window')

class TodoItem extends React.Component {

    render(){
        return (

            <SafeAreaView style={styles.render_todoList}>
                <SafeAreaView>
                 
                    {this.props.isComplete ?
                        <Text style={styles.todo_time_complete}>{this.props.starthour}:{this.props.startminutes}→</Text>
                        :
                        <Text style={styles.todo_time}>{this.props.starthour}:{this.props.startminutes}→</Text>
                    }
                </SafeAreaView>

                <SafeAreaView style={styles.todoList_textBox}>
                    <TouchableOpacity 
                        onPress={()=>{
                            this.props.navigation.navigate('AddScreen',{"name":this.props.name,"check_id": this.props.check_id})
                        }                            
                        }>
                        {this.props.isComplete ? 
                            <Text style={styles.todoItemText_complete}>
                                {this.props.name}                    
                            </Text>
                        :
                            <Text style={styles.todoItemText}>{this.props.name}</Text>
                        }
                    </TouchableOpacity>
                </SafeAreaView>

                {this.props.isComplete?
                    <TouchableOpacity>
                        <MaterialCommunityIcons name={'checkbox-intermediate'} size={width * 0.13} color="#444f59" />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity
                        onPress={() => {
                            this.props.changeComplete()
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
        padding:width*0.04,
        // borderColor:'green',
        // borderWidth:5,
    },
    todoItemText:{
        fontSize:width*0.06,
        fontFamily:'DungGeunMo',
    },
    todoItemText_complete:{
        textDecorationLine: 'line-through', 
        textDecorationStyle: 'solid' ,
        fontSize: width * 0.06,
        fontFamily: 'DungGeunMo',
        color:'#444f59',
        },
    todo_time:{
        fontSize: width * 0.06,
        fontFamily: 'DungGeunMo',
    },
    todo_time_complete:{
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid',
        fontSize: width * 0.06,
        fontFamily: 'DungGeunMo',
        color: '#444f59',
    },
    todoList_textBox:{
        overflow:"scroll",
        width:width*0.4,
        marginLeft:width*0.03,
        marginRight: width * 0.02
    }

})
export default withNavigation(TodoItem);