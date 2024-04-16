-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 16, 2024 at 04:09 AM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `trrsk`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `cat_id` int NOT NULL,
  `cat_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `cat_status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `cat_create` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`cat_id`, `cat_name`, `cat_status`, `cat_create`) VALUES
(1, 'Leader', 'Active', '2024-02-22 01:57:27'),
(2, 'test1', 'Active', '2024-02-22 01:58:23'),
(3, 'ss', 'Active', '2024-03-03 07:26:45');

-- --------------------------------------------------------

--
-- Table structure for table `job_position`
--

CREATE TABLE `job_position` (
  `job_id` int NOT NULL,
  `job_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `job_status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `job_create` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `job_position`
--

INSERT INTO `job_position` (`job_id`, `job_name`, `job_status`, `job_create`) VALUES
(1, 'admin', 'Active', '2024-02-20 07:03:32'),
(7, 'Designer', 'Active', '2024-03-03 01:00:43'),
(8, 'Manager', 'Active', '2024-03-03 01:01:09'),
(9, 'ss', 'Active', '2024-03-03 07:26:34');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int NOT NULL,
  `order_num` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `order_status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `order_state` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `order_create` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `order_num`, `user_id`, `order_status`, `order_state`, `order_create`) VALUES
(23, 159324, 12, 'Active', 'not_approved', '2024-02-25 14:42:38'),
(24, 225094, 15, 'Active', 'pending', '2024-02-25 14:59:26'),
(25, 831155, 15, 'Inactive', 'pending', '2024-02-28 11:27:26'),
(26, 376005, 15, 'Inactive', 'pending', '2024-02-28 11:33:39');

-- --------------------------------------------------------

--
-- Table structure for table `order_comments`
--

CREATE TABLE `order_comments` (
  `comment_id` int NOT NULL,
  `order_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `comment_text` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `comment_date` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_comments`
--

INSERT INTO `order_comments` (`comment_id`, `order_id`, `user_id`, `comment_text`, `comment_date`) VALUES
(2, 23, NULL, 'test show', '2024-03-08 02:22:47');

-- --------------------------------------------------------

--
-- Table structure for table `order_detail`
--

CREATE TABLE `order_detail` (
  `detail_id` int NOT NULL,
  `order_id` int DEFAULT NULL,
  `detail_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `detail_quantity` int DEFAULT NULL,
  `detail_price` double DEFAULT NULL,
  `detail_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `detail_path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `detail_create` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_detail`
--

INSERT INTO `order_detail` (`detail_id`, `order_id`, `detail_name`, `detail_quantity`, `detail_price`, `detail_url`, `detail_path`, `detail_create`) VALUES
(2, 26, 'testedit5', 3, 1500.55, 'eeeee', '/uploads/images_order/picture-1709122643378-322400641.png', '2024-02-28 12:17:23'),
(12, 23, 'test1', 3, 500, 'test', '/uploads/images_order/detailPath-1708872158246-138103474.png', '2024-02-25 14:42:38'),
(13, 24, 'testedit1', 2, 500, 'eeee', '/uploads/images_order/detailPath-1708873166049-433700962.png', '2024-02-25 14:59:26'),
(14, 24, 'testedit2', 3, 1500.55, 'rrrr', '/uploads/images_order/detailPath-1708873166054-59191280.png', '2024-02-25 14:59:26'),
(15, 25, 'testedit1', 1, 500, 'test', '/uploads/images_order/detailPath-1709119646732-805389385.png', '2024-02-28 11:27:26'),
(16, 26, 'testeditsend', 3, 500, 'testsend', '/uploads/images_order/picture-1709122643373-472512095.png', '2024-02-28 11:33:39');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `first_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `last_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `position` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `agency` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `tel_num` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `level` int DEFAULT '1',
  `picture_path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `date_create` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `position`, `agency`, `tel_num`, `email`, `password`, `level`, `picture_path`, `date_create`) VALUES
