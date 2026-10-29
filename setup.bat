@echo off
echo 🚀 Medical Document Storage - Quick Start
echo ===========================================
echo.

REM Backend Setup
echo 📦 Setting up Backend...
cd backend
npm install
copy .env.example .env

echo.
echo ⚠️  IMPORTANT: Update backend\.env with your AWS credentials:
echo    - AWS_ACCESS_KEY_ID
echo    - AWS_SECRET_ACCESS_KEY
echo    - AWS_S3_BUCKET
echo.

REM Frontend Setup
cd..
echo 📦 Setting up Frontend...
cd frontend
npm install

cd..
echo.
echo ✅ Setup complete!
echo.
echo 🚀 To start the application:
echo    Terminal 1: cd backend ^&^& npm run dev
echo    Terminal 2: cd frontend ^&^& npm start
echo.
echo 📖 For Docker setup: docker-compose up --build
echo.
echo 🔗 Access the app at: http://localhost:3000
pause
