import { useNavigation } from '@react-navigation/native';
import { BottomTabsParamList, RootStackParamList } from '../types';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';

export const useRootNavigation = () =>
  useNavigation<StackNavigationProp<RootStackParamList>>();

export const useMainTabsNavigation = () =>
  useNavigation<BottomTabNavigationProp<BottomTabsParamList>>();
