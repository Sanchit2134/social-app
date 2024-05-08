
import { signIn } from "@/config/auth.js"
import { Button } from "@mui/material"
 
export function SignIn() {
  return (
    <form 
      action={async () => {
        "use server"
        await signIn("google")
      }}
    >
      <Button variant='contained' type="submit">Sign In with Google</Button>
    </form>
  )
} 