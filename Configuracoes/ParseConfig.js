import Parse from 'parse/react-native.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { applicationId, javascriptKey, serverURL } = require('./Keys');

// Initialize Parse
Parse.setAsyncStorage(AsyncStorage);
Parse.initialize(applicationId, javascriptKey);
Parse.serverURL = serverURL;

export default Parse;
