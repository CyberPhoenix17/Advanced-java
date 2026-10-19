# International Working Capital Management Application

An enterprise-grade Java web application engineered to manage, convert, and monitor corporate working capital and asset distributions for an international workforce. This project demonstrates advanced backend architecture, multi-threaded task scheduling, runtime localization, and robust RESTful data exchange using the Spring ecosystem.

## 🚀 Key Features

* **Localization & Internationalization (I18n):** Implemented multi-lingual interface support enabling seamless runtime transitions between English, French, and Canadian French locales using native Java `ResourceBundle` handling and locale interceptors.
* **Asynchronous Multi-Threading:** Configured thread-safe concurrent pipelines via Java's `ExecutorService` to simulate live, real-time asset market conversions and update cycles without blocking the primary application thread.
* **RESTful Architecture:** Designed decoupled Spring MVC REST controller endpoints to handle properties data exchange, state synchronization, and structural configurations between the server and the view layer.
* **Time-Zone Synchronization:** Programmed automated date and time translation logic to map and display sensitive asset updates relative to individual client geographic regional clusters.

## 🛠️ Tech Stack

* **Language:** Java 17+
* **Framework:** Spring Boot, Spring MVC
* **Build Automation:** Maven
* **Frontend Rendering:** Thymeleaf, HTML5, CSS3, JavaScript

## 📁 Core Architecture Highlight

The application follows an enterprise-level tiered architecture designed for high scalability and separation of concerns:
* `Controller Layer`: Manages REST endpoints, request routing, and localization data binding.
* `Service Layer`: Handles the multi-threaded execution pools, transaction logic, and resource bundle processing.
* `Model Layer`: Defines data contracts and localized property configurations.


