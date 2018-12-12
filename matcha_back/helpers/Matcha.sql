-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: Dec 11, 2018 at 12:37 PM
-- Server version: 5.5.61
-- PHP Version: 7.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Camagru`
--

-- --------------------------------------------------------

--
-- Table structure for table `blocked`
--

CREATE TABLE `blocked` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `user_blocked` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `liked_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `author` int(11) NOT NULL,
  `dest` int(11) NOT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `from_id` int(11) DEFAULT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `profiles`
--

CREATE TABLE `profiles` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `age` int(11) DEFAULT NULL,
  `gender` varchar(1) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sexual_orientation` varchar(1) COLLATE utf8mb4_unicode_ci DEFAULT 'B',
  `bio` mediumtext COLLATE utf8mb4_unicode_ci,
  `avatar` mediumtext COLLATE utf8mb4_unicode_ci,
  `images` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `position` mediumtext COLLATE utf8mb4_unicode_ci,
  `city` text COLLATE utf8mb4_unicode_ci,
  `popularity` bigint(20) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `profiles_tags`
--

CREATE TABLE `profiles_tags` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `tag_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reported`
--

CREATE TABLE `reported` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `user_reported` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

CREATE TABLE `tags` (
  `id` int(11) NOT NULL,
  `title` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tags`
--

INSERT INTO `tags` (`id`, `title`) VALUES
(1, 'tv'),
(2, 'film'),
(3, 'php'),
(4, 'js'),
(5, 'arbres'),
(6, 'nombril'),
(7, 'tronconneuse'),
(8, 'techno'),
(9, 'trance'),
(10, 'jazz'),
(11, 'youporn'),
(12, 'israel'),
(13, 'ratatouille'),
(14, 'jupe'),
(15, 'buildfight'),
(16, 'taratata'),
(17, 'kpop'),
(18, 'macron'),
(19, 'macaron'),
(20, 'macaque'),
(21, 'rond'),
(22, 'trigonometrie'),
(23, 'nicotine'),
(24, 'bukkake'),
(25, 'philippe'),
(26, 'pancreas'),
(27, 'photovoltaique'),
(28, 'gras'),
(29, 'hopital'),
(30, 'prout'),
(31, 'bouillabaisse'),
(32, 'naruto'),
(33, 'onepiece'),
(34, 'mdma'),
(35, 'uruguay'),
(36, 'seldebelgique'),
(37, 'gateaux'),
(38, 'lombric'),
(39, 'tropical'),
(40, 'rhinopharyngite'),
(41, 'dramaturgie'),
(42, 'ruban'),
(43, 'tigre'),
(44, 'fortboyard'),
(45, '92i'),
(46, 'booba'),
(47, 'kaaris'),
(48, 'lafouine'),
(49, 'poisson'),
(50, 'shnekzer'),
(51, 'arbrees'),
(52, 'uruguayy'),
(53, 'youpornn'),
(54, 'alcool'),
(55, 'lelzer'),
(56, 'le'),
(57, 'sexe'),
(58, 'medicaments'),
(59, 'drogue'),
(60, 'putes'),
(61, 'lol'),
(62, 'pet'),
(63, 'fewfewfew'),
(64, 'wefew'),
(65, 'few'),
(66, 'd'),
(67, 'dsd'),
(68, 'dasdasd'),
(69, 'sdfdsfdsfdsfdsfds'),
(70, 'fdsfdssgdsgerhr'),
(71, 'htrhtrhrfd'),
(72, 'df'),
(73, 'gdfgdf'),
(74, 'gdfhhj'),
(75, 'kj'),
(76, 'kljkler'),
(77, 'e'),
(78, 'cxfcxg'),
(79, 'jhfgh'),
(80, 'fghf'),
(81, 'hfg'),
(82, 'ghfgh'),
(83, 'beurette'),
(84, 'brunette'),
(85, 'cougar'),
(86, 'karioka'),
(87, 'odile'),
(88, 'mime'),
(89, 'toto'),
(90, 'titi'),
(91, '\"\"'),
(92, 'i'),
(93, '$%^'),
(94, '42sh'),
(95, 'bocal'),
(96, 'regrets'),
(97, 'fdp');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `firstname` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastname` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_login` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `admin` tinyint(1) NOT NULL DEFAULT '0',
  `validation_code` mediumtext COLLATE utf8mb4_unicode_ci,
  `reset_code` mediumtext COLLATE utf8mb4_unicode_ci,
  `new_email` mediumtext COLLATE utf8mb4_unicode_ci,
  `new_email_validation` mediumtext COLLATE utf8mb4_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blocked`
--
ALTER TABLE `blocked`
  ADD PRIMARY KEY (`id`),
  ADD KEY `blocked_ibfk_1` (`user_blocked`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `author` (`author`),
  ADD KEY `dest` (`dest`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `from_id` (`from_id`);

--
-- Indexes for table `profiles`
--
ALTER TABLE `profiles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `profiles_tags`
--
ALTER TABLE `profiles_tags`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tag_id` (`tag_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `reported`
--
ALTER TABLE `reported`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `user_reported` (`user_reported`);

--
-- Indexes for table `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blocked`
--
ALTER TABLE `blocked`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `profiles`
--
ALTER TABLE `profiles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `profiles_tags`
--
ALTER TABLE `profiles_tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reported`
--
ALTER TABLE `reported`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tags`
--
ALTER TABLE `tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=98;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `blocked`
--
ALTER TABLE `blocked`
  ADD CONSTRAINT `blocked_ibfk_1` FOREIGN KEY (`user_blocked`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `blocked_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`author`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`dest`) REFERENCES `users` (`id`);

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `notifications_ibfk_2` FOREIGN KEY (`from_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `profiles`
--
ALTER TABLE `profiles`
  ADD CONSTRAINT `profiles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `profiles_tags`
--
ALTER TABLE `profiles_tags`
  ADD CONSTRAINT `profiles_tags_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`),
  ADD CONSTRAINT `profiles_tags_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `reported`
--
ALTER TABLE `reported`
  ADD CONSTRAINT `reported_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `reported_ibfk_2` FOREIGN KEY (`user_reported`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