(12, 'plouck', 'JJ', 'ss', 'ss', '0858710541', 'plouckza.001@gmail.com', '$2b$10$UP5n0wl99z.qkv6elEX76.dHzj0s0s8UBzHbVC7cBW4zAMt6RJSmG', 1, 'uploads/user_pic/profilePic-1708323022147-310260713.png', '2024-02-19 01:15:40'),
(15, 'Jane', 'Smith', 'Designer', 'XYZ Agency', '987654321', 'jane1.smith@example.com', '$2b$10$YourHashedPasswordHere', 1, '', '2024-02-19 01:36:21'),
(16, 'Bob', 'Johnson', 'Manager', '123 Agency', '555555555', 'bob1.johnson@example.com', '$2b$10$YourHashedPasswordHere', 1, '', '2024-02-19 01:36:21'),
(17, 'John', 'Doe', 'Developer', 'ABC Agency', '123456789', 'john2.doe@example.com', '$2b$10$YourHashedPasswordHere', 1, '', '2024-02-19 01:36:21'),
(18, 'Jane', 'Smith', 'Designer', 'XYZ Agency', '987654321', 'jane2.smith@example.com', '$2b$10$YourHashedPasswordHere', 1, '', '2024-02-19 01:36:21'),
(19, 'Bob', 'Johnson', 'Manager', '123 Agency', '555555555', 'bob2.johnson@example.com', '$2b$10$YourHashedPasswordHere', 1, '', '2024-02-19 01:36:21'),
(20, 'John', 'Doe', 'Developer', 'ABC Agency', '123456789', 'john3.doe@example.com', '$2b$10$YourHashedPasswordHere', 1, '', '2024-02-19 01:59:28'),
(21, 'Jane', 'Smith', 'Designer', 'XYZ Agency', '987654321', 'jane3.smith@example.com', '$2b$10$YourHashedPasswordHere', 1, '', '2024-02-19 01:59:28'),
(22, 'Bob', 'Johnson', 'Manager', '123 Agency', '555555555', 'bob3.johnson@example.com', '$2b$10$YourHashedPasswordHere', 1, '', '2024-02-19 01:59:28'),
(23, 'John', 'Doe', 'Developer', 'ABC Agency', '123456789', 'john4.doe@example.com', '$2b$10$YourHashedPasswordHere', 1, '', '2024-02-19 01:59:28'),
(24, 'Jane', 'Smith', 'Designer', 'XYZ Agency', '987654321', 'jane4.smith@example.com', '$2b$10$YourHashedPasswordHere', 1, '', '2024-02-19 01:59:28'),
(25, 'Bob', 'Johnson', 'Manager', '123 Agency', '555555555', 'bob4.johnson@example.com', '$2b$10$YourHashedPasswordHere', 1, '', '2024-02-19 01:59:28'),
(26, 'tt', 'tt', 'tt', 'tt', '0858710541', 'test001@gmail.com', '$2b$10$ECAXXQpi0hhIwGrZXllOkeWrGfPUHQRfsuOIdidKqYyv8imwVJBKe', 2, '/user_pic/profilePic-1708322952067-878100577.png', '2024-02-19 06:09:12'),
(27, 'tt', 'tt', 'tt', 'tt', '0858710541', 'admintest@gmail.com', '$2b$10$6eTQU0gwvTmnTK5D4T/wpOSLboz0kxUdkJVROBNF1CK4qhVPhLiAe', 3, '/user_pic/profilePic-1708323022147-310260713.png', '2024-02-19 06:10:22'),
(28, 'admin', 'admin', 'admin', 'trrsk', '0123456789', 'admin@admin.com', '$2b$10$npJJz3YAxvOkHHRnsVl0OuDhqrK0sYxWZcrNdUflub4QINPJ6.AdW', 3, '', '2024-02-19 08:08:58'),
(29, 'HANTAI', 'GAMERzaa', 'Designer', 'trrsk', '0858710541', 'plouckza.777@gmail.com', '$2b$10$NbruGZ7URAkBYSRrhkjdRu46T7jRxuJi5u5lUtMdX0ElMOkOpcmiK', 1, '/user_pic/profilePic-1708418288029-859353839.png', '2024-02-20 08:38:08'),
(30, 'HANTAI', 'GAMERzaa', 'Designer', 'trrsk', '0858710541', 'plouckza.666@gmail.com', '$2b$10$0MNkehKcKy8XhI929aD7f.VLDeE1AtABPwmZayg1DUU6XwHHaJdIu', 1, '/user_pic/profilePic-1708418378180-619844299.png', '2024-02-20 08:39:38'),
(31, 'John', 'Doe', 'Manager', 'Company A', '123456789', 'john@example.com', 'hashed_password', 1, '/user_pic/john_profile.jpg', '2024-02-22 02:15:48');

-- --------------------------------------------------------

--
-- Table structure for table `user_esignature`
--

CREATE TABLE `user_esignature` (
  `sig_id` int NOT NULL,
  `user_id` int NOT NULL,
  `sig_path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `sig_create` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_esignature`
--

INSERT INTO `user_esignature` (`sig_id`, `user_id`, `sig_path`, `sig_create`) VALUES
(1, 12, '/uploads/user_e_signature/signature-1709820883509-56774336.png', '2024-03-07 14:14:43');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`cat_id`);

--
-- Indexes for table `job_position`
--
ALTER TABLE `job_position`
  ADD PRIMARY KEY (`job_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `order_comments`
--
ALTER TABLE `order_comments`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `order_detail`
--
ALTER TABLE `order_detail`
  ADD PRIMARY KEY (`detail_id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user_esignature`
--
ALTER TABLE `user_esignature`
  ADD PRIMARY KEY (`sig_id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `cat_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `job_position`
--
ALTER TABLE `job_position`
  MODIFY `job_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `order_comments`
--
ALTER TABLE `order_comments`
  MODIFY `comment_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `order_detail`
--
ALTER TABLE `order_detail`
  MODIFY `detail_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `user_esignature`
--
ALTER TABLE `user_esignature`
  MODIFY `sig_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `order_comments`
--
ALTER TABLE `order_comments`
  ADD CONSTRAINT `order_comments_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  ADD CONSTRAINT `order_comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `order_detail`
--
ALTER TABLE `order_detail`
  ADD CONSTRAINT `order_detail_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`);

--
-- Constraints for table `user_esignature`
--
ALTER TABLE `user_esignature`
  ADD CONSTRAINT `user_esignature_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
