# the following commands are 5 steps which is 5 layers
# node:15
FROM node:18

# Manually create the /etc/apt/sources.list file if it's missing
RUN echo "deb https://deb.debian.org/debian bookworm main" > /etc/apt/sources.list && \
    echo "deb https://security.debian.org/debian-security bookworm-security main" >> /etc/apt/sources.list && \
    echo "deb https://deb.debian.org/debian bookworm-updates main" >> /etc/apt/sources.list


# Update and install any necessary packages
RUN apt-get update && apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    vim \
    git \
    iputils-ping \    
    && rm -rf /var/lib/apt/lists/*



#work directory in the container
WORKDIR /app
# the . is the same as /app , so copy the package.json to the /app directory
COPY package.json .

#install the express
RUN npm install
# copy all files to working directory, same as /app
COPY . ./


#RUN apt-get update

# EXPOSE TO PORT 3000, but this is for documentation only, not the real port, doesn't do anything!!!
EXPOSE 3000
# at runtime, run the container
CMD ["node", "index.js"]
# npm for testing/development
#CMD ["npm", "run", "dev"]