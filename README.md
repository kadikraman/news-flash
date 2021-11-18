# News Flash

This is the solutions repo for my Egghead course for building an offline capable news app with React Native and urql.

The API repo for the course is available [here](https://github.com/kadikraman/news-flash-api).

<table>
  <tr>
    <th>iOS</th>
    <th>Android</th>
  </tr>
  <tr>
    <td><img src="https://user-images.githubusercontent.com/6534400/142470037-2aa7ebdd-ce56-46fc-a6da-66148c09f5ff.png"></td>
    <td><img src="https://user-images.githubusercontent.com/6534400/142469674-808d2509-a75e-4a5d-a77c-e6758ee823c7.png"></td>
  </tr>
</table>

## Developer setup

This project is built using plain React Native. So to run it locally, ensure you've set up your developer environment as described in the [React Native Docs](https://reactnative.dev/docs/environment-setup).

Then install the JavaScript dependencies:

```sh
yarn
# or
npn install
```

(iOS only) install the native dependencies:

```sh
cd ios
pod install
cd ..
```

Run the packager:

```sh
yarn start
```

Build the iOS app:

```sh
yarn ios
# or
npn run ios
```

Build the Android app:

```sh
yarn android
# or
npn run android
```
