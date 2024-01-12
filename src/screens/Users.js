import React, { useEffect, useState } from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FlatList} from 'react-native';
import {Card, H2, Spinner, Text, YStack} from 'tamagui';
import axios from 'axios';

export default Users = () => {
  const {left, top, right} = useSafeAreaInsets();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(
          `https://thelog-api.vercel.app/users/`,
        );
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    getUsers();
  }, []);

  return (
    <YStack
      top={top}
      left={left}
      right={right}
      bottom={0}
      backgroundColor={'$gray7'}
      fullscreen
      space>
      {loading ? (
        <Spinner
          top={top}
          left={left}
          right={right}
          bottom={0}
          color={'$blue10'}
        />
      ) : (
        <FlatList
          contentContainerStyle={{paddingBottom: 250}}
          data={users}
          key={item => item.id}
          renderItem={({item}) => (
            <Card marginBottom={15} marginHorizontal={20} elevate>
              <Card.Header>
                <H2>{item.displayName}</H2>
                <Text>Email: {item.email}</Text>
              </Card.Header>
            </Card>
          )}
        />
      )}
    </YStack>
  );
};
