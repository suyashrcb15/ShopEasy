# Use Java 25 instead of 17
FROM openjdk:25-jdk-slim

# Copy project files
WORKDIR /app
COPY . .

# Give permission to mvnw (if not already executable)
RUN chmod +x mvnw

# Build the project
RUN ./mvnw clean package -DskipTests

# Run the JAR
CMD ["java", "-jar", "target/*.jar"]

