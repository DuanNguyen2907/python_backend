CREATE TABLE `diseases` (
  `id` UUID PRIMARY KEY,
  `name` VARCHAR[45],
  `desc` VARCHAR[265]
);

CREATE TABLE `users` (
  `id` UUID PRIMARY KEY,
  `name` VARCHAR[50],
  `dob` Date,
  `address` VARCHAR[100],
  `phone` VARCHAR[10],
  `email` VARCHAR[100],
  `create_at` Date,
  `update_at` Date
);

CREATE TABLE `chats` (
  `id` UUID PRIMARY KEY,
  `user_id` UUID,
  `name` VARCHAR[45],
  `create_at` Date,
  `last_chat` Date
);

CREATE TABLE `message` (
  `id` UUID PRIMARY KEY,
  `symptom_id` UUID,
  `chat_id` UUID
);

CREATE TABLE `user_symptom` (
  `id` UUID PRIMARY KEY,
  `user_id` UUID,
  `symptom` VARCHAR[50]
);

ALTER TABLE `chats` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `user_symptom` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `user_symptom` ADD FOREIGN KEY (`user_id`) REFERENCES `message` (`id`);

ALTER TABLE `message` ADD FOREIGN KEY (`id`) REFERENCES `chats` (`id`);
