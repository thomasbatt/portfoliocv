-- phpMyAdmin SQL Dump
-- version 4.6.0
-- http://www.phpmyadmin.net
--
-- Client :  localhost
-- Généré le :  Jeu 14 Juillet 2016 à 14:50
-- Version du serveur :  5.5.49-0ubuntu0.14.04.1
-- Version de PHP :  5.5.9-1ubuntu4.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Base de données :  `portfolio`
--

-- --------------------------------------------------------

--
-- Structure de la table `pfolio_errors`
--

CREATE TABLE `pfolio_errors` (
  `id` int(10) UNSIGNED NOT NULL,
  `type` varchar(31) CHARACTER SET utf8 NOT NULL,
  `message` varchar(1023) CHARACTER SET utf8 NOT NULL,
  `position` int(10) UNSIGNED NOT NULL DEFAULT '0',
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
-- Index pour les tables exportées
--

--
-- Index pour la table `pfolio_errors`
--
ALTER TABLE `pfolio_errors`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `pfolio_mail`
--
ALTER TABLE `pfolio_mail`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `pfolio_errors`
--
ALTER TABLE `pfolio_errors`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `pfolio_mail`
--
ALTER TABLE `pfolio_mail`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;