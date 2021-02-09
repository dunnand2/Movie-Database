-- authors: andrew dunn and jake schlaerth
-- data definition queries for movies database

-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 07, 2020 at 11:59 PM
-- Server version: 10.4.15-MariaDB-log
-- PHP Version: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs340_schlaerj`
--
CREATE DATABASE IF NOT EXISTS `cs340_schlaerj` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `cs340_schlaerj`;

-- --------------------------------------------------------

--
-- Table structure for table `actors`
--

CREATE TABLE `actors` (
  `actor_id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `actors`
--

INSERT INTO `actors` (`actor_id`, `first_name`, `last_name`) VALUES
(1, 'Harrison', 'Ford'),
(2, 'Mark', 'Hamill'),
(3, 'Carrie', 'Fisher'),
(4, 'Adam', 'Driver'),
(6, 'Harvey', 'Keitel'),
(14, 'Test', 'Actor'),
(15, 'Karen', 'Allen'),
(16, 'Paul', 'Freeman'),
(17, 'Quentin', 'Tarantino'),
(18, 'Michael', 'Madsen'),
(19, 'Tim', 'Roth'),
(20, 'Daisy', 'Ridley'),
(21, 'John', 'Boyega'),
(22, 'Oscar', 'Isaac'),
(23, 'Elijah', 'Wood'),
(24, 'Ian', 'McKellan'),
(25, 'Orlando', 'Bloom'),
(26, 'test', 'test'),
(27, 'no movies', 'for me'),
(34, 'Hugh', 'Jackman'),
(35, 'George', 'MacKay'),
(36, 'Viggo', 'Mortensen'),
(37, 'Nozumo', 'Sasaki'),
(38, 'Jesse', 'Plemons'),
(39, 'Jessie', 'Buckley'),
(40, 'Mathieu', 'Amalric'),
(42, 'Will', 'Ferrell'),
(43, 'Jim', 'Carrey');

-- --------------------------------------------------------

--
-- Table structure for table `composers`
--

