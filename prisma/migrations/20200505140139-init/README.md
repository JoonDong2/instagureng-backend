# Migration `20200505140139-init`

This migration has been generated by joondong2 at 5/5/2020, 2:01:39 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE `instagureng`.`User` ADD COLUMN `name` varchar(191) NOT NULL DEFAULT '' ,
ALTER COLUMN `firstName` SET DEFAULT '',
ALTER COLUMN `lastName` SET DEFAULT '';
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200505140105-init..20200505140139-init
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "mysql"
-  url = "***"
+  url      = env("DATABASE_URL")
 }
 generator client {
   provider = "prisma-client-js"
@@ -15,11 +15,11 @@
   id          Int       @default(autoincrement()) @id
   userName    String    @unique
   avatar      String    @default(value: "https://3.bp.blogspot.com/-qtEejOg1NHA/Xobmg2y_QeI/AAAAAAAAIVE/UFKPvpeHjKUqCEFOX8lT4MsKz-PwpEGJgCLcBGAsYHQ/s1600/default_user.png")
   email       String    @unique
-  firstName   String
-  lastName    String
-  name        String
+  firstName   String    @default(value: "")
+  lastName    String    @default(value: "")
+  name        String    @default(value: "")
   bio         String    @default(value: "")
   posts       Post[]
   followers   User[]    @relation("UserFollows", references: [id])
   following   User[]    @relation("UserFollows", references: [id])
```


