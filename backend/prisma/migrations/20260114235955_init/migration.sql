-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `prenom` VARCHAR(191) NOT NULL,
    `nom` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `motDePasse` VARCHAR(191) NOT NULL,
    `profilId` INTEGER NOT NULL,
    `description` VARCHAR(191) NULL,
    `societeId` INTEGER NULL,
    `dateCreation` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dateModification` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `profils` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `dateCreation` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dateModification` DATETIME(3) NOT NULL,

    UNIQUE INDEX `profils_nom_key`(`nom`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `societes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `adresse` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `telephone` VARCHAR(191) NULL,
    `responsable` VARCHAR(191) NULL,
    `dateCreation` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dateModification` DATETIME(3) NOT NULL,

    UNIQUE INDEX `societes_nom_key`(`nom`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `statuts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `quiPeutAppliquer` VARCHAR(191) NULL,
    `actif` BOOLEAN NOT NULL DEFAULT true,
    `dateCreation` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dateModification` DATETIME(3) NOT NULL,

    UNIQUE INDEX `statuts_nom_key`(`nom`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `collaborateurs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `poste` VARCHAR(191) NULL,
    `telephone` VARCHAR(191) NULL,
    `actif` BOOLEAN NOT NULL DEFAULT true,
    `dateCreation` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dateModification` DATETIME(3) NOT NULL,

    UNIQUE INDEX `collaborateurs_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `demandes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nomProjet` VARCHAR(191) NULL,
    `description` TEXT NULL,
    `descriptionPerimetre` TEXT NULL,
    `perimetre` TEXT NULL,
    `typeProjet` VARCHAR(191) NULL,
    `dateReception` DATETIME(3) NOT NULL,
    `dateValidationSI` DATETIME(3) NULL,
    `dateValidationPlanningDEV` DATETIME(3) NULL,
    `dateValidationPlanningTIV` DATETIME(3) NULL,
    `dateReponseDEV` DATETIME(3) NULL,
    `dateReponseTIV` DATETIME(3) NULL,
    `dateValidationPlanChargeDEV` DATETIME(3) NULL,
    `dateValidationPlanChargeTIV` DATETIME(3) NULL,
    `statutSoumission` VARCHAR(191) NULL,
    `statutId` INTEGER NULL,
    `isDraft` BOOLEAN NOT NULL DEFAULT false,
    `dateCreation` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dateModification` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sprints` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `dateDebut` DATETIME(3) NOT NULL,
    `dateFin` DATETIME(3) NOT NULL,
    `dateValidationSI` DATETIME(3) NULL,
    `dateReponseDEV` DATETIME(3) NULL,
    `dateReponseTIV` DATETIME(3) NULL,
    `etape` VARCHAR(191) NULL,
    `evenementImportant` VARCHAR(191) NULL,
    `pointsControle` JSON NULL,
    `ressources` JSON NULL,
    `respectPlanning` BOOLEAN NOT NULL DEFAULT false,
    `dateCreation` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dateModification` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ressources` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `disponibiliteHJ` DOUBLE NOT NULL,
    `tauxJournalier` DOUBLE NOT NULL,
    `actif` BOOLEAN NOT NULL DEFAULT true,
    `dateCreation` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dateModification` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `delais` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dateValidationSI` DATETIME(3) NULL,
    `dateReponseDEV` DATETIME(3) NULL,
    `dateReponseTIV` DATETIME(3) NULL,
    `delaiDEV` DOUBLE NULL,
    `delaiTIV` DOUBLE NULL,
    `respectDelaiDEV` BOOLEAN NOT NULL DEFAULT false,
    `respectDelaiTIV` BOOLEAN NOT NULL DEFAULT false,
    `rappelEnvoyeDEV` BOOLEAN NOT NULL DEFAULT false,
    `rappelEnvoyeTIV` BOOLEAN NOT NULL DEFAULT false,
    `notificationVue` BOOLEAN NOT NULL DEFAULT false,
    `dateCreation` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dateModification` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `couts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `chargePrevisionnelleDEV` DOUBLE NULL,
    `chargeEffectiveDEV` DOUBLE NULL,
    `tjmDEV` DOUBLE NULL,
    `chargePrevisionnelleTIV` DOUBLE NULL,
    `chargeEffectiveTIV` DOUBLE NULL,
    `tjmTIV` DOUBLE NULL,
    `coutPrevuDEV` DOUBLE NULL,
    `coutReelDEV` DOUBLE NULL,
    `coutPrevuTIV` DOUBLE NULL,
    `coutReelTIV` DOUBLE NULL,
    `coutPrevuTotal` DOUBLE NULL,
    `coutReelTotal` DOUBLE NULL,
    `ecart` DOUBLE NULL,
    `dateCreation` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dateModification` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `recettes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dateDebut` DATETIME(3) NOT NULL,
    `dateFin` DATETIME(3) NULL,
    `anomaliesBloquantes` INTEGER NOT NULL DEFAULT 0,
    `anomaliesMajeures` INTEGER NOT NULL DEFAULT 0,
    `anomaliesMineures` INTEGER NOT NULL DEFAULT 0,
    `statutGlobal` VARCHAR(191) NOT NULL,
    `commentairesGP` TEXT NULL,
    `dateCreation` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dateModification` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `uat` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dateDebutUAT` DATETIME(3) NOT NULL,
    `dateFinUAT` DATETIME(3) NULL,
    `statutUAT` VARCHAR(191) NOT NULL,
    `nombreRetoursUAT` INTEGER NOT NULL DEFAULT 0,
    `reservesMetier` TEXT NULL,
    `commentaireUAT` TEXT NULL,
    `signatureValidationClient` VARCHAR(191) NULL,
    `planAction` TEXT NULL,
    `dateCreation` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dateModification` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `livraisons` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `numeroVersion` VARCHAR(191) NOT NULL,
    `releaseNotes` TEXT NOT NULL,
    `dateLivraisonPrevue` DATETIME(3) NOT NULL,
    `dateLivraisonEffective` DATETIME(3) NULL,
    `dateDeploiement` DATETIME(3) NULL,
    `responsableDevOps` VARCHAR(191) NULL,
    `statutLivraison` VARCHAR(191) NOT NULL,
    `commentairesGP` TEXT NULL,
    `validationGONOGO` VARCHAR(191) NULL,
    `rollbackAutomatique` BOOLEAN NOT NULL DEFAULT false,
    `dateCreation` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dateModification` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `unites_organisationnelles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NULL,
    `adresse` VARCHAR(191) NULL,
    `codePostal` VARCHAR(191) NULL,
    `actif` BOOLEAN NOT NULL DEFAULT true,
    `societeId` INTEGER NULL,
    `uoParenteId` INTEGER NULL,
    `dateCreation` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dateModification` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cadre_temporel` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dateDebutProjet` DATETIME(3) NOT NULL,
    `dateFinPrevisionnelle` DATETIME(3) NOT NULL,
    `statutValidationDate` VARCHAR(191) NULL,
    `dateCommunicationPlanningClient` DATETIME(3) NOT NULL,
    `dateCreation` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dateModification` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_profilId_fkey` FOREIGN KEY (`profilId`) REFERENCES `profils`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_societeId_fkey` FOREIGN KEY (`societeId`) REFERENCES `societes`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `demandes` ADD CONSTRAINT `demandes_statutId_fkey` FOREIGN KEY (`statutId`) REFERENCES `statuts`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
