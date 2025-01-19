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

export default function Auth({ openModal, setOpenModal, type, setType }) {
  const { register, formState: { errors }, handleSubmit, reset } = useForm()
  const { handlePost, loading } = usePost()
  const setIsAuthenticated = useAuthStore(state => state.setIsAuthenticated)

  const handleAuth = async (authData) => {
    if (type === 'login') {
      const { success } = await handlePost(`${env.BACKEND_URL}/auth/login`, authData)
      if (success) {
        setIsAuthenticated(true)
        setOpenModal(false)
      }
    }
  }

  return (
    <Dialog open={openModal} onOpenChange={() => {
      setOpenModal(false)
      reset()
    }}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            <img src={logo} alt="Techzen Logo" className="h-8" />
          </DialogTitle>
          <DialogDescription className='text-sm'>
            {type === 'login' ? 'Sign in' : 'Sign up'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleAuth)} className="grid grid-flow-row gap-5">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input id="username" {...register('username', {
              required: 'Username is required'
            })} placeholder="username" />
            {errors.username && <p className="text-red-500 text-sm mt-0.5">{errors.username.message}</p>}
          </div>
          {type === 'register' && <div>
            <Label htmlFor="name">Name</Label>
            <Input id='name' {...register('name', {
              required: 'Name is required'
            })} placeholder="John Doe" />
            {errors.name && <p className="text-red-500 text-sm mt-0.5">{errors.name.message}</p>}
          </div>}
          <div>
            <Label htmlFor='password'>Password</Label>
            <Input autoComplete="off" id='passwowrd' {...register('password', {
              required: 'Password is required'
            })} placeholder="******" type='password' />
            {errors.password && <p className="text-red-500 text-sm mt-0.5">{errors.password.message}</p>}
          </div>
          {type === 'register' && <div>
            <Label htmlFor='confirmPassword'>Confirm password</Label>
            <Input autoComplete="off" id='confirmPassword' type='password' {...register('confirmPassword', {
              required: 'Confirm password is required'
            })} placeholder="******" />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-0.5">{errors.confirmPassword.message}</p>}
          </div>}
          {type === 'login' && <div className="text-end ">
            <Link className="text-sm inline-block">Forgot password?</Link>
          </div>}
          <Button disabled={loading}>{type === 'login' ? 'Sign in' : 'Sign up'}</Button>
        </form>
        <DialogFooter>
          <div className="text-sm">
            {type === 'login' ? "Don't have an account?" : 'Already a member?'}
            <span onClick={() => setType(`${type === 'login' ? 'register' : 'login'}`)} className="text-blue-500 cursor-pointer ml-1">{type === 'login' ? 'Sign up' : 'Sign in'}</span>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
