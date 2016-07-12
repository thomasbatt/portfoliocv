-- phpMyAdmin SQL Dump
-- version 4.6.0
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jul 12, 2016 at 03:37 PM
-- Server version: 5.7.12-0ubuntu1
-- PHP Version: 7.0.7-2+donate.sury.org~xenial+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `portfolio`
--

-- --------------------------------------------------------

--
-- Table structure for table `pfolio_errors`
--

CREATE TABLE `pfolio_errors` (
  `id` int(10) UNSIGNED NOT NULL,
  `type` varchar(31) CHARACTER SET utf8 NOT NULL,
  `message` varchar(1023) CHARACTER SET utf8 NOT NULL,
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `pfolio_mail`
--

CREATE TABLE `pfolio_mail` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(31) CHARACTER SET utf8 NOT NULL,
  `email` varchar(31) CHARACTER SET utf8 NOT NULL,
  `subject` varchar(31) CHARACTER SET utf8 NOT NULL,
  `message` varchar(1023) CHARACTER SET utf8 NOT NULL,
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `pfolio_errors`
--
ALTER TABLE `pfolio_errors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pfolio_mail`
--
ALTER TABLE `pfolio_mail`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `pfolio_errors`
--
ALTER TABLE `pfolio_errors`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `pfolio_mail`
--
ALTER TABLE `pfolio_mail`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;