import axios from 'axios';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [email, setEmail] = useState('diego.ramirez@ce.ucn.cl');
  const [password, setPassword] = useState('12345');
  const [accessToken, setAccessToken] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const signInRequest = async (email: string, password: string) => {
    setError(false);
    setAccessToken('');

    try {
      const response = await axios.post(
        'http://192.168.42.128:3000/user/sign-in',
        { email, password }
      );

      const accessToken = response?.data?.accessToken || '';
      setAccessToken(accessToken);
      console.log({ accessToken });
    } catch (e: any) {
      setError(true);
      setErrorMessage(e?.response?.data?.message);
      console.log({ error: e?.response?.data?.message });
    }
  };

  return (
    <View style={styles.container}>
      <Text>Email</Text>
      <TextInput
        placeholder="email@email.cl"
        value={email}
        inputMode="email"
        onChangeText={(text: string) => setEmail(text)}
      />
      <Text>Password`</Text>
      <TextInput
        placeholder="Password"
        value={password}
        inputMode="text"
        secureTextEntry
        onChangeText={(text: string) => setPassword(text)}
      />
      <Button title="SignIn" onPress={() => signInRequest(email, password)} />
      {accessToken && <Text>{accessToken}</Text>}
      {error && (
        <Text style={{ color: '#ff0000', fontWeight: '700' }}>
          {errorMessage}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
