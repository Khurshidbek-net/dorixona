create DATABASE dorixona;


use dorixona;

CREATE TABLE `Pharmacies`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `region_id` BIGINT NOT NULL,
    `district_id` BIGINT NOT NULL
);


CREATE TABLE `Medicines`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `manufacturer` VARCHAR(255) NOT NULL,
    `medicine_type_id` BIGINT NOT NULL,
    `price` FLOAT(53) NOT NULL,
    `expiry_date` DATE NOT NULL,
    `info` TEXT NOT NULL
);
CREATE TABLE `Stock`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `pharmacy_id` BIGINT NOT NULL,
    `medicine_id` BIGINT NOT NULL,
    `quantity` BIGINT NOT NULL
);
CREATE TABLE `District`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `region_id` BIGINT NOT NULL
);


CREATE TABLE `Region`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL
);


CREATE TABLE `MedicineType`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL
);




INSERT INTO MedicineType (name)
VALUES 
    ('Tabletkalar'),
    ('Siroplar'),
    ('Kapsulalar'),
    ('Tomchilar'),
    ('Spraylar'),
    ('Vitaminlar'),
    ('Antibiotiklar'),
    ('Antiseptiklar'),
    ('Oziqlantiruvchi dori vositalari'),
    ('Dori kukunlari')





INSERT INTO Region (name) VALUES 
('Toshkent shahri'),
('Toshkent viloyati'),
('Samarqand viloyati'),
('Farg‘ona viloyati'),
('Andijon viloyati'),
('Namangan viloyati'),
('Buxoro viloyati'),
('Qashqadaryo viloyati'),
('Surxondaryo viloyati'),
('Jizzax viloyati'),
('Sirdaryo viloyati'),
('Navoiy viloyati'),
('Xorazm viloyati'),
('Qoraqalpog‘iston Respublikasi');



SELECT * from Pharmacies p





INSERT INTO `District` (`name`, `region_id`) VALUES
('Yunusabad', 1),
('Mirobod', 1),
('Shayxontohur', 1),
('Olmazor', 1),
('Almazar', 1),
('Bektemir', 1),
('Mirzo Ulugbek', 1),
('Chilonzor', 1),
('Sergeli', 1),
('Yakkasaroy', 1),
('Hamza', 1),
('Zangiota', 1),
('Bektemir', 2),
('Mirzo Ulugbek', 2),
('Chilonzor', 2),
('Tashkent', 2),
('Zafarabad', 2),
('Qibray', 2),
('Angren', 2),
('Chirchiq', 2),
('Olmaliq', 2),
('Yangiyo‘l', 2),
('Piskent', 2),
('Tashkent', 2),
('Samarkand', 3),
('Jomboy', 3),
('Kattaqo‘rg‘on', 3),
('Urgut', 3),
('Narpay', 3),
('Ishtixon', 3),
('Pastdarg‘om', 3),
('Taylak', 3),
('Bulung‘ur', 3),
('Kishlok', 3),
('Oqdarya', 3),
('Zarafshon', 3),
('Farg‘ona', 4),
('Qo‘qon', 4),
('Mingbuloq', 4),
('Beshariq', 4),
('Rishton', 4),
('Quva', 4),
('Dangara', 4),
('Oltiariq', 4),
('Yazyavan', 4),
('Kuva', 4),
('Andijon', 5),
('Shahrixon', 5),
('Xo‘jaobod', 5),
('Jalaquduq', 5),
('Asaka', 5),
('Bo‘z', 5),
('Baliqchi', 5),
('Kurgontepa', 5),
('Namangan', 6),
('Toshloq', 6),
('Chortoq', 6),
('Uchqo‘rg‘on', 6),
('Chust', 6),
('Pop', 6),
('Mingbuloq', 6),
('Namangan', 6),
('Buxoro', 7),
('Kogon', 7),
('Vobkent', 7),
('Qorako‘l', 7),
('Romitan', 7),
('Shofirkon', 7),
('G‘ijduvon', 7),
('Jondor', 7),
('Qashqadaryo', 8),
('Shahrisabz', 8),
('Chiroqchi', 8),
('Yakkabog‘', 8),
('Kasbi', 8),
('Qarshi', 8),
('Shahrisabz', 8),
('Chiroqchi', 8),
('Surxondaryo', 9),
('Termiz', 9),
('Boysun', 9),
('Sherobod', 9),
('Sariosiyo', 9),
('Uzun', 9),
('Angor', 9),
('Oqoltin', 9),
('Jizzax', 10),
('Arnasoy', 10),
('Zafarobod', 10),
('G‘allaorol', 10),
('Yangiobod', 10),
('Baxmal', 10),
('Sirdaryo', 11),
('Guliston', 11),
('Mirzaobod', 11),
('Oqoltin', 11),
('Sayxunobod', 11),
('Navoiy', 12),
('Karmana', 12),
('Zafarabad', 12),
('Kiziltepa', 12),
('Nurota', 12),
('Xorazm', 13),
('Urganch', 13),
('Shovot', 13),
('Yangiarik', 13),
('Khiva', 13),
('Boskent', 13),
('Nukus', 14),
('Shumanay', 14),
('Chimboy', 14),
('Beyneu', 14),
('Qonliko‘l', 14),
('Kegeyli', 14),
('Ellikqal’a', 14);
















































ALTER TABLE
    `District` ADD CONSTRAINT `district_region_id_foreign` FOREIGN KEY(`region_id`) REFERENCES `Region`(`id`);
ALTER TABLE
    `Stock` ADD CONSTRAINT `stock_pharmacy_id_foreign` FOREIGN KEY(`pharmacy_id`) REFERENCES `Pharmacies`(`id`);
ALTER TABLE
    `Pharmacies` ADD CONSTRAINT `pharmacies_district_id_foreign` FOREIGN KEY(`district_id`) REFERENCES `District`(`id`);
ALTER TABLE
    `Medicines` ADD CONSTRAINT `medicines_medicine_type_id_foreign` FOREIGN KEY(`medicine_type_id`) REFERENCES `MedicineType`(`id`);
ALTER TABLE
    `Pharmacies` ADD CONSTRAINT `pharmacies_region_id_foreign` FOREIGN KEY(`region_id`) REFERENCES `Region`(`id`);
ALTER TABLE
    `Stock` ADD CONSTRAINT `stock_medicine_id_foreign` FOREIGN KEY(`medicine_id`) REFERENCES `Medicines`(`id`);