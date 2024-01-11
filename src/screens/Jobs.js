import React, {useState, useEffect} from 'react';
import {FlatList} from 'react-native';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

import firestore from '@react-native-firebase/firestore';

import {YStack, Text, Spinner, Card, H1, H2, H5} from 'tamagui';
import axios from 'axios';

const RenderItem = ({item}) => {
  const [driverName, setDriverName] = useState(null);

  useEffect(() => {
    const getDriverName = async () => {
      try {
        const response = await axios.get(
          `https://thelog-api.vercel.app/users/${item.nakliyeci}`,
        );
        setDriverName(response.data.displayName);
      } catch (error) {
        console.error(error);
      }
    };

    getDriverName();
  }, [driverName]);

  return (
    <Card marginBottom={15} marginHorizontal={20} elevate>
      <Card.Header>
        <H2>{item.fiyat} ₺</H2>
        <Text>Adres: {item.adres}</Text>
        <Text>Konteyner No: {item.konteynerNo}</Text>
        <Text>Liman: {item.liman}</Text>
      </Card.Header>
      <Card.Footer alignSelf="flex-end">
        <H5>{driverName ? driverName : <Spinner color={'$black10'} />}</H5>
      </Card.Footer>
    </Card>
  );
};

export default Jobs = () => {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);

  const {left, top, right} = useSafeAreaInsets();

  useEffect(() => {
    const subscriber = firestore()
      .collection('ilanlar')
      .where('nakliyeci', '!=', '')
      .onSnapshot(querySnapshot => {
        const users = [];

        querySnapshot.forEach(documentSnapshot => {
          users.push({
            id: documentSnapshot.id,
            ...documentSnapshot.data(),
          });
        });

        setJobs(users);
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  return (
    <YStack backgroundColor={'$gray7'} fullscreen>
      <YStack top={top} left={left} right={right} bottom={0} space>
        <H1 padding={25}>İş Listesi</H1>
        <YStack>
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
              contentContainerStyle={{paddingBottom: 300}}
              data={jobs}
              keyExtractor={item => item.id}
              renderItem={({item}) => <RenderItem item={item} />}
            />
          )}
        </YStack>
      </YStack>
    </YStack>
  );
};
