-- MySQL Script generated by MySQL Workbench
-- Sun May 29 19:11:59 2022
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema challange_alkemy
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema challange_alkemy
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `challange_alkemy` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `challange_alkemy` ;

-- -----------------------------------------------------
-- Table `challange_alkemy`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `challange_alkemy`.`user` (
  `email` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`email`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `challange_alkemy`.`category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `challange_alkemy`.`category` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` TEXT NOT NULL,
  `date_created` DATE NOT NULL,
  `user_email` VARCHAR(255) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_category_user` (`user_email` ASC) VISIBLE,
  CONSTRAINT `fk_category_user`
    FOREIGN KEY (`user_email`)
    REFERENCES `challange_alkemy`.`user` (`email`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `challange_alkemy`.`operation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `challange_alkemy`.`operation` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `concept` TEXT NOT NULL,
  `amount` DOUBLE NOT NULL,
  `date` DATE NOT NULL,
  `type` ENUM('Ingreso', 'Egreso') NOT NULL,
  `category_id` INT UNSIGNED NOT NULL,
  `user_email` VARCHAR(255) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_operation_category` (`category_id` ASC) INVISIBLE,
  INDEX `fk_operation_user` (`user_email` ASC) VISIBLE,
  CONSTRAINT `fk_operation_category`
    FOREIGN KEY (`category_id`)
    REFERENCES `challange_alkemy`.`category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_operation_user`
    FOREIGN KEY (`user_email`)
    REFERENCES `challange_alkemy`.`user` (`email`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 9
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;