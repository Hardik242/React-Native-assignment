# Metal Prices Live - React Native App

![App Screenshot](https://i.imgur.com/your-screenshot-url.png) A clean, modern, and lightweight React Native application built with Expo and TypeScript to display live and historical prices for precious metals. The app fetches data from the [MetalpriceAPI](https://metalpriceapi.com/), provides a currency conversion feature, and automatically refreshes prices every five minutes.

---

## ✨ Features

-   **Live Metal Prices:** View real-time prices for Gold, Silver, Platinum, and Palladium.
-   **Auto-Refresh:** Prices on the home screen automatically update every 5 minutes.
-   **Multi-Currency Support:** Switch between major world currencies (USD, INR, EUR, etc.) to see prices in your local currency.
-   **Detailed View:** Tap on any metal to view detailed statistics like Open, High, Low, and Close for the previous day.
-   **Clean, Light UI:** A beautiful and intuitive user interface built with a standard, non-intrusive light theme.
-   **Loading States:** Skeletons and loaders provide a smooth user experience while data is being fetched.
-   **Type-Safe Code:** Built entirely with TypeScript for a robust and maintainable codebase.

---

## 🛠️ Tech Stack

-   **Framework:** [React Native](https://reactnative.dev/) (with [Expo](https://expo.dev/))
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **State Management:** React Context API & Hooks
-   **Navigation:** [React Navigation](https://reactnavigation.org/)
-   **Styling:** React Native `StyleSheet`
-   **Data Source:** [MetalpriceAPI.com](https://metalpriceapi.com/)

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed on your system:

1.  **Node.js (LTS Version):** [Download & Install Node.js](https://nodejs.org/)
2.  **Expo Go App:** Install the Expo Go app on your physical Android or iOS device.
    -   [Download for Android (Google Play Store)](https://play.google.com/store/apps/details?id=host.exp.exponent)
    -   [Download for iOS (App Store)](https://apps.apple.com/us/app/expo-go/id982107779)

### Installation & Setup

1.  **Clone the Repository**

    ```bash
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
    cd your-repo-name
    ```

2.  **Install Dependencies**
    Install all the required packages using npm or yarn.

    ```bash
    npm install
    ```

    _or_

    ```bash
    yarn install
    ```

3.  **Set Up Environment Variables**
    This project requires an API key from [MetalpriceAPI.com](https://metalpriceapi.com/) to fetch data.

    -   Create a new file in the root of the project named `.env`.
    -   Open the `.env` file and add your API key like this:
        ```
        EXPO_PUBLIC_API_KEY=YOUR_API_KEY_HERE
        ```
    -   **Important:** The variable name **must** start with `EXPO_PUBLIC_`.

### Running the App

1.  **Start the Development Server**
    Run the following command in your terminal:

    ```bash
    npx expo start
    ```

2.  **Run on Your Phone**
    -   A QR code will appear in your terminal.
    -   Make sure your phone is connected to the **same Wi-Fi network** as your computer.
    -   Open the **Expo Go** app on your phone and scan the QR code.

The app will now open on your device, and you'll be able to see the live metal prices!

---

## 📁 Project Structure

The project code is organized within the `src/` directory to maintain a clean and scalable structure.

```
src/
├── components/     # Reusable UI components (e.g., Loaders, List Items)
├── constants/      # API configuration and constant data
├── context/        # React Context for global state (e.g., Currency)
├── hooks/          # Custom React Hooks (e.g., useMetalPrices)
├── navigation/     # Navigation stack and configuration
├── screens/        # Top-level screen components (HomeScreen, DetailsScreen)
├── styles/         # Global styles and theme definitions (theme.ts)
└── types.ts        # Global TypeScript type definitions
```
