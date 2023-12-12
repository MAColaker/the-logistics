import React from 'react';
import {SafeAreaView} from 'react-native';
import {YStack, Text, Button, Theme} from 'tamagui';

import auth from '@react-native-firebase/auth';

export default Home = () => {
  const signOut = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  return (
    <YStack>
      <SafeAreaView>
        <Text>Hoş geldiniz</Text>
      </SafeAreaView>
      <Theme name={'dark_blue'}>
        <Button theme="active" onPress={signOut}>
          Sign-Out
        </Button>
      </Theme>
    </YStack>
  );
};
