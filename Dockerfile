#
# Build stage
#
FROM maven:3.8.5-openjdk-17 AS build
COPY . .
RUN mvn clean package -DskipTests

#
# Package stage
#
FROM openjdk:17.0.1-jdk-slim
COPY --from=build /cinema-admin/target/cinema-admin.jar cinema-admin.jar

# Copy cinema-customer.jar
COPY --from=build /cinema-customer/target/cinema-customer.jar cinema-customer.jar

# ENV PORT=8080 8082
EXPOSE 8080 8082
#ENTRYPOINT ["java","-jar","cinema-admin.jar"]
ENTRYPOINT ["java", "-jar", "cinema-admin.jar", "&", "java", "-jar", "cinema-customer.jar"]