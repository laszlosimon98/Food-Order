# Ételrendelő webalkalmazás

Ez a projekt egy teljes körű ételrendelő webalkalmazás, amely lehetőséget biztosít a felhasználóknak arra, hogy könnyedén böngésszenek, rendeljenek és értékeljenek ételeket. A rendszer különböző szerepköröket (User, Employee, Admin) biztosít, amelyek eltérő jogosultságokkal rendelkeznek.

## Funkcionalitások

### **Nyilvános funkciók**

- Az ételek listázása bejelentkezés nélkül
- Szűrés és rendezés különböző paraméterek alapján
- Az egyes ételek részletes adatlapjának megtekintése
- Regisztráció és bejelentkezés (minden új felhasználó alapértelmezetten User jogosultságot kap)
- Ételek kosárba helyezése

### **Felhasználói (User) funkciók**

- Rendelés leadása
- Kedvenc ételek listázása és kezelése
- Saját adatok megtekintése és módosítása
- Rendelések nyomon követése
- Ételek értékelése

### **Dolgozói (Employee) funkciók**

- Rendelések állapotának kezelése (Rendelés leadva, Feldolgozás alatt, Szállítás allatt, Teljesíve)
- Felhasználók által írt hozzászólások moderálása (nem megfelelő tartalom törlése)

### **Adminisztrátori (Admin) funkciók**

- Kategóriák teljes körű kezelése (CRUD műveletek)
- Ételek teljes körű kezelése (CRUD műveletek)
- Akciók kezelése (CRUD műveletek)
- Felhasználók listázása, törlése és szerepkörök módosítása

## Technológiák

### **Frontend**

- TypeScript
- Tailwind
- React
- Redux Toolkit

### **Backend**

- NestJS
- Prisma

## Teszt felhasználók

A rendszerben előre beállított tesztfelhasználók érhetők el az alábbi felhasználónév/jelszó párosokkal:

- **Admin:** admin / admin
- **Employee:** employee / employee
- **User:** user / user

## Kliens

```sh
cd client
npm i
npm run dev
```

## Szerver

```sh
cd rest-api
npm i

npx prisma db push && npx prisma db seed
or
npx prisma migrate reset --force

npm run start:dev
```
