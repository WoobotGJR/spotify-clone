# Проект: Музыкальный сервис

**Поскольку supabase ограничивает количество пользователей, которые могут зарегистрироваться, имеется тестовый аккаунт email: test123@gmail.com password: 123456789ASD**

### Описание проекта

Этот проект является аналогом популярного музыкального сервиса, такого как Spotify. Он предоставляет пользователям возможность загружать музыку, прослушивать её, добавлять в избранное и искать новые треки. Проект создан с использованием следующих технологий:

- **Next.js**: Фреймворк для создания React-приложений с поддержкой серверного рендеринга.
- **Radix UI**: Набор доступных и настраиваемых компонентов для интерфейса.
- **Tailwind CSS**: Утилитарно-ориентированный CSS-фреймворк для стилизации компонентов.
- **Zustand**: Состояние-менеджер для React-приложений, обеспечивающий простое и масштабируемое управление состоянием.
- **Supabase**: Бэкенд-платформа, предоставляющая готовые решения для базы данных, аутентификации и хранения файлов.

### Основные функции

1. **Загрузка музыки**: Пользователи могут загружать свои музыкальные треки на платформу.
2. **Прослушивание**: Возможность воспроизведения загруженной музыки через встроенный аудиоплеер.
3. **Избранное**: Пользователи могут добавлять треки в список избранных для быстрого доступа к любимым композициям.
4. **Поиск музыки**: Возможность поиска треков по названию, артисту или альбому.

### Установка и запуск

1. **Клонирование репозитория**:

   ```bash
   git clone https://github.com/WoobotGJR/spotify-clone
   cd your-repo
   ```

2. **Установка зависимостей**:
   Убедитесь, что у вас установлен Node.js и npm. Затем выполните команду:

   ```bash
   npm install
   ```

3. **Настройка окружения**:
   Создайте файл `.env.local` в корне проекта и добавьте необходимые переменные окружения:

   ```plaintext
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Запуск проекта**:
   Для локального запуска используйте команду:
   ```bash
   npm run dev
   ```
   Проект будет доступен по адресу `http://localhost:3000`.

### Используемые библиотеки

- **Radix UI**: Используется для создания доступных и адаптивных пользовательских интерфейсов. [Документация Radix UI](https://www.radix-ui.com/docs)
- **Tailwind CSS**: Предоставляет удобный способ стилизации компонентов без необходимости написания пользовательских CSS-классов. [Документация Tailwind CSS](https://tailwindcss.com/docs)
- **Zustand**: Легкий и быстрый состояние-менеджер для React. [Документация Zustand](https://zustand-demo.pmnd.rs/docs)
- **Supabase**: Используется для хранения данных о пользователях и музыкальных треках, а также для аутентификации пользователей. [Документация Supabase](https://supabase.io/docs)
