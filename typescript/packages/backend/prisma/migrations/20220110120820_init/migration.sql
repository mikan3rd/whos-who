-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `authUid` VARCHAR(255) NOT NULL,
    `displayName` VARCHAR(255) NULL,
    `photoUrl` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,
    `role` ENUM('NONE', 'MEMBER', 'ADMIN') NOT NULL DEFAULT 'NONE',
    `status` ENUM('ACTIVE', 'DISABLED') NOT NULL DEFAULT 'ACTIVE',
    `point` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    UNIQUE INDEX `User_authUid_key`(`authUid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;

-- CreateTable
CREATE TABLE `Ticket` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(255) NOT NULL,
    `uploadedImageId` VARCHAR(255) NULL,
    `externalImageId` VARCHAR(255) NULL,
    `personId` VARCHAR(255) NULL,
    `mainPersonSuggestionId` VARCHAR(255) NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    UNIQUE INDEX `Ticket_uploadedImageId_key`(`uploadedImageId`),
    UNIQUE INDEX `Ticket_externalImageId_key`(`externalImageId`),
    UNIQUE INDEX `Ticket_mainPersonSuggestionId_key`(`mainPersonSuggestionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;

-- CreateTable
CREATE TABLE `UploadedImage` (
    `id` VARCHAR(191) NOT NULL,
    `bucketName` VARCHAR(255) NOT NULL,
    `fileName` VARCHAR(512) NOT NULL,
    `url` VARCHAR(512) NOT NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    UNIQUE INDEX `UploadedImage_url_key`(`url`),
    UNIQUE INDEX `UploadedImage_bucketName_fileName_key`(`bucketName`, `fileName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;

-- CreateTable
CREATE TABLE `ExternalImage` (
    `id` VARCHAR(191) NOT NULL,
    `url` VARCHAR(512) NOT NULL,
    `statusCode` INTEGER NOT NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    UNIQUE INDEX `ExternalImage_url_key`(`url`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;

-- CreateTable
CREATE TABLE `Person` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `nameHiragana` VARCHAR(255) NULL,
    `nameKatakana` VARCHAR(255) NULL,
    `nameAlphabet` VARCHAR(255) NULL,
    `birthDate` DATE NULL,
    `occupationId` VARCHAR(255) NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    UNIQUE INDEX `Person_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;

-- CreateTable
CREATE TABLE `Occupation` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `nameHiragana` VARCHAR(255) NULL,
    `nameKatakana` VARCHAR(255) NULL,
    `nameAlphabet` VARCHAR(255) NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    UNIQUE INDEX `Occupation_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;

-- CreateTable
CREATE TABLE `TicketUserLike` (
    `id` VARCHAR(191) NOT NULL,
    `ticketId` VARCHAR(255) NOT NULL,
    `userId` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    UNIQUE INDEX `TicketUserLike_ticketId_userId_key`(`ticketId`, `userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;

-- CreateTable
CREATE TABLE `PersonSuggestion` (
    `id` VARCHAR(191) NOT NULL,
    `ticketId` VARCHAR(255) NOT NULL,
    `personId` VARCHAR(255) NOT NULL,
    `userId` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    UNIQUE INDEX `PersonSuggestion_ticketId_personId_key`(`ticketId`, `personId`),
    UNIQUE INDEX `PersonSuggestion_ticketId_userId_key`(`ticketId`, `userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;

-- CreateTable
CREATE TABLE `PersonSuggestionLike` (
    `id` VARCHAR(191) NOT NULL,
    `ticketId` VARCHAR(255) NOT NULL,
    `personSuggestionId` VARCHAR(255) NOT NULL,
    `userId` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    UNIQUE INDEX `PersonSuggestionLike_ticketId_userId_key`(`ticketId`, `userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;

-- CreateTable
CREATE TABLE `GoogleAuthCredential` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(255) NOT NULL,
    `uid` VARCHAR(255) NOT NULL,
    `displayName` VARCHAR(255) NULL,
    `photoUrl` VARCHAR(255) NULL,
    `accessToken` TEXT NOT NULL,
    `refreshToken` TEXT NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    UNIQUE INDEX `GoogleAuthCredential_userId_key`(`userId`),
    UNIQUE INDEX `GoogleAuthCredential_uid_key`(`uid`),
    UNIQUE INDEX `GoogleAuthCredential_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;

-- CreateTable
CREATE TABLE `TwitterAuthCredential` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(255) NOT NULL,
    `uid` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NULL,
    `displayName` VARCHAR(255) NULL,
    `screenName` VARCHAR(255) NULL,
    `photoUrl` VARCHAR(255) NULL,
    `accessToken` TEXT NOT NULL,
    `refreshToken` TEXT NOT NULL,
    `oauthAccessToken` TEXT NOT NULL,
    `oauthTokenSecret` TEXT NOT NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    UNIQUE INDEX `TwitterAuthCredential_userId_key`(`userId`),
    UNIQUE INDEX `TwitterAuthCredential_uid_key`(`uid`),
    UNIQUE INDEX `TwitterAuthCredential_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;

-- AddForeignKey
ALTER TABLE
    `Ticket`
ADD
    CONSTRAINT `Ticket_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE
    `Ticket`
ADD
    CONSTRAINT `Ticket_uploadedImageId_fkey` FOREIGN KEY (`uploadedImageId`) REFERENCES `UploadedImage`(`id`) ON DELETE
SET
    NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE
    `Ticket`
ADD
    CONSTRAINT `Ticket_externalImageId_fkey` FOREIGN KEY (`externalImageId`) REFERENCES `ExternalImage`(`id`) ON DELETE
SET
    NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE
    `Ticket`
ADD
    CONSTRAINT `Ticket_personId_fkey` FOREIGN KEY (`personId`) REFERENCES `Person`(`id`) ON DELETE
SET
    NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE
    `Ticket`
ADD
    CONSTRAINT `Ticket_mainPersonSuggestionId_fkey` FOREIGN KEY (`mainPersonSuggestionId`) REFERENCES `PersonSuggestion`(`id`) ON DELETE
SET
    NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE
    `Person`
ADD
    CONSTRAINT `Person_occupationId_fkey` FOREIGN KEY (`occupationId`) REFERENCES `Occupation`(`id`) ON DELETE
SET
    NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE
    `TicketUserLike`
ADD
    CONSTRAINT `TicketUserLike_ticketId_fkey` FOREIGN KEY (`ticketId`) REFERENCES `Ticket`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE
    `TicketUserLike`
ADD
    CONSTRAINT `TicketUserLike_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE
    `PersonSuggestion`
ADD
    CONSTRAINT `PersonSuggestion_ticketId_fkey` FOREIGN KEY (`ticketId`) REFERENCES `Ticket`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE
    `PersonSuggestion`
ADD
    CONSTRAINT `PersonSuggestion_personId_fkey` FOREIGN KEY (`personId`) REFERENCES `Person`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE
    `PersonSuggestion`
ADD
    CONSTRAINT `PersonSuggestion_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE
    `PersonSuggestionLike`
ADD
    CONSTRAINT `PersonSuggestionLike_ticketId_fkey` FOREIGN KEY (`ticketId`) REFERENCES `Ticket`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE
    `PersonSuggestionLike`
ADD
    CONSTRAINT `PersonSuggestionLike_personSuggestionId_fkey` FOREIGN KEY (`personSuggestionId`) REFERENCES `PersonSuggestion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE
    `PersonSuggestionLike`
ADD
    CONSTRAINT `PersonSuggestionLike_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE
    `GoogleAuthCredential`
ADD
    CONSTRAINT `GoogleAuthCredential_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE
    `TwitterAuthCredential`
ADD
    CONSTRAINT `TwitterAuthCredential_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
