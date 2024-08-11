# CountdownTab

## Description

CountdownTab is a Chrome extension that transforms your new tab page into a dynamic event countdown dashboard. It empowers users to effortlessly add and track upcoming events, displaying real-time countdowns to keep you organized and excited about important dates. With a customizable interface and a hidden sidebar to customize the countdown, CountdownTab is the perfect tool for managing your schedule right from your browser.

## Features

- Replace new tab page with an intuitive event countdown dashboard
- Create and edit events with names and dates
- Real-time countdown for each event
- Hidden sidebar with customization options for the countdown display
- Dark mode support for comfortable viewing in low-light environments
- Local storage integration for persistent data across browser sessions

## Extension Installation

1. Download or clone the repository:
   ```
   git clone https://github.com/your-username/countdowntab.git
   ```

2. Open Google Chrome and navigate to `chrome://extensions/`

3. Enable "Developer mode" by toggling the switch in the top right corner

4. Click on "Load unpacked" button

5. Go to directory newtabcountdown/build, and select this folder.

6. The extension should now be installed and active. Open a new tab to see it in action!


## Installation and Build

To install and build the CountdownTab extension, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/your-username/countdowntab.git
   ```

2. Navigate to the project directory:
   ```
   cd countdowntab
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Build the React app:
   ```
   npm run build
   ```

5. The build process will create a `build` directory with the compiled files.

6. Open Google Chrome and navigate to `chrome://extensions/`

7. Enable "Developer mode" by toggling the switch in the top right corner

8. Click on "Load unpacked" button

9. Select the `build` directory that was created in step 5

10. The extension should now be installed and active. Open a new tab to see it in action!

## Development

To run the app in development mode:

1. Start the development server:
   ```
   npm start
   ```

2. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits. You will also see any lint errors in the console.

## Building for Production

To build the app for production:

1. Run the build command:
   ```
   npm run build
   ```

2. This builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

3. Your app is ready to be deployed as a Chrome extension!

Remember to update your `manifest.json` file in the `public` folder to include necessary permissions and Chrome extension specific configurations.


## Usage

### Adding an Event

1. Open a new tab to see the CountdownTab dashboard
2. Enter the event name in the "Event Name" input field
3. Select the event date using the date picker
4. Click the "Add Event" button to create the event

### Editing an Event

1. Click the edit icon (pencil) next to the event you want to modify
2. Update the event details in the form
3. Click "Update Event" to save your changes

### Deleting an Event

1. Click the delete icon (trash can) next to the event you want to remove

### Customizing the Countdown

1. Click the sidebar toggle button to reveal the hidden sidebar
2. In the sidebar, you'll find options to customize the countdown display:
   - By default, the countdown will be represented in years, months, weeks, days, hours, seconds. 
   - You can choose one of the below options which show the entire countdown in those units.
   - Current support provided for seconds, hours, days, weeks

### Toggling Dark Mode

1. Click the theme toggle button in the dashboard to switch between light and dark modes

## Contributing

Contributions to the CountdownTab Chrome Extension project are welcome! Please follow these steps to contribute:

1. Fork the repository
2. Create a new branch for your feature or bug fix
3. Make your changes and commit them with descriptive commit messages
4. Push your changes to your fork
5. Submit a pull request to the main repository

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
