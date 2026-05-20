# 电影信息查询系统

此项目为 React + Express 的电影查询与收藏系统示例。

## 环境准备

- 需先安装 Node.js（建议 18 及以上版本），并确保 `npm` 可用。
- 在 `client` 和 `server` 目录分别执行 `npm install`。
 - 后端支持通过环境变量配置，仓库已提供 `server/.env.example`，复制为 `server/.env` 并按需修改。

## 目录结构

- `server/` - 后端服务
  - `config/db.js` - MySQL 数据库连接
  - `middleware/auth.js` - JWT 登录验证中间件
  - `routes/user.js` - 用户登录/注册接口
  - `routes/movie.js` - 电影查询与详情接口
  - `routes/favorite.js` - 收藏相关接口
  - `app.js` - Express 应用入口
- `client/` - React 前端应用
  - `src/` - React 源码
  - `src/pages/` - 页面组件
  - `src/components/` - 公共组件
  - `src/api.ts` - Axios 封装
  - `src/styles.css` - 全局样式

## 快速启动

### 1. 创建数据库

```sql
CREATE DATABASE movie_db DEFAULT CHARACTER SET utf8mb4;
USE movie_db;

CREATE TABLE user (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL,
  role INT DEFAULT 0,
  create_time DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE movie (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(100) NOT NULL,
  year INT NOT NULL,
  director VARCHAR(50),
  rating DECIMAL(2,1),
  description TEXT,
  create_time DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE favorite (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  movie_id INT NOT NULL,
  create_time DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uk_user_movie (user_id, movie_id)
);
```

### 2. 插入测试数据

```sql
INSERT INTO user (username, password, role)
VALUES ('admin', '$2a$10$B0pJ1xWjK/7QZQfui1AhCeVYF8z5/MCTJx0rP5qoa3d5Xxz7RuG8i', 1),
       ('test', '$2a$10$B0pJ1xWjK/7QZQfui1AhCeVYF8z5/MCTJx0rP5qoa3d5Xxz7RuG8i', 0);

INSERT INTO movie (title, year, director, rating, description)
VALUES
('流浪地球2', 2023, '郭帆', 8.3, '太阳危机背景下的人类自救计划'),
('满江红', 2023, '张艺谋', 7.8, '南宋绍兴年间的一段悬疑故事');
```

> 上述密码为 `123456` 的 bcrypt 哈希。

### 3. 后端启动

```powershell
cd server
npm install
npm start
```

后端默认监听 `http://localhost:3000`

### 4. 前端启动

```powershell
cd client
npm install
npm run dev
```

前端默认运行在 `http://localhost:5173`

### 5. 接口说明

- `POST /api/user/login` - 登录
- `POST /api/user/register` - 注册
- `GET /api/movie/list` - 电影列表查询
- `GET /api/movie/detail/:id` - 电影详情
- `POST /api/favorite/add` - 收藏电影（需 JWT）
- `GET /api/favorite/my` - 我的收藏（需 JWT）
- `GET /api/admin/movie/list` - 管理端电影列表（需管理员权限）
- `POST /api/admin/movie/create` - 新增电影（需管理员权限）
- `PUT /api/admin/movie/update/:id` - 更新电影（需管理员权限）
- `DELETE /api/admin/movie/delete/:id` - 删除电影（需管理员权限）

## 前端页面说明

- 首页：电影搜索、列表展示、收藏按钮、分页
- 登录页：用户登录
- 注册页：用户注册
- 我的收藏：查看已收藏电影
- 电影详情：电影详情与收藏操作
- 后台管理：管理员新增、编辑、删除电影

## 管理员账号

SQL 中插入的 `admin` 用户默认角色为 `1`，可用于登录后台管理页面。