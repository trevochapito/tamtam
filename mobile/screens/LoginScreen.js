import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
});

const LoginScreen = ({ onLoginSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleLogin = async (values) => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email: values.email,
        password: values.password
      });

      await AsyncStorage.setItem('userToken', response.data.token);
      onLoginSuccess();
    } catch (error) {
      alert('Login failed: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (values) => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/api/auth/register', {
        email: values.email,
        password: values.password,
        name: values.name || 'User'
      });

      alert('Account created successfully! Please login.');
      setIsSignUp(false);
    } catch (error) {
      alert('Sign up failed: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <View style={styles.content}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>TamTam</Text>
          <Text style={styles.tagline}>Global Sourcing. Minimalist Effort.</Text>
        </View>

        {/* Form */}
        <Formik
          initialValues={{ email: '', password: '', name: '' }}
          validationSchema={validationSchema}
          onSubmit={isSignUp ? handleSignUp : handleLogin}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View style={styles.form}>
              {isSignUp && (
                <>
                  <TextInput
                    style={styles.input}
                    placeholder="Full Name"
                    placeholderTextColor="#757575"
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    value={values.name}
                  />
                  {errors.name && touched.name && <Text style={styles.error}>{errors.name}</Text>}
                </>
              )}

              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#757575"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                autoCapitalize="none"
              />
              {errors.email && touched.email && <Text style={styles.error}>{errors.email}</Text>}

              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#757575"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry
              />
              {errors.password && touched.password && <Text style={styles.error}>{errors.password}</Text>}

              {/* Submit Button */}
              <TouchableOpacity
                style={styles.submitBtn}
                onPress={handleSubmit}
                disabled={isLoading}
              >
                <Text style={styles.submitBtnText}>{isLoading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Login'}</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>

        {/* Toggle Sign Up / Login */}
        <View style={styles.toggleContainer}>
          <Text style={styles.toggleText}>{isSignUp ? 'Already have an account? ' : "Don't have an account? "}</Text>
          <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
            <Text style={styles.toggleLink}>{isSignUp ? 'Login' : 'Sign Up'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 48
  },
  logo: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#D32F2F',
    marginBottom: 8
  },
  tagline: {
    fontSize: 16,
    color: '#757575',
    textAlign: 'center'
  },
  form: {
    marginBottom: 24
  },
  input: {
    backgroundColor: '#F9F9F9',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    color: '#1A1A1A',
    marginBottom: 12
  },
  error: {
    color: '#F44336',
    fontSize: 12,
    marginBottom: 8,
    marginLeft: 4
  },
  submitBtn: {
    backgroundColor: '#D32F2F',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600'
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  toggleText: {
    fontSize: 14,
    color: '#757575'
  },
  toggleLink: {
    fontSize: 14,
    color: '#D32F2F',
    fontWeight: '600'
  }
});

export default LoginScreen;
