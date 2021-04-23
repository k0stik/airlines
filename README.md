To seed up the development process I have build project based on our company's base template
https://github.com/WebbyLab/webbylab-starter-app-for-nodejs
Also I use sequelize ORM to describe entities and relations between them

There are 4 layers in this app:
1. routes,
2. controllers - one method per route,
3. use-cases (or services) - one class with business-logic per rout,
4. models

----

The main idea was to create entities of Airports, Flights between them, Tickets on flights, and Seats.
In this case, Flights must have two links to the airports - departure, arrival. Generally, database must contain foreign keys on fields departureAriportId, arrivalAriportId
Tickets and Seats also refers to the Flight with one to many relation.

----

To check business-logic, look at the use-case folder. Each class from there represents one possible way of using this system.
- in flight/List.mjs user can check a list of income/outcome flights in any airport you want;
- in flight/Update.mjs admin can change flight details;
- in tickts/Create.mjs you can buy a ticket. It would be better to add some payment info there, but unfortunately didn't have enough time for that;
- seats/List.mjs allows you to see which seats are already taken;
- seats/Create.mjs - imitates flight registration in the airport. API receive seat number, but in general, it's  possible to add random seat generation like in real airports;



