# Scalability Strategy

If this app gains 100k+ users, here is my plan:

1. **Microservices**: I would split the Backend into an "Auth Service" and a "Product Service" so they can run on different servers.
2. **Caching**: I would use Redis to save product lists so we don't hit the database every time a user refreshes the page.
3. **Load Balancing**: I would use Nginx to distribute traffic across multiple servers.