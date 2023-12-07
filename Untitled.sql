CREATE TABLE `users` (
  `id` Interger PRIMARY KEY,
  `user_name` text,
  `dob` date,
  `phone` text,
  `user_role` ENUM ('user', 'admin'),
  `email` text,
  `created_at` timestamp,
  `updated_at` timestamp
);

CREATE TABLE `diseases` (
  `id` Interger PRIMARY KEY,
  `disease_name` text,
  `description` text,
  `created_at` timestamp,
  `updated_at` timestamp
);

CREATE TABLE `chats` (
  `id` Interger PRIMARY KEY,
  `chat_name` text,
  `user_id` Interger,
  `result` Interger,
  `created_at` timestamp,
  `updated_at` timestamp
);

CREATE TABLE `chat_symptom` (
  `id` Interger PRIMARY KEY,
  `chat_id` Interger,
  `symptom_id` Interger
);

CREATE TABLE `symptoms` (
  `id` Interger PRIMARY KEY,
  `symptom_name` text
);

ALTER TABLE `chats` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `diseases` ADD FOREIGN KEY (`id`) REFERENCES `chats` (`result`);

ALTER TABLE `symptoms` ADD FOREIGN KEY (`id`) REFERENCES `chat_symptom` (`symptom_id`);

ALTER TABLE `chats` ADD FOREIGN KEY (`id`) REFERENCES `chat_symptom` (`chat_id`);
