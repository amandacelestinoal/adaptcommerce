# Create a custom page

When creating an online store, you often have to create whole new pages specific to your store.

Let's look at how it works by adding a "Hello World" page to adaptcommerce.
This page will be accessible at `/greetings` and will display `Hello World`.

## TL;DR

In order to do so, we need to:

1.  Create our component page in our theme
2.  Define the associated route in our router

## 1. Create a new page component

First, let's create a new component in our theme.
This component will be the one telling our application what to display on the `/greetings` page.

In order to keep our code clean, we will put this component into the `pages` folder of our theme: `src/web/theme/pages/<our-page>.js`.

> **adaptcommerce:** If we were to use the paid version, the page should be
> added at the same path but within [a custom module](https://developers.adaptcommerce.com/docs/essentials/extend-the-theme.html#Configure-your-custom-theme-and-use-it-in-your-application) rather than in core modules.

Once created, this component should render a basic "Hello World" message.

```js
// src/web/theme/pages/Greetings.js
import React, { Component } from "react";
import { H1 } from "theme/components/atoms/Typography/Heading";

class Greetings extends Component {
  render() {
    return <H1>Hello world</H1>;
  }
}

export default Greetings;
```

## 2. Define the associated route

Once the component is created, we must declare our new route.
A route is a React element that specifies what to display if a specific path is matched.
In our case, we want it to render the `Greetings` component when the user visits the `/greetings` URL.
To do so, we use [React Router](https://reacttraining.com/react-router/web/guides/philosophy), the most popular routing library in the React ecosystem.

In adaptcommerce, routes are gathered in a single file: `src/web/theme/Routes.js`.
So, we will add our `/greetings` route within this file.

```diff
// ... imports
import { Route } from "react-router";
+import Greetings from "theme/pages/Greetings";

export default () => (
  <BrowserRouter>
    <Switch>
+      <Route
+        path="/greetings" // The URL that should display our page
+        render={() => <Greetings />} // what page to render
+      />
      {/* Other routes here */}
    </Switch>
  </BrowserRouter>
);
```

We can now navigate to [http://localhost:8080/greetings](http://localhost:8080/greetings) and it should render your fantastic `Hello World` message!

> **adaptcommerce:** If we were to use the paid version, there would be no such root file since routes need to be aggregated from different modules.
> Read more on [adaptcommerce’s documentation](https://developers.adaptcommerce.com/docs/essentials/add-a-page-client-side.html)

Once you have a custom page up and running, feel free to change the page component (`Greetings`) however you want.
You can make it fetch data, render data, send a mutation… after all, it's a component!
It will work exactly the same way as any other component in your application.

## Next

We now recommend you to start experimenting with Pages and change things to understand how a page could be organized and reuse existing components!

Then, you could learn how to [extend the GraphQL Schema](extend-graphql-schema.md) by exposing new information that you may for instance display on this page afterwards.
