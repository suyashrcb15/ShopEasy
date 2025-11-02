# Use OpenJDK image
FROM openjdk:17-jdk-slim

# Copy the project files
WORKDIR /app
COPY . .

# Build the project
RUN ./mvnw clean package -DskipTests

# Run the built jar file
CMD ["java", "-jar", "target/*.jar"]
