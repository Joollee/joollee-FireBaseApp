import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import {
  Settings,
  LoginButton,
  AccessToken,
  LoginManager,
} from 'react-native-fbsdk-next';

export const App = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '',
    });
    Settings.setAppID('APP ID');
    Settings.initializeSDK();
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
  const signIn_Fb = () => {
    LoginManager.logInWithPermissions([
      'public_profile',
      'email',
      'user_friends',
    ]).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken()
            .then((data: any) => {
              console.log('Val ', data);

              console.log(data.accessToken.toString());
            })
            .catch(e => {
              console.log('E', e);
            });
          console.log(
            'Login success with permissions: ' +
              result.grantedPermissions.toString(),
          );
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error);
      },
    );
  };
  return (
    <View>
      <TouchableOpacity style={BUT_TON} onPress={signIn}>
        <Text>35213156</Text>
      </TouchableOpacity>
      <TouchableOpacity style={BUT_TON} onPress={signIn_Fb}>
        <Text>login fb</Text>
        <View>
          {/* <LoginButton
            onLoginFinished={(error, result) => {
              if (error) {
                console.log('login has error: ' + error);
              } else if (result.isCancelled) {
                console.log('login is cancelled.');
              } else {
                console.log('Vai lz chim en', result);

                AccessToken.getCurrentAccessToken()
                  .then((data: any) => {
                    console.log(data.accessToken.toString());
                  })
                  .catch(e => {
                    console.log('E', e);
                  });
              }
            }}
            onLogoutFinished={() => console.log('logout.')}
          /> */}
        </View>
      </TouchableOpacity>
    </View>
  );
};
const BUT_TON: ViewStyle = {
  width: 300,
  height: 400,
  backgroundColor: 'pink',
};
