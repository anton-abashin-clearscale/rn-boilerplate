/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/app';
import { Amplify } from 'aws-amplify';

import awsConfig from './src/aws-exports';
import {name as appName} from './app.json';

Amplify.configure(awsConfig);

AppRegistry.registerComponent(appName, () => App);
