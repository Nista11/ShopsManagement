FROM maven:3.8.7-eclipse-temurin-19 AS build
WORKDIR /app
COPY backend ./backend
COPY pom.xml .
RUN mvn dependency:go-offline
RUN mvn package

FROM openjdk:19
WORKDIR /app
COPY --from=build /app/target/LabSDI-0.0.1-SNAPSHOT.jar .
CMD ["java", "-jar", "LabSDI-0.0.1-SNAPSHOT.jar"]