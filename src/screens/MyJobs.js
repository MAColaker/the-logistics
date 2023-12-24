import React, {useState, useEffect} from 'react';
import {FlatList} from 'react-native';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import {YStack, Text, Spinner, Card, H1, H2, Button} from 'tamagui';

export default MyJobs = () => {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);

  const {left, top, right} = useSafeAreaInsets();

  useEffect(() => {
    const subscriber = firestore()
      .collection('ilanlar')
      .where('nakliyeci', '==', auth().currentUser.uid)
      .onSnapshot(querySnapshot => {
        const users = [];

        querySnapshot.forEach(documentSnapshot => {
          users.push({
            key: documentSnapshot.id,
            ...documentSnapshot.data(),
          });
        });

        setJobs(users);
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <YStack backgroundColor={'$gray7'} fullscreen>
      <YStack top={top} left={left} right={right} bottom={0} space>
        <H1 padding={25}>Benim İşlerim</H1>
        <YStack>
          <FlatList
            contentContainerStyle={{paddingBottom: 250}}
            data={jobs}
            key={item => item.id}
            renderItem={({item}) => (
              <Card marginBottom={15} marginHorizontal={20} elevate>
                <Card.Header>
                  <H2>{item.fiyat} ₺</H2>
                  <Text>Adres: {item.adres}</Text>
                  <Text>Konteyner No: {item.konteynerNo}</Text>
                  <Text>Liman: {item.liman}</Text>
                </Card.Header>
              </Card>
            )}
          />
        </YStack>
      </YStack>
    </YStack>
  );
};
