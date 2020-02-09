---
title: "Singleton Design Pattern"
date: "November 2, 2018"
description: "The many ways to write s singleton."
---

# Singleton Design Pattern
Singleton is one of the simplest and well-known design patterns. It provides an easy way to create an object. By implementing this pattern, we can ensure that only a single object is created from a class. The singleton class provides a way to access the only created object of that class.

There are multiple ways to create a singleton. Let’s go over a few:

## Eager Instantiation Singleton
The instance is instantiated by a private constructor which ensures a single object of this class.

```
public class Singleton {
    private static Singleton instance = new Singleton();

    private Singleton(){}

    private static Singleton getInstance(){
        return instance;
    }
}
```

## Lazy Instantiation Singleton
We create the object only when we are asked for it. Lazy instantiation solves the issue of objects that are costly in space or instantiation time.

```
public class Singleton {
    private static Singleton instance;

    private Singleton(){}

    private static Singleton getInstance(){
         if (instance == null ){
             instance = new Singleton();
         }
         return instance;
    }
}
```
 
## Reflection Safe Singleton
A way to go around the singleton pattern is by using java reflection API. Then it is possible to create another instance in the class. To solve this we can simply throw an exception in case someone tries to create the same instance again.

```
public class Singleton{
   private static Singleton instance;

   private Singleton(){
      if(instance!=null){
         throw new RunTimeException(“instance already instantiated!!”); 
      }          
    }

   public static Singleton getInstance(){
       if(instance==null){
           instance = new Singleton();
       }
       return instance;
    }
}
```
 
## Thread Safe Singleton
Another issue with the implementation above is thread safety. The solution for this is making the getInstance method synchronized.

```
public class Singleton{
    private static Singleton instance;
    
    private Singleton(){
      if(instance!=null){
          throw new RunTimeException(“instance already instantiated!!”); 
       }
    }

    public synchronized static Singleton getInstance(){
        if(instance==null){
            instance = new Singleton();
         }
         return instance;
     }
}
```

## Serializable Singleton
In case the singleton is deserialized, a new instance is created. To prevent this we can implement readResolve() method. This way we can prevent the creation of another instance by deserialized the singleton.

```
public class Singleton implements Serializable{
   private static Singleton instance;

   private Singleton(){
      if(instance!=null){
         throw new RunTimeException(“instance already instantiated!!”); 
      }
    }

   public synchronized static Singleton getInstance(){
      if(instance==null){
          instance = new Singleton();
      }
      return instance;
   }

   protected Singleton readResolve(){
       return getInstance();
   }
}
```

## Enum Singleton
By creating a singleton as an enum we avoid the reflection problem. This also solves the serialization issue as enums are inherently serializable.

```
public enum Singleton{
     INSTANCE;
     int value;

     public int getValue(){
         return value;
     }

     public void setValue(int value){
         this.value = value;
     }
}
```


#home/blog/10-singleton-design-pattern