CREATE TABLE `composers` (
  `composer_id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `composers`
--

INSERT INTO `composers` (`composer_id`, `first_name`, `last_name`) VALUES
(1, 'John', 'Williams'),
(4, 'Karyn', 'Rachtman'),
(7, 'Test', 'Composer'),
(8, 'Howard', 'Shore'),
(10, 'Philip', 'Glass'),
(11, 'Paul', 'Cantelon'),
(20, 'no movies', 'for me'),
(22, 'Wolfgang', 'Mozart'),
(24, 'Jung', 'Jae-il'),
(25, 'Kris', 'Bowers'),
(26, 'Thomas', 'Newman'),
(27, 'Marco', 'Beltrami'),
(28, 'Jay', 'Wadley'),
(29, 'Tsutomu', 'Ohashi'),
(30, 'Michael', 'Giacchino'),
(31, 'Britt', 'Daniel');

-- --------------------------------------------------------

--
-- Table structure for table `directors`
--

CREATE TABLE `directors` (
  `director_id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `directors`
--

INSERT INTO `directors` (`director_id`, `first_name`, `last_name`) VALUES
(1, 'J.J.', 'Abrams'),
(2, 'Quentin', 'Tarantino'),
(3, 'Steven', 'Spielberg'),
(15, 'Test', 'Director'),
(16, 'Peter', 'Jackson'),
(19, 'no movies', 'for me'),
(20, 'Julian', 'Schnabel'),
(23, 'Bong', 'Joon-ho'),
(24, 'Peter', 'Farrelly'),
(25, 'Sam', 'Mendes'),
(26, 'James', 'Mangold'),
(27, 'Charlie', 'Kaufman'),
(28, 'Katsuhiro', 'Otomo'),
(29, 'Taika', 'Waititi'),
(30, 'Marc', 'Forster'),
(31, 'Peter', 'Weir'),
(33, 'Ethan', 'Coen');

-- --------------------------------------------------------

--
-- Table structure for table `genres`
--

CREATE TABLE `genres` (
  `genre_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `genres`
--

INSERT INTO `genres` (`genre_id`, `name`) VALUES
(1, 'Science Fiction'),
(2, 'Action'),
(3, 'Epic'),
(4, 'Adventure'),
(5, 'Thriller'),
(6, 'Crime'),
(7, 'Mystery'),
(8, 'Drama'),
(12, 'test genre'),
(13, 'Fantasy'),
(14, 'Foreign'),
(15, 'Non Fiction'),
(20, 'no movies for me'),
(21, 'Anime'),
(22, 'Comedy'),
(23, 'War'),
(24, 'Dark Comedy'),
(25, 'Romance');

-- --------------------------------------------------------

--
-- Table structure for table `genre_instances`
--

CREATE TABLE `genre_instances` (
  `movie_id` int(11) NOT NULL,
  `genre_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `genre_instances`
--

INSERT INTO `genre_instances` (`movie_id`, `genre_id`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(2, 2),
(2, 5),
(2, 6),
(2, 7),
(2, 8),
(3, 2),
(3, 4),
(7, 6),
(7, 12),
(7, 22),
(8, 3),
(8, 6),
(8, 12),
(8, 22),
(10, 2),
(10, 3),
(10, 4),
(10, 13),
(11, 2),
(11, 3),
(11, 4),
(11, 13),
(12, 2),
(12, 3),
(12, 4),
(12, 13),
(15, 8),
(15, 14),
(15, 15),
(19, 5),
(20, 8),
(20, 22),
(21, 2),
(21, 23),
(22, 1),
(22, 2),
(22, 5),
(22, 13),
(23, 1),
(24, 7),
(24, 8),
(25, 2),
(25, 3),
(25, 21),
(26, 2),
(26, 22),
(26, 23),
(26, 24),
(27, 7),
(27, 8),
(27, 22),
(27, 25);

-- --------------------------------------------------------

--
-- Table structure for table `movies`
--

CREATE TABLE `movies` (
  `movie_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `release_year` year(4) NOT NULL,
  `director_id` int(11) NOT NULL,
  `composer_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `movies`
--

INSERT INTO `movies` (`movie_id`, `title`, `release_year`, `director_id`, `composer_id`) VALUES
(1, 'Star Wars: The Force Awakens', 2015, 1, 1),
(2, 'Reservoir Dogs', 1992, 2, 4),
(3, 'Raiders of the Lost Ark', 1981, 3, 1),
(7, 'Test Movie 2: Return of the Test', 2000, 15, 7),
(8, 'Test Movie 3: The Test Strikes Back', 2002, 15, 7),
(10, 'The Lord of the Rings: The Fellowship of the Ring', 2001, 16, 8),
(11, 'The Lord of the Rings: The Two Towers', 2002, 16, 8),
(12, 'The Lord of the Rings: The Return of the King', 2003, 16, 8),
(15, 'The Diving Bell and the Butterfly', 2007, 20, 11),
(19, 'Parasite', 2019, 23, 24),
(20, 'Green Book', 2019, 24, 25),
(21, '1917', 2019, 25, 26),
(22, 'Logan', 2017, 26, 27),
(23, 'Snowpiercer', 2013, 23, 27),
(24, 'I\'m Thinking of Ending Things', 2020, 27, 28),
(25, 'Akira', 1988, 28, 29),
(26, 'Jojo Rabbit', 2019, 29, 30),
(27, 'Stranger than Fiction', 2006, 30, 31),
(28, 'The Truman Show', 1998, 31, 10),
(29, 'No Country for Old Men', 2007, 33, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `performances`
--

CREATE TABLE `performances` (
  `movie_id` int(11) NOT NULL,
  `actor_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `performances`
--

INSERT INTO `performances` (`movie_id`, `actor_id`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 19),
(1, 20),
(1, 21),
(1, 22),
(2, 6),
(2, 17),
(2, 18),
(2, 19),
(3, 1),
(3, 15),
(3, 16),
(7, 14),
(8, 14),
(10, 23),
(10, 24),
(10, 25),
(10, 36),
(11, 23),
(11, 24),
(11, 25),
(11, 36),
(12, 23),
(12, 24),
(12, 25),
(12, 36),
(15, 40),
(20, 36),
(21, 35),
(22, 34),
(24, 38),
(24, 39),
(25, 37),
(27, 42),
(28, 43);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `actors`
--
ALTER TABLE `actors`
  ADD PRIMARY KEY (`actor_id`);

--
-- Indexes for table `composers`
--
ALTER TABLE `composers`
  ADD PRIMARY KEY (`composer_id`);

--
-- Indexes for table `directors`
--
ALTER TABLE `directors`
  ADD PRIMARY KEY (`director_id`);

--
-- Indexes for table `genres`
--
ALTER TABLE `genres`
  ADD PRIMARY KEY (`genre_id`);

--
-- Indexes for table `genre_instances`
--
ALTER TABLE `genre_instances`
  ADD PRIMARY KEY (`movie_id`,`genre_id`),
  ADD KEY `genre_id` (`genre_id`);

--
-- Indexes for table `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`movie_id`),
  ADD KEY `director_id` (`director_id`),
  ADD KEY `composer_id` (`composer_id`);

--
-- Indexes for table `performances`
--
ALTER TABLE `performances`
  ADD PRIMARY KEY (`movie_id`,`actor_id`),
  ADD KEY `actor_id` (`actor_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `actors`
--
ALTER TABLE `actors`
  MODIFY `actor_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `composers`
--
ALTER TABLE `composers`
  MODIFY `composer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `directors`
--
ALTER TABLE `directors`
  MODIFY `director_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `genres`
--
ALTER TABLE `genres`
  MODIFY `genre_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `movies`
--
ALTER TABLE `movies`
  MODIFY `movie_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `genre_instances`
--
ALTER TABLE `genre_instances`
  ADD CONSTRAINT `genre_instances_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`movie_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `genre_instances_ibfk_2` FOREIGN KEY (`genre_id`) REFERENCES `genres` (`genre_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `movies`
--
ALTER TABLE `movies`
  ADD CONSTRAINT `movies_ibfk_1` FOREIGN KEY (`director_id`) REFERENCES `directors` (`director_id`),
  ADD CONSTRAINT `movies_ibfk_2` FOREIGN KEY (`composer_id`) REFERENCES `composers` (`composer_id`);

--
-- Constraints for table `performances`
--
ALTER TABLE `performances`
  ADD CONSTRAINT `performances_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`movie_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `performances_ibfk_2` FOREIGN KEY (`actor_id`) REFERENCES `actors` (`actor_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
