import Auth from "@/components/Auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import useAuthStore from "@/stores/useAuthStore"
import { useState } from "react"
import { Link } from "react-router-dom"
import logo from '@/assets/logo-techzen.png'

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

import { Bell, LogOut, Pencil, Settings, User } from "lucide-react"
import usePost from "@/hooks/usePost"
import { env } from "@/env/environments"

export default function Navbar() {

  const participant = useAuthStore(state => state.participant)
  const logout = useAuthStore(state => state.logout)

  const { handlePost } = usePost()

  const [openModalAuth, setOpenModalAuth] = useState(false)
  const [typeModal, setTypeModal] = useState('')

  return (
    <>
      <header className="flex sticky top-0 inset-y-0 items-center h-header container border-b z-10 bg-background">
        <nav className="flex-1 flex items-center justify-between gap-3">
          <div>
            <Link href="#" className="flex items-center gap-2">
              <img src={logo} alt="Techzen logo" className="h-8" />
            </Link>
          </div>

          <div className="flex-1 max-w-[420px]">
            <Input type="email" placeholder="Search exams, posts, ..." />
          </div>

          {participant
            ?
            <div className="flex items-center gap-6">
              <Link to='/'>My exams</Link>
              <div className="flex items-center gap-3">
                <Bell />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild className="cursor-pointer">
                    <Avatar>
                      <AvatarImage src={participant.avatar} alt="@shadcn" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>
                      <div className="flex items-center gap-3">
                        <div>
                          <Avatar>
                            <AvatarImage src={participant.avatar} alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                        </div>
                        <div>
                          <div className="flex gap-1 items-center">
                            <span className="">{participant.name}</span>
                            <span className="font-light text-[12px]">({participant.role})</span>
                          </div>
                          <div className="text-muted-foreground font-thin">@{participant.username}-{participant.id}</div>
                        </div>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User size={16} />
                      Your profile
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Pencil size={16} />
                      Write blog
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      My articles
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      My exams
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      Saved posts
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Saved tests
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Settings size={16} />
                      Setting
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={async () => {
                      await handlePost(`${env.BACKEND_URL}/auth/logout`)
                      logout()
                    }}>
                      <LogOut size={16} />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            :
            <div className="flex gap-2">
              <Button onClick={() => {
                setOpenModalAuth(true)
                setTypeModal('register')
              }} variant="outline">Sign up</Button>
              <Button onClick={() => {
                setOpenModalAuth(true)
                setTypeModal('login')
              }}>Sign in</Button>
            </div>
          }
        </nav>
      </header>

      <Auth
        type={typeModal}
        setOpenModal={setOpenModalAuth}
        openModal={openModalAuth}
        setType={setTypeModal}
      />
    </>
  )
}