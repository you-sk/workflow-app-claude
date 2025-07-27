import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const applications = await prisma.application.findMany({
      where: {
        userId: session.user.id
      },
      include: {
        workflow: true,
        approvals: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(applications)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { title, content, workflowId, metadata } = body

    const application = await prisma.application.create({
      data: {
        title,
        content,
        workflowId,
        userId: session.user.id,
        metadata: metadata ? JSON.stringify(metadata) : null,
        status: 'pending'
      },
      include: {
        workflow: true,
        user: true
      }
    })

    // ワークフローの最初のステップの承認者を設定
    const workflow = await prisma.workflow.findUnique({
      where: { id: workflowId }
    })

    if (workflow) {
      const rules = JSON.parse(workflow.rules)
      const firstStep = rules.steps[0]
      
      // 該当するロールのユーザーを探して承認者として設定
      const approvers = await prisma.user.findMany({
        where: {
          role: firstStep.approverRole
        }
      })

      // 承認レコードを作成
      for (const approver of approvers) {
        await prisma.approval.create({
          data: {
            applicationId: application.id,
            approverId: approver.id,
            status: 'pending',
            step: 1
          }
        })
      }
    }

    return NextResponse.json(application)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create application' }, { status: 500 })
  }
}