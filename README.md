# NewsFlash

iOS and Android apps for NewsFlash

## Local setup

Follow the [React Native CLI Quickstart](https://reactnative.dev/docs/environment-setup) for the relevant environment up to (but not including) "Creating a new application".

### Bundler

Install JavaScript Dependencies and start the bundler

```sh
yarn
yarn start
```

### iOS

```sh
npx pod-install
yarn ios
```

You can also run the app directly from XCode by opening the workspace in XCode and clicking on the play icon.

### Android

```sh
yarn android
```

Note if this if your first time running an Android project, you'll need to register an emulator in Android Studio first. This can be done by opening Android studio, and on the launch page choose Configure -> AVD.

You can also run the app directly from Android Studio by opening the project in Android Studio and clicking on the play icon.

## Course

### Initialise new project

Use the RN template <https://github.com/kadikraman/react-native-template>

## Set up urql client

<https://formidable.com/open-source/urql/docs/basics/react-preact/>

## Fetch home page data from Hasura

<https://cloud.hasura.io/project/bfe70d48-19db-4f66-a99d-58df4a0c25ff/console>

## Fetch read more data from Hasura

## Pull to refresh

Note that requestPolicy: 'network-only' is important (otherwise will fetch from cache instread)

## Get the schema for typed  gql

## Pagination

Paginate the stories list

```js
query MyQuery {
  stories_aggregate {
    aggregate {
      count
    }
    nodes {
      id
      title
    }
  }
}
```

## Show a "you are offline" message

- Spotify-style notification at the bottom of the screen
- use react-native-safe-area-context to set the insets
- <https://github.com/react-native-netinfo/react-native-netinfo#netinfostate>
- use `isInternetReachable` instead of `isConnected`
