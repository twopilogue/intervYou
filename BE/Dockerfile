FROM openjdk:8-jdk

WORKDIR /BE

COPY ./build/libs/intervYou-0.0.1-SNAPSHOT.jar intervyou-server.jar

ENTRYPOINT ["java", "-jar", "intervyou-server.jar"]