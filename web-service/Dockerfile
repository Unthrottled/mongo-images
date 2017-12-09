FROM gradle:alpine as packager
MAINTAINER Alex Simons "alexsimons9999@gmail.com"
USER root
WORKDIR /app

#RUN mkdir -p /opt/gradle/.gradle
#ENV GRADLE_USER_HOME=/opt/gradle/.gradle

#Cache gradle dependencies, will only run if any of these files changes
#ADD ./build.gradle ./
#ADD ./grade.properties ./
#ADD ./settings.gradle ./
#RUN gradle --refresh-dependencies dependencies
#TODO ACTUALLY MAKE CACHE WORK

#Add rest of source code :)
ADD . .

#RUN gradle clean shadowJar

FROM java:8u111-alpine

WORKDIR /app

#COPY --from=packager /app/build/libs /app

#ENTRYPOINT ["java", "-jar", "wiki-1.0.3.jar"]

ENTRYPOINT ["java", "-"]



