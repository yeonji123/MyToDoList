import React, { useState } from 'react';
import {
  View, Text, TextInput, Button, FlatList 
} from 'react-native';


const TodoCom = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task.trim() !== '') {
      setTasks([...tasks, task]);
      setTask('');
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const renderTask = ({ item, index }) => (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text>{item}</Text>
      <Button title="Delete" onPress={() => deleteTask(index)} />
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>TodoList App</Text>
      <View style={{ flexDirection: 'row', marginBottom: 20 }}>
        <TextInput
          style={{ flex: 1, borderWidth: 1, padding: 10, marginRight: 10 }}
          placeholder="Enter task"
          value={task}
          onChangeText={setTask}
        />
        <Button title="Add" onPress={addTask} />
      </View>
      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default TodoCom;
