import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'

export default function BillHistory() {
  return (
    <View style={styles.container}>
      <View style={{width: '100%', height: '12%', backgroundColor: 'red', alignItems: 'center'}}>
        <TouchableOpacity style={{width: '10%', height: '70%', backgroundColor: 'gray'}}>
          <Image style={{}} source={require('./Image/icon_back.png')}/>
        </TouchableOpacity>
        
      </View>
      <Text>Lịch Sử Giao Dịch</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        
    },
})