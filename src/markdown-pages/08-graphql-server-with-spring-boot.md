---
title: "Building a GraphQL Server with Spring Boot"
date: "September 18, 2018"
description: "Building a GraphQL Server with Spring Boot."
---

# Building a GraphQL Server with Spring Boot
As stated on the GraphQL website: “GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools.”

This means that GraphQL provides you the options to query your API in an easier way. The three greatest advantages in my opinion are:

1. The ability to request only the data we actually need. Unlike standard REST calls where you ask for data and receive the whole object, In GraphQL you can query for only the fields you need. This way we do not send irrelevant data to the client. For example, if we have a User object that contains ten user attributes such as email address etc, and we only need the users id and name, we can query for just them instead for the whole object.
2. A clear separate layer for the API calls. Implementing GraphQL creates a “language” for speaking to our API. This “language” remains constant even if we change/upgrade different things at the backend. In this way, we do not need to make any changes at the client side when changing our business logic or data models.
3. Evolving the API is easier. When we add new fields to an existing call, all we need to do is add the field to a GraphQL configuration file. After that clients can see and query for the new field.
Reading about GraphQL got me interested so I wanted to see how to use it in my current development with Spring Boot. Turns out Spring Boot has a starter for implementing GraphQL which is pretty convenient and requires only an additional dependency in your maven project. Following this, I decided

to make a tutorial for creating a Spring Boot Application with GraphQL for data queries and updates.

