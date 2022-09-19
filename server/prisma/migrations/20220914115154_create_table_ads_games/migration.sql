-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "bannerURL" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "AD" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "gameId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "yearsPlaying" INTEGER NOT NULL,
    "discord" TEXT NOT NULL,
    "weekDays" TEXT NOT NULL,
    "hourStart" INTEGER NOT NULL,
    "hourEnd" INTEGER NOT NULL,
    "useVoiceChannel" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AD_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
