---
title: "React JS Router 4 Tutorial"
date: "July 6, 2018"
description: "React JS router 4 tutorial and examples."
---

# React JS Router 4 Tutorial
I decided to make a short tutorial on using React Router. For the past week I was playing with React and found he Router to be an integral part of it. The main difference of React Router 4 from its previous versions and other routers is that the routing takes place at the time your app is rendering. Seems like the Router development team decided to make extensive changes from the 4th version and make it more compatible with Reacts framework, and it shows. I had a positive experience using Router 4 in both its capability and compatibility with my React App.

You can install React Router from either yarn by running:

`yarn add react-router`

or npm by running:

`npm install react-router`

##  Simple Routing
The following example routes three different routes to their respective components:

```
const App = () => (  
<div>    
    <Switch>      
         <Route exact path=“/ “ component={Home}/>      
         <Route path=“/dashboard” component={Dashboard}/>      
         <Route path=“/login” component={Login}/>    
   </Switch>  
</div>)
```

The three routes in this example are wrapped in a Switch tag. This tag makes sure that we are looking for the route to follow in the order they are written. In case we find a matching path we go to its indicated component. The Switch stops the app from continuing to look further. This is different from wrapping the routes in a simple div as in that case it will activate all routes with paths matching the URL.

Another important thing to notice is the “exact” keyword. It indicates that we need to route only on an exact match. Without it, all three paths would have routed us to the Home component because they all match the “/” path.

## Nested routing
```
const App = () => (  
   <BrowserRouter>    
      <div>  <Route path=“/items” component={Items}/>  </div>  
   </BrowserRouter>) 

const Tacos = ({ match }) => (  
    <div>   
       <Route path= {match.url + ‘/:id’} component={Item} />  
    </div>)
```

Here we use the BrowserRouter in order to wrap our routes. This is the standard router we know where we see the current path in the browser. In case we want to see the path unchanged like a single page application we can use the MemoryRouter. This way the path will be kept in memory only, and we won’t see the path changes in the browser.

In this example, we route from the “/items” path to the Items component. In the Items component, we match to the specific item by id and display the Item component for it. We can get the specific id in the component from props and display its data.

These are the features that I used the most in the past week. More info on React Router can be found at  [Router](https://reacttraining.com/react-router/core/guides/philosophy) . There are lots of useful features for both React web and native.


#home/blog/05-react-js-router-4-tutorial