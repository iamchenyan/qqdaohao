/*
Navicat MySQL Data Transfer

Source Server         : yanhom
Source Server Version : 50087
Source Host           : localhost:3306
Source Database       : qqfeiche

Target Server Type    : MYSQL
Target Server Version : 50087
File Encoding         : 65001

Date: 2015-09-26 00:03:31
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for t_user
-- ----------------------------
DROP TABLE IF EXISTS `t_user`;
CREATE TABLE `t_user` (
  `id` int(11) NOT NULL auto_increment,
  `pass` varchar(255) default NULL,
  `qq` varchar(255) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_user
-- ----------------------------
INSERT INTO `t_user` VALUES ('17', '345345345', '332345345');
INSERT INTO `t_user` VALUES ('18', 'zhiaiqihuan96.', '1183884530');
INSERT INTO `t_user` VALUES ('19', 'wpwp921735116.', '1095966232');
INSERT INTO `t_user` VALUES ('20', '1460021616', '1763880413');
INSERT INTO `t_user` VALUES ('21', '$19892216zhl', '348158259');
INSERT INTO `t_user` VALUES ('22', 'kepan4962866940.', '496286694');
INSERT INTO `t_user` VALUES ('23', 'cuimingyue199706', '1051591521');
INSERT INTO `t_user` VALUES ('24', 'zhang1993', '105881157');
INSERT INTO `t_user` VALUES ('26', 'ZHONG123', '591953705');
INSERT INTO `t_user` VALUES ('27', 'lyz19851206', '2763495162');
INSERT INTO `t_user` VALUES ('28', 'dolly198001', '846500502');
