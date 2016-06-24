App.info({
  id: 'fridgeboard',
  name: 'fridgeboard',
  description: 'Get über power in one button click',
  author: 'Malek Development Group',
  email: 'contact@example.com',
  website: 'http://example.com'
});

// Set up resources such as icons and launch screens.
App.icons({
  'iphone': '',
  'iphone_2x': '',
  // ... more screen sizes and platforms ...
});

App.launchScreens({
  'iphone5': 'public/splash/iphone.jpg'
  // ... more screen sizes and platforms ...
});

// Set PhoneGap/Cordova preferences
App.setPreference('BackgroundColor', '0xff0000ff');
App.setPreference('HideKeyboardFormAccessoryBar', true);
App.setPreference('Orientation', 'default');
App.setPreference('Orientation', 'all', 'ios');

