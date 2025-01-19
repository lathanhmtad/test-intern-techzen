import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { env } from "@/env/environments"
import useFetch from "@/hooks/useFetch"
import { Loader, Pencil, Plus, Trash } from "lucide-react"
import { useEffect, useState } from "react"

import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import BookModal from "@/components/client/BookModal"
import { Label } from "@/components/ui/label"

export default function ManageUsersPage() {
  const { toast } = useToast()
  const [books, setBooks] = useState([])
  const { handleFetch, loading } = useFetch()

  const [openBookModal, setOpenBookModal] = useState(false)
  const [typeModal, setTypeModal] = useState('')

  const [selectedAuthor, setSelectedAuthor] = useState(0)
  const [selectedCategoryName, setSelectedCategoryName] = useState('')

  const [searchTerm, setSearchTerm] = useState('')

  const [bookEditable, setBookEditable] = useState(null)

  const getBooks = async () => {
    let url = `${env.BACKEND_URL}/books`
    if (selectedAuthor > 0) {
      url = `${env.BACKEND_URL}/books?author_id=${selectedAuthor}`
    }
    if (selectedCategoryName != '') {
      url = `${env.BACKEND_URL}/books?category=${selectedCategoryName}`
    }
    if(searchTerm != '' && searchTerm != null) {
      url = `${env.BACKEND_URL}/books?search=${searchTerm}`
    }
    if (selectedAuthor > 0 && selectedCategoryName != '') {
      url = `${env.BACKEND_URL}/books?author_id=${selectedAuthor}&category=${selectedCategoryName}`
    }
    if (selectedAuthor > 0 && selectedCategoryName != '' && searchTerm != '' && searchTerm != null) {
      url = `${env.BACKEND_URL}/books?author_id=${selectedAuthor}&category=${selectedCategoryName}&search=${searchTerm}`
    }
    const { data, success } = await handleFetch(url)
    if (success) {
      setBooks(data.content)
    }
  }

  useEffect(() => {
    getBooks()
  }, [selectedAuthor, selectedCategoryName, searchTerm])

  const handleSelectAuthor = (e) => {
    setSelectedAuthor(e.target.value)
  }

  const handleSelectCategory = (e) => {
    setSelectedCategoryName(e.target.value)
  }

  const onChangeSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  return <div>
    <h2 className="text-2xl mb-5">Danh sách sách</h2>
    <div className="flex items-center justify-between gap-10 mb-3">
      <div className="flex-1">
        <Label htmlFor="category">Tên sách</Label>
        <Input onChange={onChangeSearch} placeholder="Nhập tên sách" className='' />
      </div>
      <div className="w-[300px]">
        <Label htmlFor="category">Tác giả</Label>
        <select onChange={(e) => handleSelectAuthor(e)} className="border w-full p-2">
          <option value='0'>Chọn tác giả</option>
          <option value='1'>Keigo Higashino</option>
          <option value='2'>Nguyễn Phong</option>
          <option value='3'>J.K. Rowling</option>
          <option value='4'>Nguyễn Nhật Ánh</option>
          <option value='5'>Haruki Murakami</option>
        </select>
      </div>
      <div className="w-[300px]">
        <div>
          <Label htmlFor="category">Thể loại</Label>
          <select onChange={e => handleSelectCategory(e)} className="border w-full p-2">
            <option value=''>Chọn thể loại</option>
            <option value='Văn học'>Văn học</option>
            <option value='Khoa học'>Khoa học</option>
            <option value='Tiểu thuyết'>Tiểu thuyết</option>
          </select>
        </div>
      </div>
    </div>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Mã sách</TableHead>
          <TableHead>Tên sách</TableHead>
          <TableHead>Thể loại</TableHead>
          <TableHead>Năm xuất bản</TableHead>
          <TableHead>Tên tác giả</TableHead>
          <TableHead>Hành động</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading && <TableRow>
          <TableCell colSpan={6}>
            <div className="text-xl flex justify-center">
              <Loader className="animate-spin mr-2" />
            </div>
          </TableCell>
        </TableRow>}

        {!loading && books.length == 0 && <TableRow>
          <TableCell colSpan={6}>
            <div className="text-xl flex justify-center">
              Không tìm thấy kết quả
            </div>
          </TableCell>
        </TableRow>}

        {!loading && <>
          {books.map(book => <TableRow key={book.id}>
            <TableCell className="font-medium">{book.formatBookId}</TableCell>
            <TableCell>{book.name}</TableCell>
            <TableCell>{book.category}</TableCell>
            <TableCell>{book.published}</TableCell>
            <TableCell>{book.author.name}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button onClick={() => {
                  setOpenBookModal(true)
                  setBookEditable(book)
                }} className='bg-blue-500'><Pencil /></Button>
                {/* <Button onClick={() => {
                  toast({
                    variant: "destructive",
                    title: "Delete account",
                    description: <div>Are you sure you want to permanently delete the account
                      <strong> {user.username}?</strong>
                    </div>,
                    action: <ToastAction onClick={handleDeleteUser} altText="Delete">Delete</ToastAction>
                  })
                }} variant="destructive"><Trash /></Button> */}
              </div>
            </TableCell>
          </TableRow>)}
        </>}
      </TableBody>
    </Table>

    {bookEditable && <BookModal
      openModal={openBookModal}
      setOpenModal={setOpenBookModal}
      type={typeModal}
      setType={setTypeModal}
      bookEditable={bookEditable}
      setBookEditable={setBookEditable}
      getBooks={getBooks}
    />}
  </div>
}