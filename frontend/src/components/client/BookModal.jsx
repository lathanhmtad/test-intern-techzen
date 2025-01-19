import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import usePost from "@/hooks/usePost"
import { env } from "@/env/environments"
import useAuthStore from "@/stores/useAuthStore"

import logo from '@/assets/logo-techzen.png'

export default function UserModal({ openModal, setOpenModal, type, setType, bookEditable, setBookEditable, getBooks }) {
  const { register, formState: { errors }, handleSubmit, reset } = useForm({
    defaultValues: {
      id: bookEditable.formatBookId,
      name: bookEditable.name,
      category: bookEditable.category,
      published: bookEditable.published,
      author_id: bookEditable.author.id
    }
  })
  const { handlePost, loading } = usePost()
  const setIsAuthenticated = useAuthStore(state => state.setIsAuthenticated)

  const handleUpdateBook = async (bookUpdateData) => {
    const { success } = await handlePost(`${env.BACKEND_URL}/books`, { ...bookUpdateData, id: bookEditable.id })
    if (success) {
      getBooks()
      setIsAuthenticated(true)
      setOpenModal(false)
    }
  }

  return (
    <Dialog open={openModal} onOpenChange={() => {
      setOpenModal(false)
      setBookEditable(null)
      reset()
    }}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
          </DialogTitle>
          <DialogDescription className='text-lg text-center'>
            Chỉnh sửa thông tin sách
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleUpdateBook)} className="grid grid-flow-row gap-5">
          <div>
            <Label htmlFor="username">Mã sách</Label>
            <Input id="id" disabled {...register('id')} />
          </div>
          <div>
            <Label htmlFor="name">Tên sách</Label>
            <Input id="name" {...register('name', {
              required: 'Yêu cầu nhập tên sách'
            })} placeholder="Nhập tên sách" />
            {errors.name && <p className="text-red-500 text-sm mt-0.5">{errors.name.message}</p>}
          </div>
          <div>
            <Label htmlFor="category">Thể loại</Label>
            <select className="border w-full p-2" {...register('category')}>
              <option value='Văn học'>Văn học</option>
              <option value='Khoa học'>Khoa học</option>
              <option value='Tiểu thuyết'>Tiểu thuyết</option>
            </select>
          </div>
          <div>
            <Label htmlFor="published">Năm xuất bản</Label>
            <Input id="published" type="number" {...register('published', {
              required: 'Yêu cầu nhập năm xuất bản',
              validate: {
                checkNumber: (fieldValue) => {
                  return parseInt(fieldValue) <= 2024 || 'Không được lớn hơn năm hiện tại'
                }
              }
            })} placeholder="Nhập năm xuất bản" />
            {errors.published && <p className="text-red-500 text-sm mt-0.5">{errors.published.message}</p>}
          </div>
          <div>
            <Label htmlFor="author">Tác giả</Label>
            <select className="border w-full p-2" {...register('author_id')}>
              <option value='1'>Keigo Higashino</option>
              <option value='2'>Nguyễn Phong</option>
              <option value='3'>J.K. Rowling</option>
              <option value='4'>Nguyễn Nhật Ánh</option>
              <option value='5'>Haruki Murakami</option>
            </select>
          </div>
          <Button disabled={loading}>Lưu</Button>
        </form>

        <DialogFooter>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
