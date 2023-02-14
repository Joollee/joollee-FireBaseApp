import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

export const App = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '',
    });
  }, []);
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('ghfgf', userInfo);

      // ({userInfo});
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log('111111111111', error);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('22222222222', error);

        await GoogleSignin.signOut();
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log('333333333', error);
      } else {
        // some other error happened
        console.log('44444444444', error);
      }
    }
  };
  return (
    <View>
      <TouchableOpacity style={BUT_TON} onPress={signIn}>
        <Text>35213156</Text>
      </TouchableOpacity>
    </View>
  );
};
const BUT_TON: ViewStyle = {
  width: 300,
  height: 400,
  backgroundColor: 'pink',
};
