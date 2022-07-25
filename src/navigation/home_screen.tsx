import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Platform, ListRenderItem } from 'react-native';
import { DataStore } from 'aws-amplify';
import { Todo } from 'models';
import COLORS from 'config/colors';

const HomeScreen = () => {
  const [ todos, setTodos ] = useState<Todo[]>([]);

  useEffect(() => {
    //query the initial todolist and subscribe to data updates
    const subscription = DataStore.observeQuery(Todo).subscribe((snapshot) => {
      //isSynced can be used to show a loading spinner when the list is being loaded.
      const { items, isSynced } = snapshot;
      setTodos(items);
    });

    //unsubscribe to data updates when component is destroyed so that we don’t introduce a memory leak.
    return function cleanup() {
      subscription.unsubscribe();
    };

  }, []);

  const renderItem: ListRenderItem<Todo> = ({ item }) => (
    <View style={styles.todoContainer}>
      <Text>
        <Text style={styles.todoHeading}>{item.name}</Text>
        {`\n${item.description}`}
      </Text>
      <Text
        style={[ styles.checkbox, item.isComplete && styles.completedCheckbox ]}
      >
        {item.isComplete ? '✓' : ''}
      </Text>
    </View>
  );

  return (
    <View>
      <FlatList
        data={todos}
        keyExtractor={({ id }) => id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  todoContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.BACKGROUND_LIGHT,
    borderRadius: 2,
    elevation: 4,
    flexDirection: 'row',
    marginHorizontal: 8,
    marginVertical: 4,
    padding: 8,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  todoHeading: {
    fontSize: 20,
    fontWeight: '600',
  },
  checkbox: {
    borderRadius: 2,
    borderWidth: 2,
    fontWeight: '700',
    height: 20,
    marginLeft: 'auto',
    textAlign: 'center',
    width: 20,
  },
  completedCheckbox: {
    backgroundColor: COLORS.BACKGROUND_DARK,
    color: COLORS.TEXT_LIGHT,
  },
});

export default HomeScreen;
