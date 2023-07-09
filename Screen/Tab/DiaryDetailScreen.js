import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const DiaryDetailScreen = ({route}) => {
  const {data} = route.params;
  console.log(route.params);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{data.title}</Text>
      <Text style={styles.content}>{data.content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    fontSize: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default DiaryDetailScreen;
