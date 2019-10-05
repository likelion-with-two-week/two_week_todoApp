import React from 'react';
import { StyleSheet, SafeAreaView, StatusBar,Alert } from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import * as ImagePicker from 'expo-image-picker';

import TodoItem from './component/TodoItem';
import AddTodo from './component/AddTodo';
import MainScreen from './component/MainScreen';
import TodoListScreen from './component/TodoListScreen';
import Todocomplete from './component/Todocomplete';
import { AsyncStorage } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';

// TaskManager.defineTask("noticheck", () => {
//   try {
//     console.log("동작중입니다  이 시간에: ", new Date())
//     //App 내부에 있는 check method사용하고싶음
//   } catch (error) {
//     console.log("fail!")
//   }
// })
// TaskManager.isTaskRegisteredAsync("noticheck")



const AddNavi = createStackNavigator(
  {
  
    MainScreen: {
      screen: MainScreen
    },
    AddScreen: {
      screen: AddTodo
    },
    TodoListScreen:{
      screen : TodoListScreen
    }, 
    Todocomplete:{
      screen: Todocomplete
    },

  },
   

  {
    headerMode: 'none',
    initialRouteName: 'MainScreen', 
  }
)

const MainNavi = createAppContainer(AddNavi)
  

export default class App extends React.Component {
   constructor(props) {
    super(props)
    this.state = {
      random_flag: 0,
      inputname: '',
      username: '',
      MainScore: 50,  //Todo List의 check를 해서 score를 누적시켜서 우리가 하고자하는 사진과의 crop을 설정한다

      imageUri: '',  //우리가 main 얼굴로 넣을 image를 선정한다

      inputTodo: '',
      todos: [

      ],
      success_todos: [

      ],

      hate_imageUri: '',
      normal_mention: [
        '씨 반가워요! \n우리 같은 팀이죠? 잘 부탁해요. \n오늘 할 일은 뭔가요?',
        '씨 \n 오늘 할 일 하셨어요?? 모두 완료하시려면 서둘러야겠어요!',
        '씨 \n오늘 할 일은 더 없는 거예요? \n수고 많으셨어요!!',
      ],
      good_mention: [
        '! \n오늘도 좋은 하루야, \n오늘 할 일 나랑 같이할래?',
        '! \n오늘 할 일 빨리하고 \n내 거 좀 도와주라♡ 응???',
        '! \n오늘 할 일 빨리 끝내고 \n나랑 놀러 가자~',
      ],
      bad_mention: [
        ' 오늘부터 \n같이 일하게 된 제 친구예요', '너 진짜 성실하다~?', '남은 할 일 좀 빨리해주세요 ',
      ],
      bad_mention_two: [
        '아.. \n안녕하세요...?', '에이 \n뭐 이런걸가지고', '우리 빨리 가야 한단 말이에요!',
      ],

    }

  }




  askPermissions = async () => {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;

    }
    if (finalStatus !== 'granted') {
      return false;
    }
    return true;
  };


// _sendNotificationImmediately = async () => {
//   let notification_Id = await Notifications.presentLocalNotificationAsync({
//     title: '환영합니다!',
//     body: '계속 열심히해주세요~',

//   });
  // console.log(notification_Id); // can be saved in AsyncStorage or send to server
// };


//주기적으로 local noti를 보내기위해서 설정해줘야하는 것
  // scheduleNotification = async () => {
  //   let notificationId = await Notifications.scheduleLocalNotificationAsync(
  //     {
  //       title: new Date().toString(),
  //       body: '아마도 당신은 투두를 다 안했을껄?',
  //     },
  //     {
  //       repeat: 'minute',
  //       time: new Date().getTime() + 10000,
  //     },
  //   );
  //   console.log(notificationId);
  // };

  _storeData = async () => {
    await AsyncStorage.setItem('@todolove:state', JSON.stringify(this.state))
  }

  _getData = async () => {
    const mystate = await AsyncStorage.getItem("@todolove:state")
    if (mystate !== null) {
      this.setState(JSON.parse(mystate))
    }
  }

