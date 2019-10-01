import React from 'react';
import { StyleSheet,  SafeAreaView,    } from 'react-native';


export default class Todocomplete extends React.Component {
    // { name, isComplete, changeComplete, deleteItem }

    render() {
        return (
         <SafeAreaView style={styles.effect_backgorund}>
             <Image soruce={require('../assets/effect/todo_complete.png')} style={styles.effect_image}/>
         </SafeAreaView>
        )
    }

}

const styles = StyleSheet.create({
    effect_backgorund:{
        flex:1,
    },
    effect_image:{
        flex:1,
    }

})