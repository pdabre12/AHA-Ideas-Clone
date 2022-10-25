FROM openjdk:11

# Copy the application jar
COPY build/libs/ideasapi-v1.0.jar /app1.jar

# Specify port numbers the container should expose
EXPOSE 8080

# Run the application
CMD exec java -jar app1.jar
