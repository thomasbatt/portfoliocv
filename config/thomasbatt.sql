-- phpMyAdmin SQL Dump
-- version 4.6.0
-- http://www.phpmyadmin.net
--
-- Client :  localhost
-- Généré le :  Jeu 07 Juillet 2016 à 20:12
-- Version du serveur :  5.7.12-0ubuntu1
-- Version de PHP :  7.0.7-2+donate.sury.org~xenial+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Base de données :  `portfolio`
--

-- --------------------------------------------------------

--
-- Structure de la table `pfolio_mail`
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
-- Contenu de la table `pfolio_mail`
--

INSERT INTO `pfolio_mail` (`id`, `name`, `email`, `subject`, `message`, `create_date`) VALUES
(1, 'azu', 'toto@coucou.fr', 'test', 'mjsdh musdhfgisudhg fiusdh fvgisdfh vld wvlwg lviu fsdwlv wdliug vwsdimuv ', '2016-07-07 18:10:25');

--
-- Index pour les tables exportées
--

--
-- Index pour la table `pfolio_mail`
--
ALTER TABLE `pfolio_mail`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `pfolio_mail`
--
ALTER TABLE `pfolio_mail`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;