import connectMongoDB from '@/app/lib/mongodb'
import ProductModel from '../../../../models/ProductModel'
import { NextResponse } from 'next/server'

export async function POST(req, res) {
  const { name, image, price, category } = await req.json()
  await connectMongoDB()
  await ProductModel.create({ name, image, price, category })
  return NextResponse.json({ message: 'Product created successfully' }, { status: 201 })
}

export async function GET(req, res) {
  await connectMongoDB()
  const products = await ProductModel.find()
  return NextResponse.json(products)
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get('id')
  await connectMongoDB()
  await ProductModel.findByIdAndDelete(id)
  return NextResponse.json({ message: 'Product deleted' }, { status: 200 })
}
