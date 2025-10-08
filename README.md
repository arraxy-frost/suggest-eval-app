# 🧠 Suggest Eval App

Демонстрационное веб-приложение для оценки предлагаемых идей.  
Проект состоит из **backend-сервера** (Express + TypeScript + Sequelize + PostgreSQL) и **frontend-клиента** (React + Vite + Tailwind CSS).

---

## ⚙️ Требования

- Node.js **>=18**
- npm **>=9**
- PostgreSQL (установленный и запущенный)

---

## 🚀 Установка и запуск приложения

1. Клонировать репозиторий:
   ```bash
   git clone https://github.com/arraxy-frost/suggest-eval-app.git
   cd suggest-eval-app
   
2. Установить зависимости:
    ```bash
   npm install

3. Добавить параметры окружения:
   ````
   DB_HOST=host
   DB_PORT=5432
   DB_USER=postgres_user
   DB_PASS=your_password
   DB_NAME=suggest_eval

4. Создать базу данных **suggest_eval** на сервере.

5. Далее нужно запустить сборку и запустить сервер:
    ```bash
   npm run build
   npm run start
   ```
6. Сервер запустится по умолчанию на порту **8080** (если не переопределили PORT в .env).
Для тестирования api воспользуйтесь коллекцией postman, которую сможете найти в корне проекта.