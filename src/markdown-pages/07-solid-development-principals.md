---
title: "SOLID Development Principles"
date: "August 24, 2018"
description: "SOLID Development Principles. Use clean code in your development."
---

# SOLID Development Principles
When writing code, it is important to satisfy the business requirements. But it is also equally important writing code that will be maintainable and easily modifiable. This is the reason for the introduction of SOLID principles by Robert Martin in his paper “Design Principles and Design Patterns”. The SOLID acronym itself was introduced by Michal Feathers. So What Does SOLID really means:

* S – Single Responsibility Principle
* O – Open/Closed Principle
* L – Liskov Substitution Principle
* I – Interactive Segregation Principle
* D – Dependency Inversion Principle

To clear the confusion of all of this terminology, let’s go over them and use simple examples to explain.

## Single Responsibility Principle
This principle states that in order for the code to be flexible, each class needs to have a single responsibility.

For example, if we have a class which gets data for the user by opening a connection to the DB, query for data then return data to a user. This will go against the Single Responsibility Principle because in case we change the DB in the future or change the data structure we will need to reformat extensive chunks of code.

Following the Single Responsibility Principle, we will need three classes, each responsible for a single thing. Connecting to DB, querying for data and returning data to the user.

## Open/Closed Principle
This principle states that classes “should be open for extensions but closed for modifications”. The meaning is pretty clear, and it helps prevent unforeseen errors when a developer modifies a class written by another Developer without knowing all of the consequences of the change.

For example, if we have a class for a car with a function called drive. We will not modify this function in case we have a car that drives differently. Instead, we will extend the car class and override the function.

## Liskov Substitution Principle
Barbara Liskov introduced this principle 1987 and it states: “if S is a subtype of T, then objects of type T may be replaced with objects of type S without altering any of the desirable properties of the program”. This basically means that if we have a parent class which is extended by a child class. We need to be able to replace each occurrence of the parent class in the code with the child class without any ill effects.

## Interactive Segregation Principle
This is a principle applied to interfaces. It states that it is better to have multiple specific interfaces instead of one general interface with all the methods. Having a dedicated interface for each use does not force the developer that implements the interface to write more methods than is required of him.

An example for a general interface is a logger with two functions: “writeToLogFile”, “saveToDB”. When implementing this interface, the developer needs to write both methods, but he doesn’t necessarily need both. Therefore, it is better to have two different interfaces with one function each.

## Dependency Inversion Principle
The Principle states: “classes should depend on abstraction but not on concretion”. What this means is that we need to keep a decoupling between our modules and have a layer of abstraction as a communication between them.

We can see examples in MVP frameworks where the high-level modules are separated from the lower level modules and communicate with each other using an interface. This design helps us change one module in the program without changing code that does not directly involve that module. For example, we can change the data access layer without any changes to the client.


#home/blog/07-solid-development-principals