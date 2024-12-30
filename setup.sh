touch .env
echo "DATABASE_URL=" >> .env

touch ./apps/backend/.env
echo "DATABASE_URL=" >> ./apps/backend/.env
echo "JWT_SECRET=" >> ./apps/backend/.env

touch ./packages/drizzle-module/.env
echo "DATABASE_URL=" >> ./packages/drizzle-module/.env