## GraphQL Basics
I will explain the basic case of getting data and adding new data using GraphQL. More info about the possibilities of GraphQL can be found on their  [website](https://graphql.org/) .

We have two types of calls, queries, and mutations. In order to make those calls, we will need to define them and also define the structure of our data. For example, if we have a User object we need to query we will define the query and the User data object as follows:

```
type Query {
   users: [User]
}
```

Defines a call for Users that returns an array of Users.

```
type User {
   id: Int!
   name: String
   email: String
   role: String
}
```

Defines the User type with id, name, email and role fields.

If we need to insert/update the object we will define a mutation instead and an input type for the data we will receive for the operation. We need the input type because we usually do not send all of the data in the object when we update it or insert a new one. For example, we may want to add a user with only an email and generate the id. This is the mutation definition for adding a new User in our case:

```
type Mutation {
   createUser(input: CreateUserInput!): User!
}
```

Defines a create User call that will receive an input and return the user created.

```
input CreateUserInput {
   name: String
   email: String
   role: String
}
```

The input does not include the id as it will be generated automatically.
Now that we know a bit about the basics of GraphQL, let’s create a project and see how it works.

## Create a New Spring Boot Project
The easiest way to start a project is by going to  [https://start.spring.io/](https://start.spring.io/)  and creating it from there. Choose the following options:
* Maven
* Java
* Spring Boot 2
* The names you prefer for the Group and Artifact
* Dependencies: Web, H2, JPA

Generate the project, unzip the downloaded file and open it in your IDE. Add GraphQL to the project Add the following dependencies to you pom.xml file:

```
<dependency>
   <groupId>com.graphql-java</groupId>
   <artifactId>graphql-java-tools</artifactId>
   <version>4.3.0</version>
</dependency>
<dependency>
   <groupId>com.graphql-java</groupId>
   <artifactId>graphql-spring-boot-starter</artifactId>
   <version>4.0.0</version>
</dependency>
<dependency>
   <groupId>com.graphql-java</groupId>
   <artifactId>graphiql-spring-boot-starter</artifactId>
   <version>4.0.0</version>
</dependency>
```

The last one adds a visualization option for GraphQL So that you can easily query for your data.

Another dependency we will use is Lombok. It is not a must but it will shorten our code as it will add the getters, setters, and constructors we need by using simple annotations.

```
<dependency>
   <groupId>org.projectlombok</groupId>
   <artifactId>lombok</artifactId>
   <version>1.16.20</version>
</dependency>
```

## Configure H2 Database
When creating the project we added the dependency for H2. This is an in-memory database that will create tables for the entities we create. We will also insert a few rows of data so that it won’t be completely empty. Add these lines to your application.properties file:

```
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console
```

This will enable us to connect to our in-memory database once we start the server. To do so simply navigate to [ http://localhost:8080/h2-console/login.jsp](http://localhost:8080/h2-console/login.jsp)  in your browser and enter the following information:
* JDBC URL: jdbc:h2:mem:testdb
* User Name: sa
* Password: (empty)
After connecting you will be able to query the tables in the H2 database by using SQL syntax.

Create a data.sql file in your resources folder with the following data:
```
insert into user
values(10001,’User Number 1’, ‘user1@email.com’, ‘admin’);
insert into user
values(10002,’User Number 2’, ‘user2@email.com’, ‘default_user’);
insert into user_permissions (id , user_id , permission)
values (100, 10001, ‘read’);
insert into user_permissions (id , user_id , permission)
values (101, 10001, ‘edit’);
insert into user_permissions (id , user_id , permission)
values (102, 10001, ‘delete’);
insert into user_permissions (id , user_id , permission)
values (103, 10002, ‘read’);
```

The queries in this file will be automatically executed on the start of the server and will populate the user and user_permissions tables.

## Implement GraphQL Queries
In your resources folder create a file called users.graphqls with the following data:

```
type Query {
   users: [User]
}
type User {
   id: Int!
   name: String
   email: String
   role: String
   userPermissions: [UserPermissions]
}
type UserPermissions {
   id: Int!
   userId: Int
   permission: String
}
```

At the start of the server, the GraphQL starter will find all the files of the GraphQLs type and load them. In this file, we define one simple query for getting all User objects. The User Object includes an id, name, email, role and a list of UserPermission objects. Each UserPermission object includes an id, user id, and the permission.

In your java folder create a package named entities with the following classes:

```
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
   @Id
   @GeneratedValue
   private Long id;
   private String name;
   private String email;
   private String role;
   @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch =
   FetchType.EAGER)
   @JoinColumn(name = “userId”)
   private List<UserPermissions> userPermissions = new ArrayList<>();
   public User(CreateUserInput input) {
     this.name = input.getName();
     this.email = input.getEmail();
     this.role = input.getRole();
   }
}

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserPermissions {
  @Id
  @GeneratedValue
  private Long id;
  private Long userId;
  private String permission;

  public UserPermissions(Long userId, String permission) {
    this.userId = userId;
    this.permission = permission;
  }
}
```

Here we create two JPA entities for our objects so that we will be able to retrieve them from the database. Additionally, we will create two repositories so we can use the Spring Data inbuilt functions. Add a package named repositories with the following classes:

```
public interface UserRepository extends CrudRepository<User, Long>{
  List<User> findAll();
}
public interface UserPermissionsRepository extends       CrudRepository<UserPermissions,Long> {
}
```

Now that we have the definition for the API and the objects themselves, we need a way to connect them. This is done by creating a Resolver. Create a resolvers package with the following class:

```
@Component
public class QueryResolver implements GraphQLQueryResolver {
  @Autowired
  UserRepository userRepository;
  public List<User> users() {
    List<User> users = userRepository.findAll();
    return users;
  }
}
```

Here we created a resolver which extends the GrapgQLQueryResolver we get with the GrapgQL package. Our implementation is very basic and includes retrieving all the users available in the users table and returning them. Note that the function name needs to match the name we defined in the users.graphqls file.

Now we are ready to start the server and query for data. After the server starts, go to  [http://localhost:8080/graphiql](http://localhost:8080/graphiql) . In the left side of the window, you can query for data. In our case, we need to specify the query we want to run (users) and the fields we would like to get from the Users object. The query structure for full User details will look like this:

```
{
  users {
    id
    email
    role
    userPermissions {
      id
      userId
      permission
    }
  }
}
```

We will get a JSON with all of the users data as a response.

## Implementing GraphQL Mutations
To implement the mutations add the following definitions to the users.graphqls file:

```
type Mutation {
  createUser(input: CreateUserInput!): User!
  addPermissionToUser(input: AddPermissionInput!): User!
}

input CreateUserInput {
  name: String
  email: String
  role: String
}

input AddPermissionInput {
  id: Int
  permission: String
}
```

We define two mutations. One for adding a new user, and another for adding a permission to user. There is also a need to define the input types as they include different fields from the query types.

Next, we need to create classes for the input objects. In the entities package add:

```
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddPermissionInput {
  private Long id;
  private String permission;
}

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateUserInput {
  private String name;
  private String email;
  private String role;
  private String permission;
}
```

Lastly, we need to implement the resolver so that the API definition we created work. In the resolvers package create the class:

```
@Component
public class MutationResolver implements GraphQLMutationResolver {
  @Autowired
  UserRepository userRepository;
  @Autowired
  UserPermissionsRepository userPermissionsRepository;
  public User createUser(CreateUserInput input) {
    User user = new User(input);
    return userRepository.save(user);
  }

  public User addPermissionToUser(AddPermissionInput input) {
    UserPermissions userPermission = new UserPermissions(input.getId(),
    input.getPermission());
    userPermissionsRepository.save(userPermission);
    Optional<User> user = userRepository.findById(input.getId());
    return user.isPresent() ? user.get() : null;
  }
}
```

Here as with the other resolver, we implement the functions defined for the GraphQL.

This is all. Now we can restart our server and make sure the mutation works. For this, we can navigate to  [http://localhost:8080/graphiql](http://localhost:8080/graphiql)  and try the API. The API call will look like this:

```
mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    name
    email
    role
    userPermissions{
      permission
    }
  }
}
```

Additionally, we will need to provide the input for the mutation. We can do this in the bottom left corner at the “Query Variables” section. The input is in simple JSON format. For example:

```
{
	“input”: {
		“name”: “inputName7”,
		“email”: “xx@yy.com”,
		“role”: “reader”
	}
}
```

## Conclusion
GraphQL can provide some advantages for your API definition and reduce the number of data clients receive from the server. It integrates well with Spring Boot and is relatively easy to implement. So if you like the syntax and want to create a Domain Query Language it can be a great option.



#home/blog/08-graphql-server-with-spring-boot