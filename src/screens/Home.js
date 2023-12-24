import React from 'react';
import {YStack, Text, Button, Theme} from 'tamagui';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

import auth from '@react-native-firebase/auth';

export default Home = () => {
  const {left, top, right} = useSafeAreaInsets();

  const signOut = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  return (
    <YStack top={top} left={left} right={right} space>
      <Text>Hoş geldiniz {auth().currentUser.displayName}</Text>
      <Theme name={'dark_blue'}>
        <Button theme="active" onPress={signOut}>
          Sign-Out
        </Button>
      </Theme>
    </YStack>
  );
};
