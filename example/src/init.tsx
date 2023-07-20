import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';
import {initialize, setUser} from 'vue-sdk-react-native';

import ButtonPrimary from './buttonPrimary';

const Init = () => {
  const navigation = useNavigation();

  const [apiToken, setApiToken] = useState('cccf83437fe347cf8a79d2fa4f85fe94');
  const [baseUrl, setBaseUrl] = useState(
    'https://api-uat.madstreetden.xyz/api/v1',
  );
  const [userId, setUserId] = useState('sample_user_id');

  const handleApiTokenChange = (text: string) => {
    setApiToken(text);
  };

  const handleBaseUrlChange = (text: string) => {
    setBaseUrl(text);
  };

  const handleUserIdChange = (text: string) => {
    setUserId(text);
  };

  const handleInit = () => {
    initialize({token: apiToken, baseUrl, loggingEnabled: true});
  };

  const handleSetUser = () => {
    setUser({userId});
  };

  const navigateToRecommendation = () => {
    navigation.navigate('RecommendationScreen');
  };

  const navigateToEvents = () => {
    navigation.navigate('EventScreen');
  };

  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <View>
        <Text style={styles.title}>Vue SDK</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter API Token"
          value={apiToken}
          onChangeText={handleApiTokenChange}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Base URL"
          value={baseUrl}
          onChangeText={handleBaseUrlChange}
        />
        <ButtonPrimary onPress={handleInit} buttonText={'Submit token'} />
        <TextInput
          style={styles.input}
          placeholder="Enter User Id"
          value={userId}
          onChangeText={handleUserIdChange}
        />
        <ButtonPrimary onPress={handleSetUser} buttonText={'Set user'} />
      </View>
      <View>
        <ButtonPrimary
          onPress={navigateToRecommendation}
          buttonText={'Test Recommendation'}
        />
        <ButtonPrimary onPress={navigateToEvents} buttonText={'Test Events'} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: 'red',
    textAlign: 'center',
    padding: 10,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  input: {
    margin: 10,
    padding: 12,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
});

export default Init;
