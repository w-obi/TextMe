# TextMe

![*"Chats"* page of the app](/assets/images/TextMeChats.jpg)


## Table of Contents

- [About](#about)
  + [Description](#description)
  + [Tools](#tools)
  + [Preview](#preview)
  + [Repository structure](#repository-structure)
- [Setup Project](#setup-project)
  + [Prerequisites](#prerequisites)
  + [Get Started](#get-started)
  + [Get a Fresh Project](#get-a-fresh-project)
  + [Learn More](#learn-more)
  + [Join The Community](#join-the-community)

## About

### Description

**This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).**
TextMe is an android app designed for communication between user. The purpose of writing this project was to learn the development via PostgreSQL. ***You can download the APK file [here](https://portfolio-yeradil.vercel.app/)***.

### Tools
1. [React Native](https://reactnative.dev/docs/environment-setup): an open-source framework used for building native-style, cross-platform applications for iOS and Android using JavaScript.
2. [Expo](https://docs.expo.dev/): a framework that makes developing Android and iOS apps easier. It is highly recommended for beginners to start.
3. [TailwindCSS](https://v2.tailwindcss.com/docs/guides/create-react-app): a utility-first CSS framework designed to enable developers to create applications faster and more efficiently with smaller css files.
4. [Supabase](https://supabase.com/): an open-source Backend-as-a-Service (BaaS) platform designed to simplify the development of web, mobile, and AI applications which was built on top of PostgreSQL and thus provides developers with a suite of tools to manage backend infrastructure effortlessly, making it a popular alternative to Firebase.


### Preview
---
*"Register" page*, /app/index.tsx or auth.tsx used for user to sign in

![*"Register"* page of the app, TextMeRegister.jpg](/assets/images/TextMeRegister.jpg)

---
*"Chats" page*, /app/(tabs)/chats.tsx

![*"Chats"* page of the app, TextMeChats.jpg](/assets/images/TextMeChats.jpg)

---
*"Individual Chat" page*, /app/messages/[user_id].tsx

![*"Individual Chat"* page of the app, TextMeMC.jpg](/assets/images/TextMeMC.jpg)

### Repository Structure

1. android: the folder generated after creating APK file
2. app: the folder containing the main logic of this project
   - (tabs): contains main pages used in the project
   - messages: [user_id].tsx used as a template for different chats between two users
3. assets: the folder containing resources used in the project including images, icons and fonts
4. components: contains reusable components potentially used in multiple files
5. constants: used for code cleanliness
6. interfaces: stores all interfaces used in this project
7. services: contains hooks, functions used for fetching data
8. types: used for importing different types of files

## Setup Project

### Prerequisites
Make sure that the following tools are already installed:
- [Node.js](https://nodejs.org/en/download/): It is a JavaScript runtime build.
- [Git](https://git-scm.com/install/): It is an open source version control system.
- [Expo Go](https://docs.expo.dev/get-started/set-up-your-environment/): For debugging with physical a device or emulator. Please refer to the link for instructions.

Please also register in Supabase, because later on you will have to connect them with this project.

### Get Started

1. Clone the Repository

   ```powershell
   git clone https://github.com/w-obi/TextMe.git
   ```

3. Install dependencies

   ```bash
   npm install
   ```

4. Install Expo CLI

   ```bash
   npm install -g expo-cli
   ```

5. Create .env file at the root of the project and assign values for the following fields:

   ```.env
   EXPO_PUBLIC_SUPABASE_URL=
   EXPO_PUBLIC_SUPABASE_ANON_KEY=
   ```

6. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

### Get a Fresh Project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

### Learn More

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

### Join The Community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
