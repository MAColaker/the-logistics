import React, {useEffect, useState} from 'react';
import {ListItem, Separator, YGroup, YStack} from 'tamagui';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

import auth from '@react-native-firebase/auth';

import MyJobs from './MyJobs';
import Jobs from './Jobs';
import AddJobs from './AddJobs';
import Users from './Users';

const ProfileStack = createNativeStackNavigator();

const ProfileScreen = () => {
  const {left, top, right} = useSafeAreaInsets();
  const [claims, setClaims] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    const getClaims = async () => {
      const idTokenResult = await auth().currentUser.getIdTokenResult();
      setClaims(idTokenResult.claims);
    };

    getClaims();
  }, []);

  return (
    <YStack top={top} left={left} right={right} fullscreen space>
      <YGroup
        alignSelf="center"
        bordered
        size="$5"
        separator={<Separator />}
        marginHorizontal={21}
        marginTop={21}>
        <YGroup.Item>
          <ListItem
            hoverTheme
            pressTheme
            title="Aldığım İşler"
            onPress={() => navigation.navigate('MyJobs')}
          />
        </YGroup.Item>
      </YGroup>
      {!!claims.admin ? (
        <YGroup
          alignSelf="center"
          bordered
          size="$5"
          separator={<Separator />}
          marginHorizontal={21}>
          <YGroup.Item>
            <ListItem
              hoverTheme
              pressTheme
              title="Alınan İşler"
              subTitle="Şöförlerin aldığı işler"
              onPress={() => navigation.navigate('Jobs')}
            />
          </YGroup.Item>
          <YGroup.Item>
            <ListItem
              hoverTheme
              pressTheme
              title="İş ekle"
              subTitle="Yeni iş girişi yap"
              onPress={() => navigation.navigate('AddJobs')}
            />
          </YGroup.Item>
          <YGroup.Item>
            <ListItem
              hoverTheme
              pressTheme
              title="Üyeler"
              onPress={() => navigation.navigate('Users')}
            />
          </YGroup.Item>
        </YGroup>
      ) : (
        <></>
      )}
    </YStack>
  );
};

export default Profile = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} />
      <ProfileStack.Screen name="MyJobs" component={MyJobs} />
      <ProfileStack.Screen name="Jobs" component={Jobs} />
      <ProfileStack.Screen name="AddJobs" component={AddJobs} />
      <ProfileStack.Screen name="Users" component={Users} />
    </ProfileStack.Navigator>
  );
};
