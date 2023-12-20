# GoalEase Snake Edition

## Authors: The East Code

-Steph G. Johnson
-David Grier
-Felix Taveras
-Ekow Yawson
-Latherio Kidd

## What is GoalEase Snake Edition?

### Summary of Idea:

GoalEase Snake Edition is an innovative fusion of goal management within the comprehensive GoalEase platform and classic snake gameplay. In this adaptation, the snake represents segmented goals or tasks within the GoalEase ecosystem, offering a playful and engaging way for users to visualize, interact with, and progress through their objectives.

### GoalEase Description:

GoalEase is an all-in-one goal management platform designed to streamline the creation, tracking, and modification of personal objectives. It offers error handling, robust database connectivity, and fundamental CRUD functionalities, ensuring an intuitive and efficient user experience. By incorporating GoalSnake into GoalEase, the platform further gamifies the goal-setting process, fostering improved productivity and goal attainment in a playful manner.

### GoalSnake Description:

GoalSnake is the gamified component within GoalEase Snake Edition. Each segment of the snake represents a goal or task, and players interact with their goals through classic snake gameplay. The integration adds a dynamic layer to traditional goal management, providing users with a unique and entertaining approach to achieving their objectives.

## [User Stories](https://github.com/TheEastCode/Client_301/wiki/User-Stories)

## Wireframe

![wireframe1](wireframe1.png)
![wireframe2](wireframe2.png)

## Domain Model 

![Alt text](image.png)

This simple domain model includes four main entities: User, Game, Comment, and Goal. Each entity has attributes (properties) and methods (operations) associated with it. Relationships between entities are represented through associations.

User can create an account, log in, and reset the password.
Game can be created, updated, and deleted.
Comment is associated with both User and Game and can be added, edited, and deleted.
Goal is associated with a User and can be created, updated, and deleted.

## Schema

![Alt text](image-1.png)

Explanation:

-*PK*: Primary Key

-*FK*: Foreign Key

In this schema diagram:

Each box represents a table in the database.
The fields (attributes) of each table are listed within the corresponding box.
Primary keys are indicated with "PK," and foreign keys are indicated with "FK."
Relationships between tables are depicted by connecting the corresponding foreign keys.