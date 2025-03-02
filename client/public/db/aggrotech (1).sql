-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 06, 2023 at 11:03 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `aggrotech`
--

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `hour_price` varchar(255) DEFAULT '0',
  `fix_price` varchar(255) DEFAULT '0',
  `message` text DEFAULT NULL,
  `date` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `jobs`
--

INSERT INTO `jobs` (`id`, `name`, `email`, `subject`, `hour_price`, `fix_price`, `message`, `date`) VALUES
(1, 'demo', 'demo@gmail.com', 'demo', '100', '5000', 'demo message', '2023-01-24 22:40:14'),
(2, 'renish suriya', 'renish@gmail.com', 'renish@gmail.com', '0', '7000', 'Selection of seeds of good quality crop strains is the primary stage of sowing. After the preparation of soil, these seeds are dispersed in the field and this is called sowing. Sowing can be done manually, by hand or by using seed drilling machines. Some crops like paddy are first grown into seedlings in a small area and then transplanted to the main field.', '2023-01-24 22:43:02'),
(4, 'renish suriya', 'renish@gmail.com', 'renish@gmail.com', '0', '222', 'dfasdf', '2023-01-24 22:49:15'),
(5, 'renish suriya', 'renish@gmail.com', 'renish@gmail.com', '232', '0', 'fadsf', '2023-01-24 22:49:56'),
(6, 'renish suriya', 'renish@gmail.com', 'renish@gmail.com', '111', '0', 'fadf', '2023-01-24 22:50:40'),
(7, 'renish suriya', 'renish@gmail.com', 'renish@gmail.com', '0', '12', 'affd', '2023-01-24 22:51:56'),
(8, 'renish suriya', 'renish@gmail.com', 'renish@gmail.com', '22', '0', 'fadf', '2023-01-24 22:53:03'),
(9, 'renish suriya', 'renish@gmail.com', 'renish@gmail.com', '20', '0', 'sowing', '2023-01-25 20:03:03');

-- --------------------------------------------------------

--
-- Table structure for table `register`
--

CREATE TABLE `register` (
  `uid` int(8) NOT NULL,
  `occupation` varchar(255) DEFAULT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phoneno` int(10) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `otp` int(8) DEFAULT NULL,
  `verified` int(5) DEFAULT NULL,
  `date` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `register`
--

INSERT INTO `register` (`uid`, `occupation`, `fullname`, `email`, `phoneno`, `password`, `otp`, `verified`, `date`) VALUES
(424718, 'farmer', 'renish', 'renish@gmail.com', 1234569870, 'rr', 5889, 1, '2023-01-18 14:46:50'),
(888249, 'farmer', 'sureshbhai', 'suresh@gmail.com', 1236547890, 'rn', 5247, 1, '2023-01-30 22:17:54'),
(912952, 'farmer', 'roshan', 'roshan@gmail.com', 1236547890, 'rr', 7348, 1, '2023-01-23 20:46:16'),
(962903, 'farmer', 'prince', 'prince@gmail.com', 1236547890, 'rr', 8289, 1, '2023-01-18 14:48:38');

-- --------------------------------------------------------

--
-- Table structure for table `request`
--

CREATE TABLE `request` (
  `id` int(11) NOT NULL,
  `sendingid` int(8) DEFAULT NULL,
  `receivingid` int(8) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `picture` text DEFAULT NULL,
  `occupation` varchar(255) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `date` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

CREATE TABLE `review` (
  `id` int(8) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `date` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `review`
--

INSERT INTO `review` (`id`, `name`, `description`, `date`) VALUES
(1, 'Renish Suriya', 'This website is very usefull for farmer,worker and sellers...', '2023-01-18 15:00:24');

-- --------------------------------------------------------

--
-- Table structure for table `user_profile`
--

CREATE TABLE `user_profile` (
  `uid` int(11) NOT NULL,
  `picture` text DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `occupation` varchar(255) DEFAULT NULL,
  `phoneno` int(10) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `age` int(8) DEFAULT NULL,
  `workhour` int(8) DEFAULT NULL,
  `approxsalary` int(8) DEFAULT NULL,
  `date` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_profile`
--

INSERT INTO `user_profile` (`uid`, `picture`, `token`, `email`, `fullname`, `occupation`, `phoneno`, `address`, `gender`, `age`, `workhour`, `approxsalary`, `date`) VALUES
(424718, NULL, NULL, 'renish@gmail.com', 'renish suriya', 'farmer', 1234569870, 'ahmdavad,varachha', 'male', 15, 10, NULL, '2023-01-18 14:46:50'),
(888249, NULL, NULL, 'suresh@gmail.com', 'sureshbhai satasiya', 'farmer', 1236547890, 'junagadh', 'male', 18, 12, NULL, '2023-01-30 22:17:54'),
(912952, NULL, NULL, 'roshan@gmail.com', 'roshan thummar', 'farmer', 1236547890, NULL, NULL, NULL, NULL, NULL, '2023-01-23 20:46:17'),
(962903, NULL, NULL, 'prince@gmail.com', 'prince suriya', 'worker', 1236547890, NULL, NULL, NULL, NULL, NULL, '2023-01-18 14:48:39');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `register`
--
ALTER TABLE `register`
  ADD PRIMARY KEY (`uid`);

--
-- Indexes for table `request`
--
ALTER TABLE `request`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_profile`
--
ALTER TABLE `user_profile`
  ADD PRIMARY KEY (`uid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `register`
--
ALTER TABLE `register`
  MODIFY `uid` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=962904;

--
-- AUTO_INCREMENT for table `request`
--
ALTER TABLE `request`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `review`
--
ALTER TABLE `review`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user_profile`
--
ALTER TABLE `user_profile`
  MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=962904;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
