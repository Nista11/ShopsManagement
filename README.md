# ShopsManagement
Shops Management is a <b>full-stack web application</b> which allows owners to manage their respective shops. The <b>backend</b> is written in <b>Java</b> using <b>Spring</b>, which communicates with a <b>PostgreSQL database</b>, and the frontend in <b>javascript</b> using <b>React</b>. It can be deployed using <b>Docker</b>, with the required setup files already available. A <b>UML Diagram</b> of an earlier version of the backend is also available in the root folder, which shows its <b>layered architecture</b>.
## Features
<b>Register and login</b>: Implemented using <b>Json Web Tokens</b> and <b>Spring Security</b>. There are four user types: anonymous (not logged in), regular, moderator, and admin.<br><br>
<b>Seeing, adding, updating, and deleting entities</b>: Based on their roles, the users can perform certain permitted operations. The entities of this application are shops, couriers, clients, products, user profiles, and transactions.<br><br>
<b>Chatting with other users</b>: Users can choose a nickname and save it and chat with other users. Implemented using <b>web sockets</b>.<br><br>
<b>Modifying all records</b>: The admin can generate realistic looking records for the database in order to test the application, provided that the backend is deployed on Linux. A <b>C program</b> writes multiple files for different entites with SQL insert batches, then a few <b>Shell scripts</b> make the PostgreSQL database read and execute the insertions. In a similar way, the admin can delete all records, update how many entries per page are shown, and see the total count for each entity. They can also modify user roles.<br><br>
<b>Validation and tests</b>: Validations are available everywhere on both frontend and backend, and <b>End-to-End tests</b> using <b>Cypress</b> are also available.<br><br>
## Showcase

![login](https://github.com/Nista11/ShopsManagement/assets/42772160/95484aae-46b3-4131-bd7a-83506b88cf23)
![showGuitarsByPrice](https://github.com/Nista11/ShopsManagement/assets/42772160/ec3df05d-8b58-445b-9dc5-0ef856d3cefd)
![addClient](https://github.com/Nista11/ShopsManagement/assets/42772160/85aa20b6-0a5b-4d1a-b52c-b897cd1504c2)
![chatSdi](https://github.com/Nista11/ShopsManagement/assets/42772160/7c7898ce-0761-44cc-83bf-1d60182f2647)
![adminSdi](https://github.com/Nista11/ShopsManagement/assets/42772160/db272c09-2352-456f-8349-5c8ab932312f)