//클리어도 하나 넣어주자 .clear()
  async componentDidMount() {
    await this._getData()
    // AsyncStorage.clear()
    this._checkScore()

    this._overTimer()

    setInterval(this._overTimer,10000) //10초

    this.askPermissions()

    this._noticheck()

    setInterval(this._noticheck,5000)//5초
    // this._sendNotificationImmediately()
    // this.scheduleNotification()
    
    //모든 노티를 한번 정리해주자
    // Notifications.cancelAllScheduledNotificationsAsync()
  
    // setTimeout(BackgroundFetch.registerTaskAsync("noticheck"),20000)
    //  BackgroundFetch.registerTaskAsync("noticheck")


  }

  //flag를 설정해서 interval을 돌아도 체크해버릴수있께 해주던지 setinterval을 먹여도 1번만 하게 설정하자

  _noticheck = async () => { //6시간 : 21,600,000‬   , 12시간: 43,200,000‬ 
    const temptime = new Date()
    let notichange_todo = [...this.state.todos]
    // console.log("checking...")
    // console.log(this.state.todos)
    for (const j of this.state.todos) {
      // console.log("여기도 안들어오나?")
      if (j.deadline + 64800000 <= temptime.getTime()) { // 18시간이 지난후 6시간 남았을때 64800000
        if (j.noti_6h === false && j.iscomplete === false){

          notiindex_6 = notichange_todo.findIndex((element) => { return element.deadline === j.deadline })

          await Notifications.presentLocalNotificationAsync({
            title: "Let's todo love",
            body: ' <'+ j.title + '> 마감시간이 6시간 남았어요!',
          });
          notichange_todo[notiindex_6].noti_6h = true
          this.setState({todos: notichange_todo},this._storeData) 
          // console.log("noticheck가 바뀌어서 이건 더 안돌아갈껄")
          // console.log("6시간남았음")
        }
        if (j.noti_6h === true){
          continue;
          console.log("안돌아가려는 발버둥-6")
        }
        
      } else if (j.deadline + 43200000 <= temptime.getTime()) { // 12시간이 지난후 12시간 남았을때 43200000
        if (j.noti_12h === false && j.iscomplete === false ) {

          notiindex_12 = notichange_todo.findIndex((element) => { return element.deadline === j.deadline })

          await Notifications.presentLocalNotificationAsync({
            title: "Let's todo love",
            body: ' <' + j.title + '> 마감시간이 12시간 남았어요!',
          });
          notichange_todo[notiindex_12].noti_12h = true
          this.setState({ todos: notichange_todo }, this._storeData)
          // console.log("12 시간 noti flag 바꿈")
          // console.log("12시간남았음")
        }
        if (j.noti_12h === true) {
          continue;
          console.log("안돌아가려는 발버둥-12")
        }

      }

    }

  }





  //input창 내에 Text가 체인지 되는것을 실시간으로 반영해주기 위한 부분
  _changeText = (value) => {
    this.setState({ inputTodo:value})
  }
  _edit_changeText = (value,title) =>{
    this.setState({inputTodo:value})
  }
  //입력된 Todo의 값을 State에 반영
  _saveTodo = () =>{
    const prevTodo = [...this.state.todos]
    if (prevTodo.length <= 2){
        if (this.state.inputTodo !== '') {
          const tempdate = new Date()
          if (parseInt(tempdate.getHours()) <10 ){
            temphour = '0'+tempdate.getHours()
          }
          else{
            temphour = tempdate.getHours()
          }

          if (parseInt(tempdate.getMinutes()) < 10) {
            tempminutes = '0' + tempdate.getMinutes()
          }
          else {
            tempminutes = tempdate.getMinutes()
          }
          const newTodo = { title: this.state.inputTodo, 
                            iscomplete: false, 
                            deadline: tempdate.getTime(), 
                            start_hour: temphour, 
                            start_minutes: tempminutes,
                            noti_6h:false,
                            noti_12h:false,}
          this.setState({
            inputTodo: '',
            todos: prevTodo.concat(newTodo)
          }, this._storeData)
        }
        else {
          alert('내용을 입력해주세요!')
        }
    }
    else{
      alert("ToDo list는 \n\n 3개까지만 등록가능합니다!")
      this.setState({
        inputTodo: '',
      })
    }
   
  }

  _editTodo = () => {

  }
  _checkScore= () =>{
    if (this.state.MainScore >=75){
      this.setState({ random_flag: Math.floor(Math.random() * 3) + 4 },this._storeData)   // 75 이상은 4 5 6
    }
    else if(this.state.MainScore >= 26){
      this.setState({ random_flag: Math.floor(Math.random() * 3) + 1 }, this._storeData)   // 75~25은 1,2,3
    }
    else{
      this.setState({ random_flag: Math.floor(Math.random() * 3) + 7 }, this._storeData)   // 25이하는 7 8 9
    }
  }
  _overTimer = () =>{
    const overchecktime = new Date()
    let plus_score =0 
    let minus_score = 0 
    let success_item = 0
    let fail_item = 0
    let next_flag = false
    let update_todos = [...this.state.todos]
    
    for (const i of this.state.todos) {
      if (i.deadline + 86400000 <= overchecktime.getTime()) { //24시간을 환산하면 86400000
        if (i.iscomplete === true) {
          // console.log("얘는 성공한 애입니다", i)
          delete_success_index = update_todos.findIndex((element)=>{ return element.deadline === i.deadline})
          plus_score = plus_score + 2
          success_item = success_item + 1
          update_todos.splice(delete_success_index,1)

        }
        else { //86400000이 하루 기준 초
          delete_fail_index = update_todos.findIndex((element) => { return element.deadline === i.deadline })
          minus_score = minus_score +2
          fail_item = fail_item +1
          update_todos.splice(delete_fail_index, 1)
        }
        next_flag = true
      }
      
    }
    if (next_flag){
      alert("성공한 " + (success_item).toString() + "개의 Todo,\n" + "실패한 " + (fail_item).toString() + "개의 Todo 가 삭제되었습니다.\n\n"
        + " 호감도 " + (plus_score - minus_score).toString() + " 가 증가(감소)하였습니다.")
      this.setState({ todos: update_todos, MainScore: this.state.MainScore - minus_score }, this._storeData)
      this._checkScore()
    }
  }
  //TodoList를 만들어주는 method 주 용도는 TodoItem component에 넘겨주기 위함이다
  _makeTodoList = ({index,item}) =>{
    return(
    
    <TodoItem 
      name={item.title}
      check_id = {item.deadline}
      starthour={item.start_hour}
      startminutes = {item.start_minutes}
      isComplete = {item.iscomplete}
      changeComplete={()=>{
        const nowtime = new Date()

        const reverseTodo = [...this.state.todos]
        const prevSuccess = [...this.state.success_todos]
        if ((nowtime.getTime() - item.deadline) <= 86400000) { //24시간을 환산하면 86400000
          
          reverseTodo[index].iscomplete = !reverseTodo[index].iscomplete
          
          alert("축하합니다! 호감도 +2 \n\n (리스트는 등록후 24시간 뒤에 자동 삭제됩니다) ");
          // Alert.alert(
          //   '오늘의 ToDo를 했나요?',
          //   '',

          //   [{ text: '', onPress: () => console.log('Ask me later pressed') },

          //     {
          //       text: '못했어요',
          //       onPress: () => console.log('Cancel Pressed'),
          //       style: 'cancel',
          //     },
          //     {
          //       text: '했어요!', onPress: () => {
          //         reverseTodo[index].iscomplete = !reverseTodo[index].iscomplete

          //         this.setState({ success_todos: prevSuccess.concat(reverseTodo[index]), MainScore: this.state.MainScore + 3 }, this._storeData) //성공리스트 넘기고, 호감도 +3
          //         reverseTodo.splice(index, 1)} 
          //     },
              
          //   ],
          //   { cancelable: false },
          // );
          this.setState({ success_todos: prevSuccess.concat(reverseTodo[index]), MainScore: this.state.MainScore + 2 }, this._storeData) //성공리스트 넘기고, 호감도 +3
          this._checkScore()
        } else { 

          alert("24시간이 지나 실패했습니다! 호감도 -2")
          this.setState({ MainScore: this.state.MainScore - 2 }, this._storeData) 
          reverseTodo.splice(index, 1);
          this._checkScore()

        }

        this.setState({ todos: reverseTodo }, this._storeData)
      }}
      deleteItem={()=>{
        const deleteTodo = [...this.state.todos]
        deleteTodo.splice(index,1)
        this.setState({ todos: deleteTodo }, this._storeData)
      }}
    />
    )
  }

  //image첨부 함수
  _selectImage = async () => {

    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
    });

    if (!result.cancelled) {
      this.setState({ imageUri: result.uri }, this._storeData);
    }
  };
  _hateselectImage = async () => {

    let result2 = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
    });

    if (!result2.cancelled) {
      this.setState({ hate_imageUri: result2.uri }, this._storeData);
    }
  };
  _changename = (value) =>{
    this.setState({inputname:value})
  }
  _saveName = () =>{
    if (this.state.inputname !== ''){
      this.setState({username : this.state.inputname},this._storeData)
    }else{
      alert('빈칸없이 입력해주세요!')
    }
    if (this.state.imageUri ==="" || this.state.hate_imageUri === ""){
      alert('빈값없이 입력해주세요!')
    }
  }


  render(){
    // console.log(this.state.todos)
  
    return (

      <SafeAreaView style = {styles.main_background}>
        <StatusBar hidden={true} backgroundColor="blue" barStyle="light-content" />

        <MainNavi
          screenProps={{
            listData: this.state.todos,
            renderMethod: this._makeTodoList,
            displayvalue: this.state.inputTodo ,
            changemethod: this._changeText ,
            edit_changemethod : this._changeText,
            savemethod: this._saveTodo ,
            selectImage : this._selectImage,
            mainImageUri : this.state.imageUri,
            hateImageUri : this.state.hate_imageUri,
            selectHateImage: this._hateselectImage,
            myusername : this.state.username,
            changeNameMethod: this._changename,
            inputname : this.state.inputname,
            saveName : this._saveName,
            userName: this.state.username,
            normal_mention: this.state.normal_mention,
            bad_mention : this.state.bad_mention,
            bad_mention_two: this.state.bad_mention_two,
            good_mention : this.state.good_mention,
            Main_score : this.state.MainScore,
            random_flag: this.state.random_flag,
            changeScreen: this._checkScore,
          }}
            />
      </SafeAreaView>
    );
  }

}



const styles = StyleSheet.create({
  //Main 화면의 background작업을 하기위한
  main_background:{
    flex:1,
  },

});


