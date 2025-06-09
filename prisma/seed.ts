import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

interface Geo {
  lat: string;
  lng: string;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface UserFromApi {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

async function main() {
  console.log('Start seeding ...');

  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const users: UserFromApi[] = await response.json();
  const hashedPassword = await bcrypt.hash('password123', 10);

  for (const u of users) {
    const user = await prisma.user.create({
      data: {
        name: u.name,
        username: u.username,
        email: u.email,
        password: hashedPassword,
        phone: u.phone,
        website: u.website,
        company: {
          create: {
            name: u.company.name,
            catchPhrase: u.company.catchPhrase,
            bs: u.company.bs,
          },
        },
        address: {
          create: {
            street: u.address.street,
            suite: u.address.suite,
            city: u.address.city,
            zipcode: u.address.zipcode,
            geo: {
              create: {
                lat: u.address.geo.lat,
                lng: u.address.geo.lng,
              },
            },
          },
        },
      } as any,
    });
    console.log(`Created user with id: ${user.id}`);
  }
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
