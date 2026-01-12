# Use the official nginx image as a base
FROM nginx:latest

# Remove default nginx files
RUN rm -rf /usr/share/nginx/html/*

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Command to run NGINX and keep it in the foreground for Docker to track the process
CMD ["nginx", "-g", "daemon off;"]
