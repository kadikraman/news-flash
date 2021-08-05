import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabsParamList } from '~src/types';
import { HomeTab } from './HomeTab.screen';
import { BookmarkTab } from './BookmarkTab.screen';
import { LightbulbIcon, BookmarkIcon } from '~src/components/Icons';

const BottomTabs = createBottomTabNavigator<BottomTabsParamList>();

export const BottomTabsNavigator: React.FC = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#D81E5B',
        tabBarInactiveTintColor: '#D3D4D9',
        tabBarShowLabel: false,
        tabBarIcon: ({ color, size }) => {
          switch (route.name) {
            case 'HomeTab':
              return <LightbulbIcon color={color} size={size} />;
            case 'BookmarkTab':
              return <BookmarkIcon color={color} size={size} />;
            default:
              return null;
          }
        },
      })}>
      <BottomTabs.Screen
        name="HomeTab"
        component={HomeTab}
        options={{ title: 'Latest Stories' }}
      />
      <BottomTabs.Screen
        name="BookmarkTab"
        component={BookmarkTab}
        options={{
          title: 'My Bookmarks',
          tabBarBadge: 3,
          tabBarBadgeStyle: {
            backgroundColor: '#4B88A2',
            fontSize: 12,
            fontWeight: 'bold',
          },
        }}
      />
    </BottomTabs.Navigator>
  );
};
