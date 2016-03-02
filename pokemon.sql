SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;


CREATE TABLE IF NOT EXISTS `characters` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `x` int(11) NOT NULL,
  `y` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

INSERT INTO `characters` (`id`, `x`, `y`) VALUES
(1, 0, 0),
(2, 1, 0),
(3, 2, 0),
(4, 3, 0),
(5, 4, 0);

CREATE TABLE IF NOT EXISTS `npc` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `movment_type` enum('moving','standing') NOT NULL,
  `movment_radius` int(11) NOT NULL,
  `movment_start_x` int(11) NOT NULL,
  `movment_start_y` int(11) NOT NULL,
  `movment_start_looking` int(11) NOT NULL,
  `image_x` int(11) NOT NULL,
  `image_y` int(11) NOT NULL,
  `map` enum('fullMap','gym_01','mine_01','pokaHeal','pokaHeal_02') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

INSERT INTO `npc` (`id`, `name`, `movment_type`, `movment_radius`, `movment_start_x`, `movment_start_y`, `movment_start_looking`, `image_x`, `image_y`, `map`) VALUES
(1, 'lasse', 'moving', 2, 20, 21, 0, 0, 0, 'fullMap'),
(2, 'the Master', 'moving', 4, 23, 39, 0, 1, 0, 'fullMap'),
(3, 'fie', 'moving', 4, 64, 13, 0, 2, 0, 'fullMap'),
(4, 'pokemon center', 'standing', 0, 7, 2, 0, 3, 0, 'pokaHeal');

CREATE TABLE IF NOT EXISTS `npc_text` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `npcId` int(11) NOT NULL,
  `text` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=13 ;

INSERT INTO `npc_text` (`id`, `npcId`, `text`) VALUES
(1, 1, 'text page  1'),
(2, 1, 'text page  1'),
(3, 2, 'i''m the master over them all!'),
(4, 2, 'fear me!!!'),
(5, 2, 'feeeeeeeeeeeeeaaaaaaaaaar me!!!'),
(6, 2, 'Now!!!'),
(7, 3, 'you will soon be able to fight me!'),
(8, 3, 'just whait for the up'),
(9, 3, 'where he make it ;)'),
(10, 4, 'text that i will way when talk to'),
(11, 4, 'more text'),
(12, 4, 'more text2');

CREATE TABLE IF NOT EXISTS `player` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `characters` int(11) NOT NULL,
  `realm` int(11) NOT NULL,
  `world` varchar(255) NOT NULL,
  `x` int(11) NOT NULL,
  `y` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

INSERT INTO `player` (`id`, `name`, `characters`, `realm`, `world`, `x`, `y`) VALUES
(1, 'quer', 1, 1, 'fullMap', 22, 22),
(2, 'gamle', 2, 1, 'fullMap', 21, 22),
(3, 'test', 3, 1, 'fullMap', 21, 21),
(4, 'quer', 1, 2, 'fullMap', 22, 22);

CREATE TABLE IF NOT EXISTS `realm` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

INSERT INTO `realm` (`id`, `name`, `type`) VALUES
(1, 'server 1', 'pve'),
(2, 'server 2', 'pve'),
(3, 'server 3', 'pve'),
(4, 'server 1', 'pvp'),
(5, 'server 2', 'pvp'),
(6, 'server 3', 'pvp');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
