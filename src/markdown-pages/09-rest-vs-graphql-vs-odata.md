---
title: "REST vs GraphQL vs oData"
date: "2018-10-08"
description: "REST vs GraphQL vs oData. Compare to decide what is best for your needs."
---

**First, let’s explore REST VS GraphQL:**

The main attraction of GraphQL is the Over-fetching argument. This means that in GraphQL you can choose only the fields you need when retrieving data. This can also be implemented using REST but requires more work on the API design.

Another thing to consider is that most people are not familiar with the GraphQL syntax and will need to learn how to work with it. Additionally, there will need to be a discovery service to inform the clients of the possible fields they can request.

The main attraction for using REST is that it is proven itself over many years and has better performance. REST is more suited for requesting files as GraphQL is designed to return a JSON object.

Lastly, when using GraphQL it is more difficult to scale a micro-services infrastructure because the development is dictated more from the client side.

**REST – PROS**
* Works better for micro-services architecture because it allows for an independent evolution of services
* Better handling of requests for files
* It has better performance over GraphQL

**REST – CONS**
* Requires more work to design the API

**GraphQL – PROS**
* Allows the client to choose the fields he wants without getting additional data
* Easier to design the API
* Adds a layer between client and server. Allows for seamless changes on the server side

**GraphQL – CONS**
* Requires creating a discovery service or a UI for the clients to educate the clients of its use
* Requires the clients to learn how to use GraphQL queries
* Requires more coding as it is another layer for the application. (Need to code all the object definitions and the possible queries for the GraphQL API)

## oData
oData stands for “Open Data Protocol” it is an ISO/IEC approved standard of best practices for building and consuming RESTful APIs. The main attraction of oData is that it allows us to focus on business logic instead of on how exactly to construct our API. This is a similar advantage to that of GraphQL as they both provide conventions for how our API will behave and we, in turn, need to concentrate more on the business side of things. oData is widely used and can be integrated with most commonly used programming languages such as Java, .NET, JavaScript, C++, Python etc.

**PROS**
* No need to plan the API. We can concentrate on the business side.
* Can be implemented in most programming languages.
* Good performance.
* Most programmers are familiar with REST, therefore, it is easier for them to use a REST based framework
* Allows sending query strings with special conditions and filters.

**CONS**
* Requires more coding to implement all parts of the framework.
* Requires learning of the framework on the consumer side. (Less than in the case of GraphQL)

## Conclusion
oData can be a valid option for creating a business API as it will allow us to concentrate on constructing the business domain instead of focusing on the technical aspects of the API. It will also create a framework to follow for anyone who adds to the business domain. This way the product will remain cohesive over time. The disadvantage of oData is that the consumers will need to understand the API to use it. Although it will require less effort because oData is based on REST which most developers are familiar with.