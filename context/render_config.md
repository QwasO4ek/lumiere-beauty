# Интеграция с Render (Хостинг и деплой)

## Основные сведения
- **Платформа хостинга:** Render (https://render.com)
- **Аккаунт:** `artemmiskarev@gmail.com`
- **Workspace:** `My Workspace` (`tea-dafdg7pt0dsc73dmqn0g`)
- **SSH-доступ:** Настроен через ключ `C:\Users\user\.ssh\id_ed25519` (публичный ключ добавлен в Render).
- **Связка с репозиториями:** GitHub аккаунт `QwasO4ek` (автоматический деплой по пушу).

## Развернутые сервисы:
- **Сервис:** `lumiere-beauty`
  - **ID:** `srv-dafe9mid0e5s73c2k0qg`
  - **Тип:** `static_site`
  - **Репозиторий:** `https://github.com/QwasO4ek/lumiere-beauty` (ветка `main`)
  - **Публичный рабочий URL:** `https://lumiere-beauty.onrender.com`
  - **Панель управления:** `https://dashboard.render.com/static/srv-dafe9mid0e5s73c2k0qg`
  - **Статус:** `live`

## Обязанность агента при запросе на хостинг:
1. **Подготовка проекта к деплою:**
   - Создание конфигурационных файлов (например, `render.yaml` Blueprint, `Dockerfile`, скрипты сборки/запуска).
   - Настройка `Procfile` / портов / переменных окружения (Environment Variables).
2. **Публикация кода:**
   - Инициализация и отправка репозитория в GitHub (`gh repo create` / `git push`).
3. **Управление и отладка:**
   - Подключение к запущенным сервисам Render через SSH (`ssh srv-xxx@ssh.oregon.render.com`).
   - Мониторинг, диагностика ошибок и обновление сервисов.
