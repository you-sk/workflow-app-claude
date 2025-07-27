import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create users
  const adminPassword = await bcrypt.hash('admin123', 10)
  const userPassword = await bcrypt.hash('user123', 10)

  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: adminPassword,
      name: '管理者',
      role: 'admin',
      department: 'システム管理部',
    },
  })

  const user1 = await prisma.user.upsert({
    where: { email: 'user1@example.com' },
    update: {},
    create: {
      email: 'user1@example.com',
      password: userPassword,
      name: '田中太郎',
      role: 'user',
      department: '営業部',
    },
  })

  const user2 = await prisma.user.upsert({
    where: { email: 'user2@example.com' },
    update: {},
    create: {
      email: 'user2@example.com',
      password: userPassword,
      name: '山田花子',
      role: 'manager',
      department: '営業部',
    },
  })

  const user3 = await prisma.user.upsert({
    where: { email: 'user3@example.com' },
    update: {},
    create: {
      email: 'user3@example.com',
      password: userPassword,
      name: '佐藤次郎',
      role: 'director',
      department: '経営企画部',
    },
  })

  // Create workflows
  const expenseWorkflow = await prisma.workflow.create({
    data: {
      name: '経費申請',
      description: '経費精算のための申請ワークフロー',
      rules: JSON.stringify({
        steps: [
          {
            step: 1,
            approverRole: 'manager',
            condition: { maxAmount: 100000 },
          },
          {
            step: 2,
            approverRole: 'director',
            condition: { minAmount: 100001 },
          },
        ],
      }),
    },
  })

  const leaveWorkflow = await prisma.workflow.create({
    data: {
      name: '休暇申請',
      description: '休暇取得のための申請ワークフロー',
      rules: JSON.stringify({
        steps: [
          {
            step: 1,
            approverRole: 'manager',
          },
        ],
      }),
    },
  })

  // Create sample applications
  await prisma.application.create({
    data: {
      title: '交通費精算申請',
      content: '2024年1月の交通費精算\n- 電車代: 5,000円\n- タクシー代: 3,000円',
      status: 'pending',
      userId: user1.id,
      workflowId: expenseWorkflow.id,
      metadata: JSON.stringify({ amount: 8000, category: '交通費' }),
    },
  })

  await prisma.application.create({
    data: {
      title: '有給休暇申請',
      content: '2024年2月1日〜2月3日の有給休暇を申請します。',
      status: 'pending',
      userId: user1.id,
      workflowId: leaveWorkflow.id,
      metadata: JSON.stringify({ startDate: '2024-02-01', endDate: '2024-02-03', days: 3 }),
    },
  })

  console.log('Seed data created successfully')
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