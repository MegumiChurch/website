import { ReactChild } from 'react'

interface Props {
  children: ReactChild | ReactChild[]
}

export default function Space({ children }: Props) {
  return <div>{children}</div>
}
