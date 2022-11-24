import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function main() {
  await prisma.paymentMethods.upsert({
    where: {
      key: 'boleto'
    },
    update: {},
    create: {
      key: 'boleto',
      name: 'Boleto'
    }
  })
  await prisma.paymentMethods.upsert({
    where: {
      key: 'pix'
    },
    update: {},
    create: {
      key: 'pix',
      name: 'Pix'
    }
  })
  await prisma.paymentMethods.upsert({
    where: {
      key: 'cash'
    },
    update: {},
    create: {
      key: 'cash',
      name: 'Dinheiro'
    }
  })
  await prisma.paymentMethods.upsert({
    where: {
      key: 'deposit'
    },
    update: {},
    create: {
      key: 'deposit',
      name: 'Depósito Bancário'
    }
  })
  await prisma.paymentMethods.upsert({
    where: {
      key: 'card'
    },
    update: {},
    create: {
      key: 'card',
      name: 'Cartão de Crédito'
    }
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })