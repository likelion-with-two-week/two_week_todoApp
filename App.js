import React from 'react';
import { StyleSheet, Text,SafeAreaView,TextInput,FlatList,TouchableOpacity,KeyboardAvoidingView,ScrollView } from 'react-native';
import { MaterialIcons ,MaterialCommunityIcons} from '@expo/vector-icons';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import TodoItem from './component/TodoItem';
import AddTodo from './component/AddTodo';

const addNavi = createStackNavigator(

  {
    Add:AddTodo
  },
  {
    // mode : 'modal'
    headerMode: 'none'
  }
)

const mainNavi = createAppContainer(addNavi)



export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state={
      inputTodo : '',
      todos:[
        {
          title:'테스트 셋',
          iscomplete: false,
        }
       
      ],
    }
  }

  _changeText = (value) => {
    this.setState({ inputTodo:value})
    // console.log(value)
  }
  _saveTodo = () =>{
    if(this.state.inputTodo !== ''){
      const prevTodo = [...this.state.todos]
      const newTodo = { title: this.state.inputTodo, iscomplete: false }
      this.setState({
        inputTodo: '',
        todos: prevTodo.concat(newTodo)
      })
    }
    else{
      alert('내용을 입력해주세요!')
    }
   
  }

  _makeTodoList = ({index,item}) =>{
    return(
      // console.log(index),
    // console.log("maketodoList method내부 확인" , item.title),
    <TodoItem 
      name={item.title}
      isComplete = {item.iscomplete}
      changeComplete={()=>{
        const reverseTodo =[...this.state.todos]
        reverseTodo[index].iscomplete = !reverseTodo[index].iscomplete
        this.setState({todos:reverseTodo})
      }}
      deleteItem={()=>{
        const deleteTodo = [...this.state.todos]
        deleteTodo.splice(index,1)
        this.setState({todos:deleteTodo})
      }}
    />
    )
  }
  //이부분에 아이콘을 누르면 method가 실행되게 하는데 해당 emthod는 우리의 TodoItem으로 method를 전달해주는 역할을 하는 애가 되면 될것 같다
  render(){
    // console.log("state가 가진 todo check" , this.state.todos)
    return (
      <SafeAreaView style = {styles.main_background}>


        <mainNavi/>

        <SafeAreaView style={styles.character_area}>

          <Text>Main Page가 될 예정입니다.</Text>

        </SafeAreaView>
          <KeyboardAvoidingView style={styles.todo_avodingView} keyboardVerticalOffset={0}>
              <SafeAreaView style={styles.todo_area}>
                    <SafeAreaView style = {styles.todo_list_box}>
                        <FlatList
                          data={this.state.todos}
                          renderItem={this._makeTodoList}
                          keyExtractor={(item, index) => index.toString()} />
                        
                    </SafeAreaView>

                    
                    {/* <SafeAreaView style={styles.todo_add_box}>
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

                    </SafeAreaView> */}
                    <TouchableOpacity>
                      <MaterialCommunityIcons name="plus-circle" size={30}/>
                    </TouchableOpacity>
              </SafeAreaView>
          </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
  
}

const styles = StyleSheet.create({
  //Main 화면의 background작업을 하기위한
  main_background:{
    flex:1,
  },
  //캐릭터 부분이 뜨는 공간
  character_area: {
    flex: 3,
    backgroundColor: '#fff',
    alignItems:'center',
    justifyContent:'center',

    borderWidth:5,
    borderColor: 'blue',

  },

  //Todo설정과 관련한 부분이 뜨는 부분
  todo_area: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    borderWidth: 5,
    borderColor:'red',
  },
  //Todo 지역 내의 Todo List가 랜더링 되는 부분을 구분하는 box
  todo_list_box:{
    borderWidth:3,
    borderColor:'green',
    marginBottom:5,
    flex:3,
  },


  //Todo 지역 내의 add 관련 기능을 담당하고 있음

  // todo_add_box: {
  //   borderWidth: 3,
  //   borderColor: 'purple',
  //   flexDirection: 'row',
  //   flex:1,
  //   justifyContent:'space-between',
  // },
  // //직접적으로  Text 입력창의 스타일
  // todo_inputBox:{
  //   borderBottomWidth:1,
  //   width:200,
  // },

  todo_avodingView:{
    flex:1,
  }
});
