import { ReactChild } from 'react'
import Mikan from 'mikanjs'

export function split(s: string) {
  return join(
    Mikan.split(s).map(it => (
      <span
        style={{
          display: `inline-block`,
          paddingLeft: 0,
          paddingRight: 0
        }}
      >
        {it}
      </span>
    ))
  )
}

export function join(e: JSX.Element[]) {
  return e as unknown as ReactChild
}

export function formatDate(date: Date) {
  return `${date?.getMonth() + 1}/${date?.getDate()}/${date?.getFullYear()}`
}
